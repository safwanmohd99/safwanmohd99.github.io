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
