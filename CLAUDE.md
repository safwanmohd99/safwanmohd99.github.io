# Mohammed Safwan — personal website

Owner: Mohammed Safwan. He has no coding knowledge, so explain everything in plain, simple language and do the technical work for him. Live at https://safwandigital.com (domain on Hostinger; that Hostinger account also hosts his client sites — never touch them).

## Positioning (keep consistent everywhere)
- Full-time digital marketer at "a digital marketing agency in Bangalore" (do NOT name the agency), working remotely from Palakkad, Kerala.
- Freelance on the side: mainly 1–2 hour consultations; full projects only rarely. Never call him a full-time freelancer.
- In digital marketing since 2021 (BA English → academy course → self-taught via agency, in-house, freelance).
- A digital marketing generalist (Meta Ads, Google Ads, SEO, AI search), NOT a specialist. Never call him a specialist; healthcare and B2B are the industries he knows best.
- Industries: B2B services + healthcare (NMC guidelines). Markets: Kerala/India, UAE, Saudi Arabia, GCC. No ecommerce.
- SEO target: "freelance digital marketer in Kerala", "digital marketer in Kerala", "digital marketing consultant Kerala".
- No client results/numbers on the site until he provides real ones.
- Photos: `photo.jpg` (home hero), `safwan-portrait.jpg` (about), `safwan-outdoor.jpg` (about/home teaser), `safwan-casual.jpg` (services). Keep `llms.txt` and JSON-LD schema in sync with any bio changes.

## How the site works
- Plain HTML/CSS/JS. No build step, no Node. Shared styles in `assets/style.css` (linked as `/assets/style.css?v=N` on every page; bump N on all pages whenever style.css changes so browsers don't show the old design), shared script in `assets/main.js`, icons in `assets/icons.svg` (use `<svg><use href="/assets/icons.svg#arrow"/></svg>`).
- Hosted on GitHub Pages from the `main` branch of `safwanmohd99/safwanmohd99.github.io`. Pushing to `main` publishes the site in about a minute.
- Header, footer and WhatsApp button are repeated on every page. If you change one, change all pages (`index.html`, `services/`, `about/`, `blog/`, `blog/*/`, `404.html`, `_templates/blog-post.html`).
- Photo: `assets/photo.jpg`. Pages fall back to an "S" monogram if it's missing.
- Contact form posts to FormSubmit using its random-string alias (`formsubmit.co/ajax/1a269593e7568d51375bdcc6d6347187`, delivers to safwan031231@gmail.com) so the email is not exposed in the form. Spam traps: `_honey` honeypot, `_blacklist` phrases, 4-second time trap and phone digit check in `assets/main.js`.

## Pages & URLs
- Real pages: `/`, `/services/`, `/portfolio/` (case studies; built from data in the page, images in `assets/portfolio/<case-id>/NN.webp`), `/about/`, `/contact/` (the only contact form), `/blog/`, `/blog/<slug>/`, `/privacy-policy/`. Every page has a `<link rel="canonical">` with its exact https://safwandigital.com URL; keep that on new pages.
- Never link to `#contact`; all CTAs go to `/contact/`. YouTube: https://www.youtube.com/@safwan.99
- Old WordPress URLs (`/faq/...`, `/faq-category/...`, `/category/...`, `/author/...`, old `/blog/<old-slug>/`, `/feed/`) are tiny redirect pages (meta refresh + canonical + noindex). Don't delete them. `sitemap_index.xml` points to `sitemap.xml`.
- Contact form uses FormSubmit; it must be activated once from the email FormSubmit sends to safwan031231@gmail.com.

## Design
Editorial style: cream paper `#F5F1EA`, ink `#15130F`, one accent orange `#FF5A1F`. Fonts: Inter Tight (text) + Instrument Serif italic for highlighted words (`<em>` inside headings). Keep one accent word per heading.

## Adding a blog post
1. Pick a short URL slug, e.g. `why-clinics-waste-meta-ads-budget`.
2. Copy `_templates/blog-post.html` to `blog/<slug>/index.html` and fill every `{{PLACEHOLDER}}`. Body goes in `{{BODY_HTML}}` using `<p>`, `<h2>`, `<h3>`, `<ul>`, `<blockquote>`.
3. Add a card at the TOP of `<div class="posts" id="posts">` in `blog/index.html`:
   ```html
   <a href="/blog/<slug>/" class="post"><div class="cover">Short cover line</div><span class="meta">Category · 12 Oct 2026</span><h3>Title</h3><p>One-line summary.</p></a>
   ```
   Every post gets a thumbnail at `blog/<slug>/cover.jpg` (1200×900): copy `_templates/blog-cover.html`, fill the placeholders (short title with one `<em>` word, category, font size, pick one of Safwan's photos), serve the repo root locally and screenshot it at 1200×900 with headless Chromium. Use it in the card as `<div class="cover"><img src="/blog/<slug>/cover.jpg" alt="Post title" width="1200" height="900" loading="lazy"></div>`, and as the post's `og:image` and schema `image`.
   The visible FAQ must use the exact same question and answer text as the FAQPage schema (Google requires it). Use `<div class="faq"><details><summary>Question</summary><p>Answer</p></details>…</div>`.
4. Add the URL to `sitemap.xml` and to the "Blog posts" list in `llms.txt` (newest first).
5. Show Safwan the draft first. Publish (commit + push) only after he says yes.

## Writing voice
Follow Safwan's voice: experience-first, humble, plain words, real numbers, no AI buzzwords (leverage, unlock, elevate, game-changer…), no em-dash drama. Example first, principle second. Never invent client results or numbers; ask him for real ones. Healthcare content must stay accurate to NMC guidelines.
