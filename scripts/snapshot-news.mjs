// Saves the current newsroom feed as the archived fallback shown when the live feed is unavailable.
// Runs before each build; it never fails the build and keeps the previous archive on error.
import { writeFile } from 'node:fs/promises';
import { loadNews } from './news-feed.mjs';

const body = await loadNews();
if (body.status === 'ok' && body.items.length) {
  await writeFile('public/newsroom-archive.json', JSON.stringify({ savedAt: body.updatedAt, items: body.items }) + '\n');
  console.log(`Newsroom archive updated: ${body.items.length} announcements.`);
} else {
  console.warn(`Newsroom archive kept as-is (live feed ${body.status}).`);
}
