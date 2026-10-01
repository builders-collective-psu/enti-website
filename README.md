# E-SHIP redesign

A portable static website for Penn State Engineering Entrepreneurship. Includes an interactive Three.js sculpture, an ENTI curriculum and cluster explorer, faculty, Taiwan experiences, GameDay Ventures, Builders Collective, and a contact form. Source facts were reviewed October 1, 2026.

## Run

No dependency installation required. Node.js 20+:

```sh
npm run build
npm run check
npm run dev
```

Open http://127.0.0.1:4173/.

Edit page content in `scripts/build.mjs`, shared styling in `dist/assets/site.css`, interactions in `dist/assets/app.js`, and the 3D scene in `dist/assets/scene.js`. `templates/home.html` holds the original hero and introduction. Run build after page edits; reload the browser after changes. Three.js 0.180.0 is vendored locally with its MIT license, so the 3D scene has no CDN dependency. Fonts use Google Fonts with system fallbacks.

## Hosting

For Vercel, import this project, choose Other, and use the included `vercel.json`: build `npm run build`, output `dist`. Node serverless `api/contact.js` is included. The entire `dist` folder also works on a PSU static host. Hosting decisions for eship.engr.psu.edu and the expired certificate require PSU web/IT access. No changes to that domain or existing production site were made.

Vercel is a hosting target; v0 is an optional interface/code authoring tool, not needed to run this project. Confirm the institution's preferred host and branding before replacing the official site. Do not point PSU DNS to a private Sites review URL.

## Contact form

On the review/static site, the form prepares a readable email draft addressed to Ted or Brad, and offers copy/edit actions. It does not claim delivery. The browser stores no contact details and no message is sent during testing.

On Vercel, direct email submission becomes available when these environment variables are configured:

- `RESEND_API_KEY`: provider key, kept server-side.
- `CONTACT_FROM`: verified sender on a domain you control.
- `CONTACT_ALLOWED_ORIGIN`: the exact HTTPS origin, with no trailing slash.

GET `/api/contact` exposes only whether configuration is present. The endpoint uses JSON validation, fixed recipients, an origin check, a honeypot, request timeout, and a short in-memory rate limiter. For public production use, enable hosting-level bot protection or replace the limiter with a shared durable store. PSU may prefer an approved institutional form service; the frontend can retain its email-draft fallback. Delivery cannot be verified without a configured service; no credentials were requested or provisioned.

## Content / launch handoff

- The 2026 Bulletin specifies 18–20 credits, 9 core credits, and the Product Innovation cluster. Older pages use Technology-Based Entrepreneurship and older requirements. Check each student's applicable Bulletin.
- GameDay Ventures is the ENGR 407 tailgate-game project; student coverage of Dillon Fink / Whirl Pong is linked.
- Builders Collective is supported by Penn State Engineering's February 2026 reporting and public student accounts. Specific funding amounts and current meeting/event dates are not asserted. Browser access to psu.builders was declined, so its page content was not inspected; its user-provided URL is linked.
- Taiwan is presented as a 2025 program recap, never an open/current application. Future dates, fees, and eligibility require confirmation.
- Faculty LinkedIn links are public professional profiles. Do not infer private or restricted social content.
- Source citations and photo credits are provided on `/sources/` and in `RESEARCH.md` / `PHOTO-CREDITS.md`.
- Obtain photo reuse clearance before official publication; trip and faculty photos are omitted until approved originals are available.
- This is an original visual concept, informed by Alche, Lusion, and Bruno Simon. Institutional logo use and brand review are pending.
- Inventory the old site's complete URL list with PSU/CMS access before migration, then add permanent redirects. Existing known faculty URL is mapped; this is not a complete crawl of an expired-TLS site.

## Checks

`npm run check` checks every generated page's internal links, assets, anchors, page metadata, unique IDs, and JavaScript syntax. Browser checks cover interactive cluster selection and email preparation, navigation, 3D controls, and mobile layout where available. See RESEARCH.md for actual verification results and limitations.
