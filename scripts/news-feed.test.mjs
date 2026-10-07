import test from 'node:test';
import assert from 'node:assert/strict';
import { parseFeed, loadNews, resetNewsCache } from './news-feed.mjs';

const rss = `<?xml version="1.0"?><rss version="2.0"><channel><title>L-ENTI-MINOR</title>
<item><title>Spring &amp; Summer grants</title><link>https://lists.psu.edu/cgi-bin/wa?A2=L-ENTI-MINOR;1</link>
<description><![CDATA[<p>Apply by <b>March 1</b>.</p>]]></description><pubDate>Mon, 05 Oct 2026 14:00:00 GMT</pubDate>
<author>ESHIP Office &lt;eship@PSU.EDU&gt;</author></item>
<item><title>Bad link</title><link>javascript:alert(1)</link><author>abc1234@psu.edu (Pat Lee)</author><description>Hi</description><pubDate>nope</pubDate></item>
</channel></rss>`;

test('parses LISTSERV RSS items into safe plain text', () => {
  const [first, second] = parseFeed(rss);
  assert.equal(first.title, 'Spring & Summer grants');
  assert.equal(first.summary, 'Apply by March 1.');
  assert.equal(first.date, '2026-10-05T14:00:00.000Z');
  assert.equal(first.author, 'ESHIP Office');
  assert.match(second.link, /^https:\/\/lists\.psu\.edu\/.*A0=L-ENTI-MINOR/);
  assert.equal(second.date, null);
  assert.equal(second.author, 'Pat Lee');
});

test('never exposes the account token in item links', () => {
  const [item] = parseFeed(rss.replace('A2=L-ENTI-MINOR;1', 'A2=L-ENTI-MINOR;1&amp;X=SECRET&amp;Y=me%40PSU.EDU'));
  assert.doesNotMatch(item.link, /SECRET|X=|Y=/);
});

test('reports a private archive instead of failing', async () => {
  resetNewsCache();
  const body = await loadNews({ fetcher: async () => new Response('<title>LISTSERV - Login Required</title>', { status: 200 }) });
  assert.equal(body.status, 'restricted');
  assert.deepEqual(body.items, []);
});

test('caches results and survives network failures', async () => {
  resetNewsCache();
  let calls = 0;
  const fetcher = async () => { calls++; return new Response(rss); };
  assert.equal((await loadNews({ fetcher, now: 1000 })).items.length, 2);
  await loadNews({ fetcher, now: 2000 });
  assert.equal(calls, 1);
  resetNewsCache();
  const failed = await loadNews({ fetcher: async () => { throw new Error('offline'); } });
  assert.equal(failed.status, 'unavailable');
  resetNewsCache();
  await loadNews({ fetcher, now: 0 });
  const stale = await loadNews({ fetcher: async () => { throw new Error('offline'); }, now: 20 * 60 * 1000 });
  assert.equal(stale.items.length, 2);
});
