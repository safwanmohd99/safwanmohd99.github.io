# Mohammed Safwan — personal website

Owner: Mohammed Safwan. He has no coding knowledge, so explain everything in plain, simple language and do the technical work for him. Live at https://safwandigital.com (domain on Hostinger; that Hostinger account also hosts his client sites — never touch them).

## Positioning (keep consistent everywhere)
- Full-time digital marketer at "a digital marketing agency in Bangalore", working remotely from Palakkad, Kerala. The agency is ThinkB (spelled "ThinkB"). Only the portfolio and llms.txt name it, as "Done at ThinkB", and only for VSH Hospital, Ara Skin Clinic and Eterna Vita. All other case studies are his own work: give them no agency credit.
- Freelance on the side: mainly 1–2 hour consultations; full projects only rarely. Never call him a full-time freelancer.
- In digital marketing since 2021 (BA English → academy course → self-taught via agency, in-house, freelance).
- A digital marketing generalist (Meta Ads, Google Ads, SEO, AI search), NOT a specialist. Never call him a specialist; healthcare and B2B are the industries he knows best.
- Also offers custom website development (static sites and dynamic sites with a backend), delivered with a small team of freelance developers he works with; say "a small team of freelance developers", never name them or claim a bigger company. No client website examples or prices until he gives them.
- Industries: B2B services + healthcare (NMC guidelines). Markets: Kerala/India, UAE, Saudi Arabia, GCC. No ecommerce.
- SEO target: "freelance digital marketer in Kerala", "digital marketer in Kerala", "digital marketing consultant Kerala".
- No client results/numbers on the site until he provides real ones.
- Portfolio has a separate "SEO & AI search" section (`#seo`) after the featured case: one `.seo-case` per brand with Search Console numbers, keyword list and screenshots (VSH Hospital, Bissan Ice, IEC UAE, Niyati Women and Pain Center, Eterna Vita, Asker Sweets). Screenshots from his Search Console have his Google profile photo covered.
- Photos: `photo.jpg` (home hero), `safwan-portrait.jpg` (about), `safwan-outdoor.jpg` (about/home teaser), `safwan-casual.jpg` (services), `safwan-selfie.jpg` (blog covers), `safwan-trees.jpg` (about "Working with me"), `safwan-hello.webp` (contact page greeting). More photos for future covers: `safwan-green.jpg`, `safwan-white.jpg`, `safwan-mirror.jpg` (orange wall), `safwan-car.jpg`. Reel skill page uses `safwan-purple.webp` (hero), `safwan-green-car.webp` and `safwan-blue-car.webp` (its cover); these three exist only as small WebP files; use a different one per cover so posts don't all look the same. Pages show the smaller `.webp` copies (same names, e.g. `assets/photo.webp`); keep the `.jpg` originals for og:image, schema and the cover templates. `assets/avatar.webp` is the small face photo for the blog author circles. `assets/og-image.jpg` (1200×630, made from `_templates/og-image.html`) is the social share image for the main pages. Keep `llms.txt` and JSON-LD schema in sync with any bio changes.

