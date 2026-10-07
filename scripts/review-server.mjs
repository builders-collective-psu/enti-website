import http from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import path from 'node:path';
import { createFeedbackMiddleware, feedbackFile } from './feedback-server.mjs';
import { createNewsMiddleware } from './news-feed.mjs';

const root = process.cwd();
const publicRoot = path.join(root, 'dist');
const feedback = createFeedbackMiddleware({ root });
const news = createNewsMiddleware();
const mime = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.svg': 'image/svg+xml', '.webp': 'image/webp', '.ico': 'image/x-icon', '.woff2': 'font/woff2', '.txt': 'text/plain; charset=utf-8' };
async function serve(req, res) {
  if (!['GET', 'HEAD'].includes(req.method)) { res.statusCode = 405; res.end('Method not allowed'); return; }
  let pathname;
  try { pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); }
  catch { res.statusCode = 400; res.end('Invalid path'); return; }
  let file = path.resolve(publicRoot, '.' + pathname);
  const relative = path.relative(publicRoot, file);
  if (relative.startsWith('..') || path.isAbsolute(relative)) { res.statusCode = 404; res.end('Not found'); return; }
  try {
    if ((await stat(file)).isDirectory()) file = path.join(file, 'index.html');
    await stat(file);
  } catch {
    const snapshot = pathname.match(/^\/versions\/(v[234])(?:\/|$)/);
    if (snapshot && !path.extname(pathname)) file = path.join(publicRoot, 'versions', snapshot[1], 'index.html');
    else if (pathname.startsWith('/versions/') || pathname.startsWith('/api/') || path.extname(pathname)) { res.statusCode = 404; res.end('Not found'); return; }
    else file = path.join(publicRoot, 'index.html');
  }
  try {
    const info = await stat(file);
    res.setHeader('Content-Type', mime[path.extname(file)] || 'application/octet-stream');
    res.setHeader('Content-Length', info.size);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    if (req.method === 'HEAD') { res.end(); return; }
    createReadStream(file).on('error', () => res.destroy()).pipe(res);
  } catch { res.statusCode = 404; res.end('Not found'); }
}
const server = http.createServer((req, res) => {
  feedback(req, res, () => news(req, res, () => { void serve(req, res); })).catch(() => { res.statusCode = 500; res.end('Server error'); });
});
const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || '127.0.0.1';
server.listen(port, host, () => {
  console.log(`Design review: http://${host}:${port}`);
  console.log(`Feedback file: ${feedbackFile(root)}`);
});
