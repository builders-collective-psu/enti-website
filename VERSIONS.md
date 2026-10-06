# E-SHIP design versions

The root page is the design review landing page. Select a version to browse it with a persistent version switcher. Choose **Select an element**, click a heading/image/detail, add your name and suggested wording or comment, then choose **Save feedback**. General notes and copying notes remain available.

| Label | Original commit | Description | Review URL |
| --- | --- | --- | --- |
| V1 | c50fd02 | Initial static, multi-page draft | /review/v1 |
| V2 | 9ae4995 | React and scroll-driven Three.js redesign | /review/v2 |
| V3 | 431efc0 | Expanded mechanical redesign with programs and treks | /review/v3 |
| V4 | d21cf74 | Current multi-page React design | /review/v4 |

All four snapshots date to October 1, 2026. Local annotated Git tags `v1`, `v2`, `v3`, and `v4` identify their original source commits. The intervening README-only commit is not a separate visual version.

Historical built sites are checked into `public/versions/` so deployment does not require Git history or old dependencies. `node scripts/export-versions.mjs` regenerates them from the original Git objects. The exporter adjusts root asset paths and V4's router basename to isolate each site under `/versions/vN/`; historical visual content is preserved.

Run `npm ci` and `npm run dev`, then open http://127.0.0.1:5173/. `npm run build` includes all saved versions in the deployment output. Vite and Vercel route saved React subpages to the correct snapshot.

Share the deployed root URL with reviewers. A localhost URL works only on the machine running the server. Existing contact forms inside historical sites retain their original behavior.

## Collected feedback

Development and preview servers accept `POST /api/feedback` and append each submission to `feedback/reviews.jsonl` (one JSON object per line). The file is created on the first save, survives server restarts, stays outside the public site, and is ignored by Git. Back it up with your server data. Test notes are stored in temporary directories.

Each record contains a server timestamp and ID, reviewer name, V1–V4 label, page path/query/anchor, element label, DOM selector, tag, current text, nearby section heading, image source/accessible label when applicable, suggested wording, and comment. Retry IDs prevent duplicate saves. Reviewer names are remembered in that browser after a successful save. Only submitted notes go to the server; selection alone sends nothing.

For a heading change, use `replacementText` with `element.text` and `element.selector` to locate the intended edit in the matching version. Selectors reference the saved DOM and should be reviewed against source before editing. Third-party embedded video content cannot be inspected by the picker; comment on its section instead.

## Persistent server deployment

Run `npm run build`, then `npm start` for a Node server that serves the built site and saves feedback. Defaults: `127.0.0.1:3000` and the repository's `feedback/reviews.jsonl`.

- `HOST` and `PORT`: listening address/port for your host or reverse proxy.
- `FEEDBACK_DATA_DIR`: persistent directory where `reviews.jsonl` is stored. Mount/retain this directory across deployments.
- `FEEDBACK_ALLOWED_ORIGIN`: exact public origin, e.g. `https://review.example.edu`, for deployments behind a reverse proxy. Direct local servers validate requests against their own host.

The existing serverless `api/feedback.js` adapter requires an explicitly configured persistent writable directory. Deploying static files alone does not enable saving. Do not point this setting at temporary serverless storage; use the Node server on a host with persistent disk, or implement a durable database/object-storage adapter for the chosen hosting platform. When saving is unavailable, the UI retains the note, shows an error, and supports copying it.

Run `npm run test:feedback` for append/retry, concurrency, validation, origin, file privacy, and storage-failure checks.