## How the site works
- Plain HTML/CSS/JS. No build step, no Node. Shared styles in `assets/style.css` (linked as `/assets/style.css?v=N` on every page; bump N on all pages whenever style.css changes so browsers don't show the old design), shared script in `assets/main.js`, icons in `assets/icons.svg` (use `<svg><use href="/assets/icons.svg#arrow"/></svg>`).
- Hosted on GitHub Pages from the `main` branch of `safwanmohd99/safwanmohd99.github.io`. Pushing to `main` publishes the site in about a minute.
- Header, footer (with the phone number as text) and WhatsApp button are repeated on every page. If you change one, change all pages (`index.html`, `services/`, `about/`, `blog/`, `blog/*/`, `404.html`, `_templates/blog-post.html`).
- Photo: `assets/photo.jpg`. Pages fall back to an "S" monogram if it's missing.
- Contact form posts to FormSubmit using its random-string alias (`formsubmit.co/ajax/1a269593e7568d51375bdcc6d6347187`, delivers to safwan031231@gmail.com) so the email is not exposed in the form. Spam traps: `_honey` honeypot, `_blacklist` phrases, 4-second time trap and phone digit check in `assets/main.js`. The form has an optional "How did you find me?" field (`found_via`) to see which channels bring enquiries.
- Analytics: none yet; Safwan will set up GA4. `assets/main.js` already sends GA4 events when `gtag` exists: `whatsapp_click`, `phone_click`, `email_click` and `generate_lead` (with `found_via`). When he gives the Measurement ID (G-…), add the gtag snippet to the `<head>` of every real page and `_templates/blog-post.html`, tell him to mark `generate_lead` and `whatsapp_click` as key events, and update the "Cookies and tracking" section of the privacy policy.

## Security
- The GitHub repo is public. Never commit passwords, API keys, tokens or private client/patient data. `_config.yml` keeps `CLAUDE.md`, `README.md` and `_templates` off the live site.
- Every real page (and `_templates/blog-post.html`) has a Content-Security-Policy `<meta>` right after the viewport tag: only the site's own scripts, Google Fonts, and the contact form talking to FormSubmit. Keep it identical on all pages. Don't add inline `<script>` blocks or `onclick`/`onerror` attributes (they'd be blocked); put code in `assets/main.js`. Images that may be missing use `data-fallback` instead of `onerror`.
- Adding something third-party (GA4, a YouTube embed, a widget) means updating the CSP on every page. For GA4: add `https://www.googletagmanager.com` to `script-src`, add `https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com` to `connect-src` and `img-src`, and put the `gtag('config', …)` lines in a file like `assets/ga.js`, not inline. Test every page for CSP errors in headless Chromium before publishing.
- `main.js` stops other sites from showing this site inside a frame. The contact form fields have `maxlength` limits.
- Account security is Safwan's side: 2FA on GitHub, Gmail and Hostinger; domain verified in GitHub Pages settings; Hostinger domain lock and auto-renew on.

## Pages & URLs
- Service pages: `/services/` is the overview (one section per service, each ending in a "More about …" link) and each service has its own page: `/services/seo/`, `/services/meta-ads/`, `/services/google-ads/`, `/services/healthcare-marketing/`, `/services/b2b-lead-generation/`, `/services/website-development/`, `/services/consultation/`. Each has: hero with Book + WhatsApp buttons, real stats (only numbers already on `/portfolio/`), intro + what's included, steps, results linking to portfolio anchors or blog case studies, an optional comparison table, who it's for, FAQ (identical to its FAQPage schema), related links and a topic-specific CTA. Schema: WebPage + BreadcrumbList + Service (provider = `#person`) + FAQPage. Agency work (VSH, Ara, Eterna Vita) is described as "done at the agency where I work", without naming ThinkB. Titles use "freelance … consultant/manager in Kerala", never "specialist" or "expert". Link to these pages (not `/services/#…`) from blog posts and other pages.
- Real pages: `/`, `/services/`, `/portfolio/` (case studies; built from data in the page, images in `assets/portfolio/<case-id>/NN.webp`), `/about/`, `/contact/` (the only contact form), `/resources/` (free things he gives away, like `/blog/` but for downloads; in the header after Blog and in the footer), `/resources/<slug>/` (one page per resource, e.g. `/resources/claude-reel-skill/` with its zip in that folder; old `/claude-reel-skill/` is a redirect page), `/blog/`, `/blog/<slug>/`, `/privacy-policy/`. Every page has a `<link rel="canonical">` with its exact https://safwandigital.com URL; keep that on new pages.
- Never link to `#contact`; all CTAs go to `/contact/`. YouTube: https://www.youtube.com/@safwan.99
- Old WordPress URLs (`/faq/...`, `/faq-category/...`, `/category/...`, `/author/...`, old `/blog/<old-slug>/`, `/feed/`) are tiny redirect pages (meta refresh + canonical + noindex). Don't delete them. `sitemap_index.xml` points to `sitemap.xml`.
- Contact form uses FormSubmit; it must be activated once from the email FormSubmit sends to safwan031231@gmail.com.

## Design
Editorial style: cream paper `#F5F1EA`, ink `#15130F`, one accent orange `#FF5A1F`. Fonts: Inter Tight (text) + Instrument Serif italic for highlighted words (`<em>` inside headings). Keep one accent word per heading.
- **Light and dark mode.** Every real page (and `_templates/blog-post.html`) loads `<script src="/assets/theme.js?v=1"></script>` right after the style.css link: it sets `data-theme="light|dark"` on `<html>` before the page draws (visitor's saved choice, else their device setting). `main.js` adds the round sun/moon switch to the header and saves the choice in localStorage. Keep that script tag on new pages.
- Colours must come from the CSS variables so dark mode works: `--paper`/`--card` (backgrounds), `--ink` (text), `--muted`, `--line`, `--accent-ink` (links). For dark blocks (footer, `.dark` sections, dark buttons, table heads) use `--night` and `--on-night`, not `--ink`/`--paper`. Dark values live in the `[data-theme="dark"]` block at the end of style.css. Test new pages in both modes.

## Adding a blog post
1. Pick a short URL slug, e.g. `why-clinics-waste-meta-ads-budget`.
2. Copy `_templates/blog-post.html` to `blog/<slug>/index.html` and fill every `{{PLACEHOLDER}}`. Body goes in `{{BODY_HTML}}` using `<p>`, `<h2>`, `<h3>`, `<ul>`, `<blockquote>`.
3. Add a card at the TOP of `<div class="posts" id="posts">` in `blog/index.html`:
   ```html
   <a href="/blog/<slug>/" class="post"><div class="cover"><img src="/blog/<slug>/thumb.webp" alt="Post title" width="600" height="450" loading="lazy"></div><span class="meta">Category · 12 Oct 2026</span><h3>Title</h3><p>One-line summary.</p></a>
   ```
   Every post gets a thumbnail at `blog/<slug>/cover.jpg` (1200×900): copy `_templates/blog-cover.html`, fill the placeholders (short title with one `<em>` word, category, font size, pick one of Safwan's photos), serve the repo root locally and screenshot it at 1200×900 with headless Chromium. Also save a 600×450 WebP copy as `blog/<slug>/thumb.webp` for the cards (homepage "From the blog" and `blog/index.html`). Use `cover.jpg` as the post's `og:image` and schema `image`. Update the homepage "From the blog" row to show the 3 newest posts. Also add the post to the `blogPost` list in the JSON-LD of `blog/index.html` (newest first).
   The visible FAQ must use the exact same question and answer text as the FAQPage schema (structured data must match what's on the page). Use `<div class="faq"><details><summary>Question</summary><p>Answer</p></details>…</div>`.
   End the body (before the FAQ `<hr>`) with a short "Related reading" list of 2–3 related posts, case studies or service sections, and add in-text links where a post mentions something the site covers elsewhere.
4. Add the URL to `sitemap.xml` and to the "Blog posts" list in `llms.txt` (newest first).
5. Show Safwan the draft first. Publish (commit + push) only after he says yes.

### What a good post looks like (model: `blog/how-to-use-claude-for-seo/`)
- **Mix of topics:** about half "authority" posts (how-to guides on AI tools and SEO, e.g. Claude for SEO, free SEO tools, Search Console) to show he knows the field, half client-focused posts (clinics, NMC, Meta/Google Ads, GCC, B2B). Avoid generic high-volume topics big sites already own; aim for specific topics where first-hand experience helps.
- **One topic only**, organised by level where it fits (beginner → pro → advanced). Don't pad the word count.
- **Show, don't just tell:** at least one worked example: the prompt or task, a sample input, the output (a table works well) and how to verify it. Label sample data as an example; never present it as a client result.
- **Comparison table** where two options get confused (e.g. Claude chat vs Claude Code), wrapped in `<div class="table-wrap"><table>…</table></div>`.
- **Be precise about tools:** check plans, limits and features against official docs before writing, and list them under "Sources". Say what access a tool needs; don't imply it can do things automatically.
- **"Always check" section** for AI/automation topics: facts can be wrong, health and finance need expert review (NMC for medical), no mass-produced AI pages.
- **CTAs:** one small in-text CTA mid-post linked to `/contact/`, tied to the post's topic, and a topic-specific heading in the bottom `cta-block` (e.g. "Want Claude in your SEO <em>workflow?</em>"), never the template's generic one.
- **Ask Safwan for his own proof:** screenshots of his real workflow, something that worked, something AI got wrong. Add them when he sends them; never invent them.
- Outside reviews (e.g. from ChatGPT): apply what's right, but keep the positioning rules above (generalist, never "specialist") and check claims against the actual CSS/code before changing things.

### Instagram Story image for a post
When he shares a post as an IG Story: 1080×1920 PNG from `_templates/ig-story.html` (same photo as the post's cover, "New on the blog" label, title with one `<em>` word, up to three short points, "Tap the link to read ↓" with empty space below for the link sticker, Safwan. + safwandigital.com at the bottom; keep text out of the top ~240px and bottom ~120px). Serve the repo root locally, screenshot with headless Chromium, and send him the file; it is not committed.

## Adding a resource (freebie)
Resources are things people download or use (Claude skills, templates, checklists), often promised in a Reel. Not blog posts.
1. Short slug, e.g. `meta-ads-checklist`. Page at `resources/<slug>/index.html`, built like `resources/claude-reel-skill/` (same head, CSP, header with Resources active, footer). Files to download go in the same folder.
2. Read every file before publishing it (the repo is public) and check it works the way the page says.
3. Cover `resources/<slug>/cover.jpg` (1200×900 from `_templates/blog-cover.html`, category "Free resource", a different photo each time) + `thumb.webp` (600×450); cover.jpg is the og:image.
4. No orphans: add a card at the top of `<div class="posts" id="resources">` in `resources/index.html` and to its ItemList schema; link it from related blog posts (in-text + "Related reading") and link those posts back from the resource page.
5. Add it to `sitemap.xml` and to the Key pages in `llms.txt`.
6. Show Safwan the draft; publish only after he says yes. Then check the live URL and the download work.

## SEO and AI search checklist (every page and post)
Based on Google's SEO Starter Guide and its AI optimization guide (July 2026): optimising for AI Overviews and AI Mode is still SEO. There are no special files, markup or "AI writing" tricks; the biggest factor is useful, original, first-hand content.
- `<title>` about 50–65 characters with the main keyword first; meta description 120–160 characters; canonical, og:title/description/url/image and `twitter:card` (summary_large_image). Avoid changing titles on the main pages more than every few weeks; give Google time to settle.
- A direct answer near the top (`<p class="tldr">` on posts), question-style headings, and real text (not only images) for every claim. If a number or result appears in a screenshot, also write it in the page text.
- Use Safwan's own experience: real examples, real numbers he has confirmed, what he changed and why. Never write generic text an AI could produce without him.
- Link related pages to each other with descriptive link text (services ↔ case studies ↔ blog posts). Never "click here".
- Images: descriptive alt text, `width` and `height` attributes, and placed next to the text they support.
- Structured data must match the visible page. FAQPage schema is kept for understanding but no longer shows as a rich result (Google removed FAQ rich results in May 2026), so it's optional on new pages. Where a page has it, keep the question and answer text identical to the visible FAQ.
- JSON-LD links to the shared Person entity `{"@id": "https://safwandigital.com/#person"}` (jobTitle "Digital Marketing Consultant", generalist, Palakkad, sameAs socials, image `assets/photo.jpg`) instead of redefining it differently. The business name in schema is "Safwan Digital".
- `llms.txt` is optional upkeep for non-Google AI tools (Google doesn't use it). Keep it factual: quick facts, selected results (only confirmed numbers), key pages and newest posts first. No self-promotional Q&A.
- `robots.txt` has one `User-agent: *` group that allows everything; keep it that way (no per-bot groups).
- Update `<lastmod>` in `sitemap.xml` when a page's content changes meaningfully.
- Search Console (Safwan does this): sitemap submitted, new pages inspected and indexing requested, Settings → Search generative AI set to Include, and check the Generative AI performance report monthly.

## Writing voice
Follow Safwan's voice: experience-first, humble, plain words, real numbers, no AI buzzwords (leverage, unlock, elevate, game-changer…), no em-dash drama. Example first, principle second. Never invent client results or numbers; ask him for real ones. Healthcare content must stay accurate to NMC guidelines.
