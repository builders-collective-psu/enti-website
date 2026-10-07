import { createDecipheriv, createHash } from 'node:crypto';
// Newsroom proxy for the ENTI minor LISTSERV feed. Browsers cannot read the
// feed cross-origin, so the server fetches, parses, and briefly caches it.
export const LIST_NAME = 'L-ENTI-MINOR';
// The list archive is private; LISTSERV accepts a subscriber's X/Y pair in the URL.
// It stays server-side: never sent to browsers, logged, or included in item links.
// The account is stored encrypted so it is not readable in the public source; the key ships
// alongside it, so this deters casual reading only. ENTI_FEED_ACCOUNT (env or .env) overrides it.
try { process.loadEnvFile?.(); } catch { /* No .env file: use the host's environment. */ }
const SEALED_ACCOUNT = '5rahFfJMAPpxNiMmrolLY8KhpGNS5vJmDx8wViNZWWkrlW/VL19wChF+MNVtWX1MiN5FQGiIyUlmpsRc35H5PfPV6ylr';
function unseal(sealed) {
  try {
    const data = Buffer.from(sealed, 'base64');
    const decipher = createDecipheriv('aes-256-gcm', createHash('sha256').update(`eship-newsroom/${LIST_NAME}`).digest(), data.subarray(0, 12));
    decipher.setAuthTag(data.subarray(12, 28));
    return Buffer.concat([decipher.update(data.subarray(28)), decipher.final()]).toString('utf8');
  } catch { return ''; }
}
const ACCOUNT = process.env.ENTI_FEED_ACCOUNT || unseal(SEALED_ACCOUNT);
export const FEED_URL = process.env.ENTI_FEED_URL || `https://lists.psu.edu/cgi-bin/wa?RSS&L=${LIST_NAME}&v=2.0&LIMIT=100${ACCOUNT ? '&' + ACCOUNT : ''}`;
export const ARCHIVE_URL = `https://lists.psu.edu/cgi-bin/wa?A0=${LIST_NAME}`;
const CACHE_MS = 10 * 60 * 1000;
let cache = null;

const entities = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
function decode(text) {
  return text
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (match, code) => {
      if (code[0] !== '#') return entities[code.toLowerCase()] ?? match;
      const point = code[1].toLowerCase() === 'x' ? parseInt(code.slice(2), 16) : parseInt(code.slice(1), 10);
      return Number.isFinite(point) && point <= 0x10ffff ? String.fromCodePoint(point) : match;
    });
}
function plain(markup) {
  return decode(decode(markup).replace(/<(br|p|div|li)\b[^>]*>/gi, ' ').replace(/<[^>]*>/g, ''))
    .replace(/\s+/g, ' ').trim();
}
function tag(block, name) {
  const match = block.match(new RegExp(`<${name}(?:\\s[^>]*)?>([\\s\\S]*?)</${name}>`, 'i'));
  return match ? match[1] : '';
}
function safeLink(value) {
  try {
    const url = new URL(decode(value).trim());
    url.searchParams.delete('X'); url.searchParams.delete('Y');
    return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : ARCHIVE_URL;
  } catch { return ARCHIVE_URL; }
}

export function parseFeed(xml) {
  if (!/<rss[\s>]|<channel[\s>]/i.test(xml)) return null;
  return [...xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item>/gi)].map(([, block]) => {
    const summary = plain(tag(block, 'description'));
    const date = new Date(plain(tag(block, 'pubDate')));
    return {
      title: plain(tag(block, 'title')) || 'Untitled message',
      link: safeLink(tag(block, 'link') || tag(block, 'guid')),
      date: Number.isNaN(date.getTime()) ? null : date.toISOString(),
      // Show sender names only: "Name <email>" and "email (Name)" both become "Name".
      author: plain(tag(block, 'author') || tag(block, 'dc:creator')).replace(/<[^>]*>|[^\s()<>]+@[^\s()<>]+/g, '').replace(/[()]/g, '').trim(),
      summary: summary.length > 320 ? summary.slice(0, 317).trimEnd() + '…' : summary,
    };
  }).slice(0, 100);
}

export async function loadNews({ fetcher = fetch, now = Date.now() } = {}) {
  if (cache && now - cache.at < CACHE_MS) return cache.body;
  let body;
  try {
    const response = await fetcher(FEED_URL, { headers: { Accept: 'application/rss+xml, application/xml;q=0.9' }, signal: AbortSignal.timeout(10000) });
    const text = await response.text();
    const items = response.ok ? parseFeed(text) : null;
    // LISTSERV answers private archives with an HTML login page, not an error status.
    if (items) body = { status: 'ok', items };
    else if (/Login Required/i.test(text)) body = { status: 'restricted', items: [] };
    else body = { status: 'unavailable', items: [] };
  } catch {
    body = { status: 'unavailable', items: [] };
  }
  // Keep showing the last good announcements if LISTSERV is briefly unreachable.
  if (body.status !== 'ok' && cache?.body.status === 'ok') body = { ...cache.body, stale: true };
  body.archive = ARCHIVE_URL;
  body.updatedAt = new Date(now).toISOString();
  cache = { at: now, body };
  return body;
}

export function resetNewsCache() { cache = null; }

export function createNewsMiddleware(options) {
  return async function newsMiddleware(req, res, next) {
    if (req.url?.split('?')[0] !== '/api/news') { next?.(); return; }
    res.setHeader('Content-Type', 'application/json');
    if (!['GET', 'HEAD'].includes(req.method)) { res.statusCode = 405; res.setHeader('Allow', 'GET'); res.end(JSON.stringify({ error: 'Use GET.' })); return; }
    const body = await loadNews(options);
    res.statusCode = 200;
    res.setHeader('Cache-Control', 'public, max-age=300');
    res.end(req.method === 'HEAD' ? undefined : JSON.stringify(body));
  };
}
