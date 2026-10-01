import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const root = path.resolve('dist');
const mime = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.mjs': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.json': 'application/json',
  '.woff2': 'font/woff2'
};

http.createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(new URL(req.url, 'http://localhost').pathname);
    const file = path.resolve(root, '.' + pathname);
    if (!file.startsWith(root + path.sep) && file !== root) {
      res.writeHead(403);
      return res.end();
    }
    const info = await stat(file);
    const final = info.isDirectory() ? path.join(file, 'index.html') : file;
    const data = await readFile(final);
    res.writeHead(200, {
      'Content-Type': mime[path.extname(final)] || 'application/octet-stream',
      'Cache-Control': 'no-store'
    });
    res.end(data);
  } catch {
    try {
      const data404 = await readFile(path.join(root, '404.html'));
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end(data404);
    } catch {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      res.end('Page not found');
    }
  }
}).listen(4173, '127.0.0.1', () => console.log('Local: http://127.0.0.1:4173/'));
