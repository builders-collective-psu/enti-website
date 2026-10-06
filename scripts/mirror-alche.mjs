import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const origin = 'https://alche.studio';
const root = path.resolve('public/alche-mirror');
const pages = ['', 'news', 'works', 'about', 'stellla', 'contact', 'privacypolicy', 'license', 'works/fortnite', 'works/unreal_engine', 'works/metaverse', 'works/mobile', 'works/stellla', 'works/In-Game-Concert', 'works/cloud%20rendering', 'works/detail/x-7xjmugndty', 'works/detail/8ekyy7vviu', 'works/detail/uqdzssjeiox', 'works/detail/05tscxftkq', 'works/detail/997ia9e6cty7', 'works/detail/lqlwmmtrsd6s'];
const queued = new Set(); const saved = new Set();
function localPath(urlPath) { const clean = decodeURIComponent(urlPath.split('?')[0]); return clean === '/' ? path.join(root, 'index.html') : path.join(root, clean.replace(/^\//, '').replace(/\/$/, ''), 'index.html'); }
function isPage(pathname) { return pages.includes(pathname.replace(/^\//, '').replace(/\/$/, '')); }
function queue(urlPath) { if (!urlPath || !urlPath.startsWith('/') || urlPath.startsWith('//')) return; const clean = urlPath.split('?')[0]; if (isPage(clean)) queued.add(clean); else if (clean.startsWith('/_astro/') || clean.startsWith('/top/') || clean.startsWith('/common/') || clean.startsWith('/stellla/') || clean.startsWith('/favicon')) queued.add(clean); }
async function saveAsset(urlPath, data) { const target = path.resolve('public', urlPath.replace(/^\//, '')); if (!target.startsWith(path.resolve('public'))) return; await mkdir(path.dirname(target), { recursive: true }); await writeFile(target, data); saved.add(urlPath); }
async function download(urlPath) { if (saved.has(urlPath)) return ''; const response = await fetch(origin + urlPath); if (!response.ok) { console.warn('skip', response.status, urlPath); return ''; } const type = response.headers.get('content-type') || ''; const text = type.includes('text') || /\.(?:js|css|html)$/.test(urlPath) ? await response.text() : Buffer.from(await response.arrayBuffer()); if (!isPage(urlPath)) await saveAsset(urlPath, typeof text === 'string' ? Buffer.from(text) : text); else saved.add(urlPath); return typeof text === 'string' ? text : ''; }
for (const page of pages) queue('/' + page + (page ? '/' : ''));
while (queued.size) {
  const urlPath = queued.values().next().value; queued.delete(urlPath); if (saved.has(urlPath)) continue;
  let text = await download(urlPath);
  if (!text) continue;
  for (const match of text.matchAll(/(?:src|href|poster|data-src|data-image)=["']([^"']+)["']/gi)) queue(match[1]);
  for (const match of text.matchAll(/(?:import\(|["'`])((?:\.?\.?\/)?_astro\/[^"'`()]+?\.js)["'`)]/g)) queue('/' + match[1].replace(/^\.\//, ''));
  if (urlPath.endsWith('.css')) for (const match of text.matchAll(/url\((['"]?)(\/[^)"']+)\1\)/g)) queue(match[2]);
  if (urlPath.endsWith('.html') || isPage(urlPath)) {
    text = text.replace(/href=(['"])\/(news|works(?:\/[^"'?]*)?|about|stellla|contact|privacypolicy|license)([^"']*)\1/g, (_m, q, page, rest) => `href=${q}/alche-mirror/${page}${rest}${rest.includes('?') || rest.endsWith('/') ? '' : '/'}${q}`);
    text = text.replace(/href=(['"])\/alche-mirror\/\/\1/g, `href=$1/alche-mirror/$1`);
    text = text.replace(/<head>/i, '<head><base href="/"><style>#loading-overlay{display:none!important}</style>');
    const target = localPath(urlPath);
    await mkdir(path.dirname(target), { recursive: true }); await writeFile(target, text);
  }
}
console.log(`Mirrored ${saved.size} files into ${root}`);
