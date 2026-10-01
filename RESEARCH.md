# Research and verification — October 1, 2026

## Existing site

A normal Windows HTTPS certificate check returned SEC_E_CERT_EXPIRED for https://eship.engr.psu.edu/. Certificate validation was never bypassed. The new site does not renew the old certificate; PSU web/IT must renew the existing certificate or migrate the official domain to an approved host with managed TLS.

A complete legacy crawl was not possible through the expired certificate. Existing indexed faculty and experiences pages were reviewed; no claim is made that every historic URL was audited. The redesign has complete local routes and link/asset checks, with redirects for known faculty and minor paths in vercel.json.

## Sources

- Current curriculum / adviser contacts: https://bulletins.psu.edu/undergraduate/colleges/intercollege/entrepreneurship-innovation-minor/
- Ted Graef appointment and founding background: https://news.engr.psu.edu/2020/graef-ted-engineering-e-ship-appointment.aspx
- Ted LinkedIn: https://www.linkedin.com/in/ted-graef-59708810
- Brad directory: https://www.sedi.psu.edu/department/directory-detail-g.aspx?q=btg125
- Brad LinkedIn: https://www.linkedin.com/in/brad-groznik-792ab12b
- Frank Koe current title: https://news.engr.psu.edu/2026/koe-frank-asid-joe-polski-award.aspx
- Frank directory: https://www.sedi.psu.edu/department/directory-detail-g.aspx?q=FTK2
- Existing faculty page: https://eship.engr.psu.edu/meet-the-professors/
- Taiwan provider recap: https://www.linkedin.com/posts/asia-pacific-academic_studyabroadintaiwan-globaleducation-educationabroad-activity-7308125108936613888-tVN6
- APA official home: https://apacademic.org/ (verified via public company profile; original assets not retrieved).
- GameDay Ventures program page: https://eship.engr.psu.edu/experiences/
- Onward State / Whirl Pong, September 6, 2024: https://onwardstate.com/2024/09/06/theres-nothing-like-it-out-there-penn-state-sophomore-reinvents-cup-pong/
- Daily Collegian coverage, January 24, 2025, page 6: https://bloximages.newyork1.vip.townnews.com/psucollegian.com/content/tncms/assets/v3/editorial/f/a7/fa7cae48-d90d-11ef-b191-7f945d8cd711/6791b744da680.pdf.pdf
- Penn State Engineering / Builders Collective and c0mpiled-6, February 18, 2026: https://news.engr.psu.edu/2026/sheth-het-eship-hackathon.aspx
- Builders launch / Vercel mini-hackathon public repost: https://www.linkedin.com/in/kartikeypandey2004
- Terrametric / Bitcamp 2026 student account: https://www.linkedin.com/in/abhinav-dasari-852952241
- User-provided club website: https://psu.builders . Browser access was declined; did not retrieve it through alternative tools. Club content relies on independent Penn State reporting and public student posts. E-SHIP support is established; no dollar amount of recurring funding is asserted.
- Resources: https://invent.psu.edu/ ; https://happyvalley.launchbox.psu.edu/ ; https://global.psu.edu/
- Verified footer targets from the Bulletin: https://www.psu.edu/web-privacy-statement ; https://www.psu.edu/accessibilitystatement

## Inspiration

- https://alche.studio/ — immersive, cursor-responsive 3D as the main visual.
- https://lusion.co/ — real-time material and motion craft.
- https://bruno-simon.com/ — playful interaction grounded in real 3D.
- https://mesh3d.gallery/ — further examples to explore.

No source site's code or visual assets were copied. The new sculpture uses original geometric composition with Three.js. The public site content does not quote faculty at length or fabricate student testimonials, accomplishments, current trip dates, or deadlines.

## Verification

- Browser confirmed successful WebGL initialization with one canvas and a scene-ready state.
- Pause control changed to Play and aria-pressed=true.
- Cluster selector changed from Product Innovation to New Ventures and correctly updated college, description, adviser Sean Doherty, and email.
- Contact form prepared the synthetic Preview Test inquiry locally. Recipient, encoded mailto subject/body, review text, and edit/copy controls appeared; no email was sent.
- Mobile viewport check measured equal content/client widths (375px) and confirmed navigation expands with all five page links.
- Browser console check returned no JavaScript errors or warnings in the tested homepage.
- Screenshot capture repeatedly timed out in the browser service, including while paused. Visual pixel review was not possible. DOM/layout and interaction verification are not a substitute for a completed visual design review.
- `npm run check` is the final all-page links/assets/anchor/metadata/ID/JavaScript validation; the final command output records its result.

## Launch dependencies

Approved trip and faculty image files, current event schedule and club meeting details, PSU brand/content review, institutional hosting/domain access, and a mail service for direct delivery. The shipped email draft form works without those credentials. The optional Vercel endpoint needs configuration before delivery can be tested.
