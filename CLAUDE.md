# Mohammed Safwan — personal website

Owner: Mohammed Safwan (Kerala-based freelance digital marketer). He has no coding knowledge, so explain everything in plain, simple language and do the technical work for him.

## How the site works
- Plain HTML/CSS/JS. No build step, no Node. Shared styles in `assets/style.css`, shared script in `assets/main.js`, icons in `assets/icons.svg` (use `<svg><use href="/assets/icons.svg#arrow"/></svg>`).
- Hosted on GitHub Pages from the `main` branch of `safwanmohd99/safwanmohd99.github.io`. Pushing to `main` publishes the site in about a minute.
- Header, footer and WhatsApp button are repeated on every page. If you change one, change all pages (`index.html`, `services/`, `about/`, `blog/`, `blog/*/`, `404.html`, `_templates/blog-post.html`).
- Photo: `assets/photo.jpg`. Pages fall back to an "S" monogram if it's missing.
- Contact form posts to FormSubmit (`formsubmit.co/ajax/safwan031231@gmail.com`).

## Design
Editorial style: cream paper `#F5F1EA`, ink `#15130F`, one accent orange `#FF5A1F`. Fonts: Inter Tight (text) + Instrument Serif italic for highlighted words (`<em>` inside headings). Keep one accent word per heading.

## Adding a blog post
1. Pick a short URL slug, e.g. `why-clinics-waste-meta-ads-budget`.
2. Copy `_templates/blog-post.html` to `blog/<slug>/index.html` and fill every `{{PLACEHOLDER}}`. Body goes in `{{BODY_HTML}}` using `<p>`, `<h2>`, `<h3>`, `<ul>`, `<blockquote>`.
3. Add a card at the TOP of `<div class="posts" id="posts">` in `blog/index.html`:
   ```html
   <a href="/blog/<slug>/" class="post"><div class="cover">Short cover line</div><span class="meta">Category · 12 Oct 2026</span><h3>Title</h3><p>One-line summary.</p></a>
   ```
   (Optional cover image: put it in `blog/<slug>/cover.jpg` and use `<div class="cover"><img src="/blog/<slug>/cover.jpg" alt=""></div>`.)
4. Add the URL to `sitemap.xml`.
5. Show Safwan the draft first. Publish (commit + push) only after he says yes.

## Writing voice
Follow Safwan's voice: experience-first, humble, plain words, real numbers, no AI buzzwords (leverage, unlock, elevate, game-changer…), no em-dash drama. Example first, principle second. Never invent client results or numbers; ask him for real ones. Healthcare content must stay accurate to NMC guidelines.
