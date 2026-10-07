// Mirrors the Penn State World Campus layout (home + one program page) for the V6 design.
// Assets land in public/versions/v6/wc/ and pristine layout templates in scripts/templates/.
// Content is swapped in afterwards by scripts/build-v6-worldcampus.py.
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

const ORIGIN = 'https://www.worldcampus.psu.edu';
const PREFIX = '/versions/v6/wc';
const OUT = path.join('public', PREFIX.slice(1));
const TEMPLATES = path.join('scripts', 'templates');
const PAGES = {
  'worldcampus-home.html': '/',
  'worldcampus-program.html': '/degrees-and-certificates/penn-state-online-entrepreneurship-minor',
};
const UA = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128 Safari/537.36';
const downloaded = new Map();

const decode = value => value.replace(/&amp;/g, '&');

// Same-origin asset URL → local published path (query strings dropped; Drupal names are already unique).
function localPath(raw, base = ORIGIN + '/') {
  let url;
  try { url = new URL(decode(raw), base); } catch { return null; }
  if (url.origin !== ORIGIN) return null;
  if (!/\.(css|js|png|jpe?g|gif|webp|svg|ico|woff2?|ttf|otf|eot)$/i.test(url.pathname)) return null;
  return { url: url.origin + url.pathname + url.search, file: decodeURIComponent(url.pathname) };
}

async function fetchAsset(asset) {
  if (downloaded.has(asset.file)) return downloaded.get(asset.file);
  const job = (async () => {
    const response = await fetch(asset.url, { headers: { 'User-Agent': UA } });
    if (!response.ok) { console.warn(`skip ${response.status} ${asset.url}`); return false; }
    let body = Buffer.from(await response.arrayBuffer());
    if (asset.file.endsWith('.css')) body = Buffer.from(await rewriteCss(body.toString('utf8'), asset.url));
    const target = path.join(OUT, asset.file);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, body);
    return true;
  })();
  downloaded.set(asset.file, job);
  return job;
}

async function rewriteCss(css, base) {
  const jobs = [];
  const out = css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (match, quote, raw) => {
    if (raw.startsWith('data:') || raw.startsWith('#')) return match;
    const asset = localPath(raw, base);
    if (!asset) return match;
    jobs.push(fetchAsset(asset));
    return `url(${quote}${PREFIX}${asset.file}${quote})`;
  });
  await Promise.all(jobs);
  return out;
}

async function rewriteHtml(html) {
  const jobs = [];
  const swap = raw => {
    const asset = localPath(raw);
    if (!asset) return raw;
    jobs.push(fetchAsset(asset));
    return PREFIX + asset.file;
  };
  html = html
    // Analytics, heatmaps, Cloudflare email obfuscation and lazy oEmbed proxies don't belong in a review copy.
    .replace(/<script[^>]*(googletagmanager|crazyegg|google_tag|email-decode)[^>]*><\/script>/g, '')
    .replace(/<noscript><iframe[^>]*googletagmanager[\s\S]*?<\/noscript>/g, '')
    .replace(/<script>\s*\(function\(w,d,s,l,i\)[\s\S]*?<\/script>/g, '')
    .replace(/<link[^>]*typekit[^>]*>/g, '')
    .replace(/(\s(?:src|href|data-src|poster)=")([^"]+)"/g, (_, attr, raw) => `${attr}${swap(raw)}"`)
    .replace(/(\ssrcset=")([^"]+)"/g, (_, attr, list) => attr + list.split(',').map(part => {
      const [raw, ...rest] = part.trim().split(/\s+/);
      return [swap(raw), ...rest].join(' ');
    }).join(', ') + '"')
    .replace(/url\(\s*(['"]?)(\/[^'")]+)\1\s*\)/g, (_, quote, raw) => `url(${quote}${swap(raw)}${quote})`);
  await Promise.all(jobs);
  return html;
}

await mkdir(TEMPLATES, { recursive: true });
for (const [name, route] of Object.entries(PAGES)) {
  const response = await fetch(ORIGIN + route, { headers: { 'User-Agent': UA } });
  if (!response.ok) throw new Error(`${route}: ${response.status}`);
  await writeFile(path.join(TEMPLATES, name), await rewriteHtml(await response.text()));
  console.log(`template ${name} ← ${route}`);
}
console.log(`${downloaded.size} assets → ${OUT}`);
