// conversion events for Google Analytics (they do nothing until GA4 is added to the pages)
const track = (name, params) => { if (typeof gtag === 'function') gtag('event', name, params); };
document.addEventListener('click', e => {
  const a = e.target.closest('a[href]');
  if (!a) return;
  if (a.href.includes('wa.me/')) track('whatsapp_click', {link_url: a.href});
  else if (a.href.startsWith('tel:')) track('phone_click', {link_url: a.href});
  else if (a.href.startsWith('mailto:')) track('email_click', {link_url: a.href});
});

// if a photo is missing, remove it so the "S" monogram or plain card shows instead
document.querySelectorAll('img[data-fallback]').forEach(img => {
  if (img.complete && !img.naturalWidth) img.remove();
  else img.addEventListener('error', () => img.remove());
});

// don't let other sites show this site inside a frame (clickjacking)
if (window.top !== window.self) window.top.location = window.location.href;

// footer year
document.querySelectorAll('.yr').forEach(el => el.textContent = new Date().getFullYear());

// thin line under the header once you scroll
const header = document.querySelector('header');
const onScroll = () => header?.classList.toggle('scrolled', scrollY > 8);
addEventListener('scroll', onScroll, {passive: true}); onScroll();

// mobile menu
const links = document.querySelector('.links');
document.querySelector('.menu-btn')?.addEventListener('click', () => links.classList.toggle('open'));
links?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => links.classList.remove('open')));

// gentle fade-in on scroll
const io = 'IntersectionObserver' in window ? new IntersectionObserver(es => es.forEach(e => {
  if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), {threshold: .15}) : null;
document.querySelectorAll('.reveal').forEach(el => io ? io.observe(el) : el.classList.add('in'));

// about page cards: let the hover glow follow the cursor
if (matchMedia('(hover: hover)').matches) document.querySelectorAll('.focus').forEach(card => card.addEventListener('pointermove', e => {
  const r = card.getBoundingClientRect();
  card.style.setProperty('--x', e.clientX - r.left + 'px');
  card.style.setProperty('--y', e.clientY - r.top + 'px');
}));

// portfolio: filters, case study pop-up, image viewer, count-up numbers
const pfGrid = document.querySelector('.pf-grid');
if (pfGrid) {
  const cases = [...pfGrid.querySelectorAll('.cs')];
  document.querySelectorAll('.pf-filter').forEach(btn => btn.addEventListener('click', () => {
    document.querySelectorAll('.pf-filter').forEach(b => { b.classList.toggle('on', b === btn); b.setAttribute('aria-pressed', b === btn); });
    const f = btn.dataset.filter;
    cases.forEach(c => c.classList.toggle('out', f !== 'all' && !c.dataset.tags.split(' ').includes(f)));
  }));

  const dlg = document.querySelector('.cs-dialog'), dBody = dlg.querySelector('.cs-d-body');
  const openCase = cs => {
    dlg.querySelector('.cs-d-where').textContent = cs.querySelector('.cs-where').textContent;
    dlg.querySelector('h2').textContent = cs.querySelector('h3').textContent;
    const r = cs.querySelector('.cs-result');
    dlg.querySelector('.cs-d-result').innerHTML = r.innerHTML;
    dBody.innerHTML = cs.querySelector('.cs-body').innerHTML;
    dBody.querySelectorAll('.cs-tabs button').forEach(b => b.addEventListener('click', () => {
      dBody.querySelectorAll('.cs-tabs button').forEach(x => x.setAttribute('aria-selected', x === b));
      dBody.querySelectorAll('.cs-panel').forEach(p => p.hidden = p.dataset.panel !== b.dataset.tab);
    }));
    dlg.showModal(); dlg.scrollTop = 0;
    history.replaceState(null, '', '#' + cs.id);
  };
  cases.forEach(cs => {
    const card = cs.querySelector('.cs-card');
    card.addEventListener('click', e => { e.preventDefault(); openCase(cs); });
    if (matchMedia('(hover: hover)').matches) card.addEventListener('pointermove', e => {
      const r = card.getBoundingClientRect();
      card.style.setProperty('--x', e.clientX - r.left + 'px'); card.style.setProperty('--y', e.clientY - r.top + 'px');
    });
  });
  dlg.querySelector('.cs-close').addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => history.replaceState(null, '', location.pathname));
  const fromHash = cases.find(c => '#' + c.id === location.hash);
  if (fromHash) openCase(fromHash);

  const lb = document.querySelector('.cs-lightbox'), lbImg = lb.querySelector('img');
  let lastImg = null;
  const openImg = img => {
    lastImg = img; lbImg.src = img.src; lbImg.alt = img.alt; lb.hidden = false;
    (dlg.open ? dlg : document.body).appendChild(lb);
    lb.querySelector('button').focus();
  };
  const closeImg = () => { lb.hidden = true; lastImg?.focus(); };
  document.addEventListener('click', e => {
    const img = e.target.closest('.cs-gallery img, .pf-f-gallery img, .seo-shots img');
    if (img) openImg(img);
  });
  // screenshots open with Enter or Space too
  document.addEventListener('keydown', e => {
    const img = e.target.closest?.('.cs-gallery img, .pf-f-gallery img, .seo-shots img');
    if (img && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); openImg(img); }
  });
  lb.addEventListener('click', closeImg);
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !lb.hidden) { e.preventDefault(); closeImg(); } });

  const feat = document.querySelector('.pf-feature');
  if (feat) {
    const run = () => {
      feat.classList.add('in');
      if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      feat.querySelectorAll('[data-count]').forEach(el => {
        const end = +el.dataset.count, dec = +(el.dataset.dec || 0), suf = el.dataset.suf || '', t0 = performance.now();
        const step = now => { const p = Math.min(1, (now - t0) / 1200), v = end * (1 - Math.pow(1 - p, 3));
          el.textContent = v.toFixed(dec) + suf; if (p < 1) requestAnimationFrame(step); };
        requestAnimationFrame(step);
      });
    };
    if ('IntersectionObserver' in window) {
      const o = new IntersectionObserver(es => { if (es[0].isIntersecting) { run(); o.disconnect(); } }, {threshold: .3});
      o.observe(feat);
    } else run();
  }
}

