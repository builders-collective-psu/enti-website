import test from 'node:test';
import assert from 'node:assert/strict';
import http from 'node:http';
import { mkdtemp, readFile, writeFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { createFeedbackMiddleware } from './feedback-server.mjs';

async function fixture(t, file) {
  const directory = await mkdtemp(path.join(tmpdir(), 'eship-feedback-'));
  file ||= path.join(directory, 'reviews.jsonl');
  const middleware = createFeedbackMiddleware({ file });
  const server = http.createServer((req, res) => { void middleware(req, res, () => { res.statusCode = 404; res.end(); }); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  const origin = `http://127.0.0.1:${server.address().port}`;
  t.after(async () => { await new Promise(resolve => server.close(resolve)); await rm(directory, { recursive: true, force: true }); });
  const post = (data, headers = {}) => fetch(origin + '/api/feedback', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) });
  return { directory, file, origin, post };
}
function note(overrides = {}) {
  return { submissionId: randomUUID(), reviewerName: 'Professor Test', version: 'v1', page: '/versions/v1/minor/#clusters', elementLabel: 'H1: A little more curious.', element: { tag: 'h1', selector: 'main > section:nth-of-type(1) > h1:nth-of-type(1)', text: 'A little more curious.', section: 'The minor' }, comment: 'Use clearer wording.', replacementText: 'Build your next idea.', ...overrides };
}
test('stores the reviewer, selected element, page, wording, and server timestamp; deduplicates retries', async t => {
  const f = await fixture(t); const data = note();
  const first = await f.post(data); assert.equal(first.status, 201); const result = await first.json();
  assert.equal((await f.post(data)).status, 201);
  const records = (await readFile(f.file, 'utf8')).trim().split('\n').map(JSON.parse);
  assert.equal(records.length, 1); assert.equal(records[0].id, result.id);
  assert.equal(records[0].reviewerName, data.reviewerName); assert.equal(records[0].element.selector, data.element.selector);
  assert.equal(records[0].page, data.page); assert.equal(records[0].replacementText, data.replacementText);
  assert.ok(!Number.isNaN(Date.parse(records[0].createdAt)));
});
test('concurrent notes append as complete individual records', async t => {
  const f = await fixture(t);
  const responses = await Promise.all(Array.from({ length: 8 }, (_, i) => f.post(note({ comment: `Change ${i}` }))));
  assert.ok(responses.every(response => response.status === 201));
  const records = (await readFile(f.file, 'utf8')).trim().split('\n').map(JSON.parse);
  assert.equal(records.length, 8); assert.equal(new Set(records.map(record => record.id)).size, 8);
});
test('rejects invalid notes and other origins without storing them', async t => {
  const f = await fixture(t);
  assert.equal((await f.post(note({ reviewerName: '' }))).status, 400);
  assert.equal((await f.post(note({ page: '/versions/v4/' }))).status, 400);
  assert.equal((await f.post(note({ comment: '', replacementText: '' }))).status, 400);
  assert.equal((await f.post(note(), { Origin: 'https://other.example' })).status, 403);
  await assert.rejects(readFile(f.file), { code: 'ENOENT' });
  assert.equal((await fetch(f.origin + '/feedback/reviews.jsonl')).status, 404);
  assert.equal((await fetch(f.origin + '/@fs/C:/private/feedback/reviews.jsonl')).status, 404);
  assert.equal((await f.post(note({ comment: 'x'.repeat(6001) }))).status, 400);
});
test('loads existing file records to deduplicate previously saved notes', async t => {
  const f = await fixture(t); const data = note();
  await writeFile(f.file, JSON.stringify({ ...data, id: data.submissionId, createdAt: '2026-10-01T00:00:00Z' }) + '\n');
  assert.equal((await f.post(data)).status, 201);
  assert.equal((await readFile(f.file, 'utf8')).trim().split('\n').length, 1);
});
test('reports storage failures instead of claiming a successful save', async t => {
  const f = await fixture(t);
  await writeFile(path.join(f.directory, 'blocked'), 'not a directory');
  const middleware = createFeedbackMiddleware({ file: path.join(f.directory, 'blocked', 'reviews.jsonl') });
  const server = http.createServer((req, res) => { void middleware(req, res); });
  await new Promise(resolve => server.listen(0, '127.0.0.1', resolve));
  t.after(() => new Promise(resolve => server.close(resolve)));
  const origin = `http://127.0.0.1:${server.address().port}`;
  const response = await fetch(origin + '/api/feedback', { method: 'POST', headers: { Origin: origin, 'Content-Type': 'application/json' }, body: JSON.stringify(note()) });
  assert.equal(response.status, 500); assert.match((await response.json()).error, /could not save/);
});
