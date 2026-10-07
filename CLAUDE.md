# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A redesign of the Penn State Engineering Entrepreneurship (E-SHIP) website. It holds several **design versions at once**:

- **Design review hub** (`/`): React landing page (`src/pages/VersionReview.tsx`) that lists versions V1–V4 and wraps each in a viewer (`/review/:version`). The viewer has an element picker (`src/hooks/useElementPicker.ts`) that sends feedback to `POST /api/feedback`.
- **V1–V4 snapshots** (`public/versions/v1..v4/`): frozen, prebuilt historical sites, checked in. Do not hand-edit them; regenerate with `node scripts/export-versions.mjs`. It reads the `dist/` tree from the original commits (`c50fd02`, `9ae4995`, `431efc0`, `d21cf74`; also tagged `v1`–`v4`) and rewrites asset paths and the V4 router basename for the `/versions/vN/` prefix.
- **Current React multi-page site** (`src/App.tsx` → `AppLayout`): routes `/curriculum`, `/programs`, `/experiences`, `/faculty`, `/ventures`, `/contact` over a fixed Three.js background (`src/components/ThreeCanvas.tsx`) driven by scroll progress.
- **V5 / ESHIP immersive site** (`/alche` → `src/pages/AlcheClone.tsx`): an iframe of `public/alche-mirror/`. This is a static mirror of alche.studio (Astro + Swup + WebGL runtime) with its content swapped for E-SHIP academic content. See "V5 content pipeline" below.

README.md's component list and the "React 18" claim are outdated. `package.json` has the real versions (React 19, Vite 8, Tailwind v4 via `@tailwindcss/vite`, TypeScript 7, react-router 7).

## Commands

```bash
npm ci
npm run dev            # Vite on http://127.0.0.1:5173 (includes feedback middleware and version routing)
npm run build          # vite build → dist/ (copies public/, including all versions and alche-mirror)
npm run preview        # serves dist on 127.0.0.1:4173 with the same middleware
npm start              # scripts/review-server.mjs: Node server for dist/ plus persistent feedback saving (default 127.0.0.1:3000)
npm run test:feedback  # node --test scripts/feedback-server.test.mjs
npm run test:news      # node --test scripts/news-feed.test.mjs
```

Run a single test with `node --test --test-name-pattern "<name>" scripts/<file>.test.mjs`.

There is no lint script. Type-check with `npx tsc --noEmit` (tsconfig only covers `src/`).

## Routing: three places must agree

Version and mirror routing lives in three places, and they must be kept in sync when routes change:
1. `vite.config.ts`: a custom plugin with **duplicated** middleware in `configureServer` and `configurePreviewServer`. It maps `/alche-mirror/...` to `index.html` files, V1 static subpages, and V2–V4 SPA routes.
2. `vercel.json` rewrites (V2–V4 SPA fallbacks; everything except `/api/*` goes to the root `index.html`).
3. `scripts/review-server.mjs` for the standalone Node server.

The root `BrowserRouter` basename is derived from Vite's `BASE_URL`, so the app can be hosted under a subpath.

## Feedback storage

`scripts/feedback-server.mjs` exports `createFeedbackMiddleware`, which is used by the Vite dev/preview servers, `review-server.mjs`, and the tests. It validates records, dedupes retries by ID, serializes writes per file, and appends JSONL to `feedback/reviews.jsonl`. The `feedback/` directory is gitignored and also blocked by Vite `server.fs.deny`. Env vars: `FEEDBACK_DATA_DIR`, `FEEDBACK_ALLOWED_ORIGIN`, `HOST`, `PORT`. The Vercel adapter `api/feedback.js` only works with an explicitly configured persistent writable directory, not ephemeral serverless storage. `api/contact.js` is a Vercel function that sends mail through Resend (`RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_ALLOWED_ORIGIN`; see `.env.example`). VERSIONS.md documents the full record schema.

## Newsroom and mailing list

`scripts/news-feed.mjs` serves `GET /api/news`. It proxies, parses and caches (for 10 minutes) the Penn State LISTSERV RSS feed for `L-ENTI-MINOR`; `ENTI_FEED_URL` overrides the feed URL. It's wired into the Vite dev/preview servers, `review-server.mjs` and `api/news.js`. LISTSERV answers a private archive with an HTML "Login Required" page, and the endpoint reports that as `status: "restricted"`. The newsroom's subscribe form posts directly to `https://lists.psu.edu/cgi-bin/wa` (with `SUBED2`/`p`=name/`s`=email), and LISTSERV emails the subscriber a confirmation. Client logic is in `public/eship-content.js`. When the live feed is unavailable or stale, the client falls back to `public/newsroom-archive.json` and shows an "archived" banner. `npm run news:snapshot` (also run as `prebuild`) refreshes that file, but only when the live feed returns posts.

## V5 content pipeline (alche-mirror)

- `scripts/mirror-alche.mjs` downloads the original alche.studio pages and assets into `public/alche-mirror/` and `public/{_astro,common,top,stellla,favicon,...}`.
- `scripts/migrate-eship-content.py` (Python + beautifulsoup4) rewrites the mirrored HTML in place using content from **`src/content/eship-v5.json`**. That JSON is the source of truth for V5 copy. The script uses `scripts/templates/eship-home.html` and `eship-page.html` as pristine layout templates (created once from the mirror). It emits the E-SHIP routes (`updates`, `experiences/*`, `program`, `curriculum`, `faculty`, `grants`, `ventures`, `videos`, `contact`) and remaps the original Alche routes (`news`, `works`, `about`, `stellla`) onto them. It also strips the studio's analytics scripts. To change V5 copy, edit the JSON and rerun the script instead of editing the generated HTML.
- The generator adds an inline head script that forces `preserveDrawingBuffer` on WebGL contexts, so `enti-glass-ui.js` can copy the scene into each glass button's reflection canvas. The runtime highlights side-menu items by index (`top, news, works, about, stellla, contact`), so new side-menu entries must be appended after Contact.
- E-SHIP layers injected into mirrored pages: `public/eship-content.{js,css}` (contact form → mailto, survives Swup navigation), `public/enti-glass-ui.{js,css}`, and `public/enti-intro.{js,css}` (an `<enti-intro>` custom element that is also loaded by the root `index.html` and dispatches `enti-intro-complete`).
- `scripts/build-enti-glass.mjs` patches the hero meshes in `public/common/scene.glb` and writes `public/common/scene-enti.glb`.
- `docs/alche-runtime-observation.md` records the reference runtime's behavior. The mirror's WebGL scene depends on the original loader/sound-gate sequence, so don't force the loader away early.

## Repo conventions and gotchas

- **`dist/` is committed** (commits like "Update built site assets"). Hosting (`.openai/hosting.json`, Vercel) serves `dist/`. Rebuild and commit `dist/` together with source changes that should ship.
- `scripts/build.mjs`, `add-community.mjs`, `finalize.mjs`, `check.mjs`, `serve.mjs` and `templates/home.html` come from the V1 static-site era. They generate and patch plain HTML, and `add-community`/`finalize` rewrite `build.mjs` itself. They are not part of the current build.
- `artifacts/` is untracked scratch space for reference screenshots and design captures.
- Image attributions live in `PHOTO-CREDITS.md`, and content sourcing notes live in `RESEARCH.md`.
