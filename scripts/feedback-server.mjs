import { appendFile, mkdir, readFile } from 'node:fs/promises';
import path from 'node:path';

const limits = { reviewerName: 100, version: 2, page: 2048, elementLabel: 200, comment: 6000, replacementText: 3000 };
const queues = new Map();
const indexes = new Map();
const attempts = new Map();

export function feedbackFile(root = process.cwd()) {
  return path.join(process.env.FEEDBACK_DATA_DIR || path.join(root, 'feedback'), 'reviews.jsonl');
}

function validate(data) {
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new Error('Invalid feedback.');
  const record = {};
  for (const [field, max] of Object.entries(limits)) {
    const value = data[field] ?? '';
    if (typeof value !== 'string' || value.length > max) throw new Error(`Please check ${field}.`);
    record[field] = value.trim();
  }
  if (!record.reviewerName || !record.elementLabel || (!record.comment && !record.replacementText)) throw new Error('Add your name, an element, and a comment or suggested text.');
  if (!/^v[1-5]$/.test(record.version)) throw new Error('Unknown version.');
  // V5 is the live immersive site rather than a frozen snapshot.
  const base = record.version === 'v5' ? '/eship' : `/versions/${record.version}`;
  if (!record.page.startsWith(`${base}/`) && record.page !== base) throw new Error('The page must belong to the selected version.');
  if (!/^[a-f0-9-]{36}$/i.test(data.submissionId || '')) throw new Error('Invalid submission ID.');
  record.submissionId = data.submissionId;
  if (data.element != null) {
    if (typeof data.element !== 'object' || Array.isArray(data.element)) throw new Error('Invalid element.');
    record.element = {};
    for (const [field, max] of Object.entries({ selector: 2000, tag: 30, text: 2000, ariaLabel: 300, section: 300, imageSrc: 2048 })) {
      const value = data.element[field] ?? '';
      if (typeof value !== 'string' || value.length > max) throw new Error('Selected element is too long.');
      record.element[field] = value;
    }
  } else record.element = null;
  return record;
}

async function saveRecord(file, record) {
  // Serialize writes and deduplicate retries, including after a server restart.
  const operation = (queues.get(file) || Promise.resolve()).catch(() => {}).then(async () => {
    if (!indexes.has(file)) {
      let content = '';
      try { content = await readFile(file, 'utf8'); } catch (error) { if (error.code !== 'ENOENT') throw error; }
      const index = new Map();
      for (const line of content.split('\n').filter(Boolean)) {
        const existing = JSON.parse(line);
        index.set(existing.submissionId, existing);
      }
      indexes.set(file, index);
    }
    const index = indexes.get(file);
    if (index.has(record.submissionId)) return index.get(record.submissionId);
    const saved = { ...record, id: record.submissionId, createdAt: new Date().toISOString() };
    await mkdir(path.dirname(file), { recursive: true });
    await appendFile(file, JSON.stringify(saved) + '\n', { encoding: 'utf8', flush: true });
    index.set(saved.submissionId, saved);
    return saved;
  });
  queues.set(file, operation);
  return operation;
}

export function createFeedbackMiddleware({ root = process.cwd(), file = feedbackFile(root) } = {}) {
  return async function feedbackMiddleware(req, res, next) {
    const pathname = req.url?.split('?')[0];
    // Feedback stays outside the public directory and cannot be downloaded by visitors.
    let decodedPath;
    try { decodedPath = decodeURIComponent(pathname || ''); } catch { decodedPath = ''; }
    if (/^\/feedback(?:\/|$)/.test(decodedPath) || /\/reviews\.jsonl$/.test(decodedPath)) { res.statusCode = 404; res.end('Not found'); return; }
    if (pathname !== '/api/feedback') { next?.(); return; }
    const respond = (code, body) => {
      res.statusCode = code;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'no-store');
      res.end(JSON.stringify(body));
    };
    if (req.method !== 'POST') { res.setHeader('Allow', 'POST'); respond(405, { error: 'Use POST to submit feedback.' }); return; }
    const origin = req.headers.origin;
    const allowedOrigin = process.env.FEEDBACK_ALLOWED_ORIGIN;
    try {
      if (!origin || (allowedOrigin ? origin !== allowedOrigin : new URL(origin).host !== req.headers.host)) {
        respond(403, { error: 'Please submit feedback from this review website.' }); return;
      }
    } catch { respond(403, { error: 'Invalid origin.' }); return; }
    if (!String(req.headers['content-type']).startsWith('application/json')) { respond(415, { error: 'Use JSON for feedback.' }); return; }
    const now = Date.now();
    for (const [key, value] of attempts) if (now - value.start > 60000) attempts.delete(key);
    const ip = req.socket?.remoteAddress || 'unknown';
    const attempt = attempts.get(ip) || { start: now, count: 0 };
    attempts.set(ip, attempt); attempt.count++;
    if (attempt.count > 30) { respond(429, { error: 'Please wait a minute before adding more notes.' }); return; }
    let record;
    try {
      // Serverless adapters may already have parsed the body.
      if (req.body !== undefined) record = validate(typeof req.body === 'string' ? JSON.parse(req.body) : req.body);
      else {
        let bytes = 0;
        const chunks = [];
        for await (const chunk of req) {
          bytes += Buffer.byteLength(chunk);
          if (bytes > 32768) { respond(413, { error: 'Feedback is too large.' }); return; }
          chunks.push(Buffer.from(chunk));
        }
        record = validate(JSON.parse(Buffer.concat(chunks).toString('utf8')));
      }
    } catch (error) { respond(400, { error: error instanceof SyntaxError ? 'Invalid JSON.' : error.message }); return; }
    try {
      const saved = await saveRecord(file, record);
      respond(201, { saved: true, id: saved.id, createdAt: saved.createdAt });
    } catch (error) {
      console.error('Feedback could not be saved:', error.message);
      respond(500, { error: 'The server could not save your feedback. Your note is still here; please try again.' });
    }
  };
}