// contact form: sends to email via FormSubmit without leaving the page
const form = document.getElementById('contactForm');
if (form) {
  const msg = document.getElementById('formMsg');
  const openedAt = Date.now();
  // simple sum puzzle; the field has no name, so the answer is never emailed
  const puzzle = document.getElementById('puzzle'), puzzleQ = document.getElementById('puzzleQ');
  let answer = 0;
  const newPuzzle = () => {
    const a = 2 + Math.floor(Math.random() * 8), b = 1 + Math.floor(Math.random() * 9);
    answer = a + b; puzzleQ.textContent = a + ' + ' + b; puzzle.value = '';
  };
  newPuzzle();
  form.addEventListener('submit', async e => {
    e.preventDefault();
    // spam traps: bots fill the hidden field or submit within a couple of seconds of the page loading
    if (form.elements._honey.value || Date.now() - openedAt < 4000) {
      form.reset();
      msg.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
      msg.className = 'msg ok';
      return;
    }
    if (parseInt(puzzle.value.trim(), 10) !== answer) {
      msg.textContent = "That answer isn't right. Please try the new sum.";
      msg.className = 'msg err';
      newPuzzle(); puzzle.focus();
      return;
    }
    const digits = form.elements.phone.value.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      msg.textContent = 'Please enter a valid phone or WhatsApp number (at least 10 digits).';
      msg.className = 'msg err';
      form.elements.phone.focus();
      return;
    }
    const btn = form.querySelector('button');
    btn.disabled = true; btn.firstChild.textContent = 'Sending… ';
    msg.className = 'msg';
    try {
      const res = await fetch(form.action, {method: 'POST', headers: {'Accept': 'application/json'}, body: new FormData(form)});
      const data = await res.json();
      if (!res.ok || data.success === 'false' || data.success === false) {
        // FormSubmit explains its own problems (e.g. "needs activation"), so show that when it gives one
        msg.textContent = (data.message ? data.message + ' ' : '') + 'You can also message me on WhatsApp: +91 79076 78846.';
        msg.className = 'msg err';
        btn.disabled = false; btn.firstChild.textContent = 'Send message ';
        return;
      }
      track('generate_lead', {form: 'contact', found_via: form.elements.found_via.value || 'not given'});
      form.reset(); newPuzzle();
      msg.textContent = "Thanks! Your message has been sent. I'll get back to you soon.";
      msg.className = 'msg ok';
    } catch (err) {
      msg.textContent = 'Sorry, something went wrong. Please message me on WhatsApp or email instead.';
      msg.className = 'msg err';
    }
    btn.disabled = false; btn.firstChild.textContent = 'Send message ';
  });
}

// skill page: copy-to-clipboard buttons on the example prompts
document.querySelectorAll('.sk-copy').forEach(btn => btn.addEventListener('click', async () => {
  try {
    await navigator.clipboard.writeText(btn.parentElement.querySelector('pre').textContent);
    btn.textContent = 'Copied';
  } catch (err) { btn.textContent = 'Select & copy'; }
  setTimeout(() => btn.textContent = 'Copy', 2000);
}));

// light / dark mode switch in the header (theme.js sets the starting mode)
const root = document.documentElement;
const setTheme = (t, save) => {
  root.setAttribute('data-theme', t);
  if (save) { try { localStorage.setItem('theme', t); } catch (e) {} }
  themeBtn?.setAttribute('aria-label', t === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
};
const themeBtn = document.querySelector('header nav') && document.createElement('button');
if (themeBtn) {
  themeBtn.className = 'theme-btn';
  themeBtn.type = 'button';
  themeBtn.innerHTML = '<svg class="moon" viewBox="0 0 24 24"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>' +
    '<svg class="sun" viewBox="0 0 24 24"><circle cx="12" cy="12" r="4.5"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
  document.querySelector('header nav').appendChild(themeBtn);
  themeBtn.addEventListener('click', () => setTheme(root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark', true));
  setTheme(root.getAttribute('data-theme') || 'light', false);
}
// follow the phone/computer setting if the visitor hasn't picked one
matchMedia('(prefers-color-scheme: dark)').addEventListener?.('change', e => {
  let saved; try { saved = localStorage.getItem('theme'); } catch (err) {}
  if (!saved) setTheme(e.matches ? 'dark' : 'light', false);
});
