/* Hourly Value Calculator — all logic runs in the browser.
   Nothing is sent, stored or saved anywhere. */

/* ── EDITABLE CONFIG ───────────────────────────────────────── */

var TIER_MESSAGES = [
  { max: 75,      msg: 'ഒരു മണിക്കൂർ പണിയെടുത്താൽ ഒരു ചായയും പഴംപൊരിയും കഴിഞ്ഞ് ബാക്കി ചില്ലറ 😅' },
  { max: 149,     msg: 'ഒരു biryani വാങ്ങാൻ ഏകദേശം രണ്ട് മണിക്കൂർ പണി 🍗' },
  { max: 299,     msg: 'Not bad! പക്ഷേ boss-ന്റെ \'10 മിനിറ്റ് കൂടി\' ഇപ്പോഴും free ആണ് 😏' },
  { max: 599,     msg: 'നിങ്ങളുടെ ഒരു meeting-ന് നല്ല വിലയുണ്ട്. Email-ൽ തീർക്കാൻ പറ 😎' },
  { max: Infinity, msg: 'നിങ്ങളുടെ സമയം വിലപ്പെട്ടതാണ്. ഈ page കണ്ടിരുന്ന സമയത്തിനും വിലയുണ്ട് 😂' }
];

var COMPARISONS = [
  { emoji: '☕', name: 'ഒരു ചായ + പഴംപൊരി',  price: 25 },
  { emoji: '🍗', name: 'ഒരു biryani',          price: 200 },
  { emoji: '🎬', name: 'Movie + popcorn',       price: 250 },
  { emoji: '👟', name: 'ഒരു നല്ല ഷൂ',          price: 2500 },
  { emoji: '🏖️', name: 'ഒരു Goa trip',          price: 15000 },
  { emoji: '📱', name: 'പുതിയ iPhone',          price: 80000 },
  { emoji: '🏍️', name: 'പുതിയ bike',            price: 200000 }
];

var PAGE_URL = 'https://safwandigital.com/hourly/';

/* ── END CONFIG ────────────────────────────────────────────── */

(function () {
  var $ = function (id) { return document.getElementById(id); };

  var salaryInput   = $('salary');
  var daysInput     = $('days');
  var hoursInput    = $('hours');
  var leaveInput    = $('leave');
  var travelInput   = $('travel');
  var resultsEl     = $('results');
  var hourlyEl      = $('hourly-value');
  var perMinEl      = $('per-minute');
  var realCard      = $('real-hourly-card');
  var realEl        = $('real-hourly-value');
  var leaveCutCard  = $('leave-cut-card');
  var leaveCutText  = $('leave-cut-text');
  var monthEarnCard = $('monthly-earning-card');
  var monthEarnText = $('monthly-earning-text');
  var tierEl        = $('tier-message');
  var compareList   = $('compare-list');
  var leaveTypeField = $('leave-type-field');
  var toast         = $('toast');

  var salaryType = 'monthly';
  var leaveType  = 'paid';
  var lastHourly = 0;
  var animFrame  = null;

  /* ── Indian number formatting ─────────────────────────────── */

  function formatIndian(n) {
    n = Math.round(n);
    var s = String(n);
    if (s.length <= 3) return s;
    var last3 = s.slice(-3);
    var rest  = s.slice(0, -3);
    return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
  }

  function parseIndian(s) {
    return parseInt(String(s).replace(/,/g, '').replace(/[^\d]/g, ''), 10) || 0;
  }

  /* ── Live formatting for salary field ─────────────────────── */

  salaryInput.addEventListener('input', function () {
    var raw = this.value.replace(/,/g, '').replace(/[^\d]/g, '');
    if (raw === '') { this.value = ''; calculate(); return; }
    var num = parseInt(raw, 10);
    if (num > 10000000) num = 10000000;
    var caret = this.selectionStart;
    var oldLen = this.value.length;
    this.value = formatIndian(num);
    var newLen = this.value.length;
    var newCaret = Math.max(0, caret + (newLen - oldLen));
    this.setSelectionRange(newCaret, newCaret);
    calculate();
  });

  /* ── Toggle buttons ──────────────────────────────────────── */

  document.querySelectorAll('.hv-toggle').forEach(function (group) {
    group.querySelectorAll('.hv-tog').forEach(function (btn) {
      btn.addEventListener('click', function () {
        group.querySelectorAll('.hv-tog').forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-checked', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-checked', 'true');
        var val = btn.dataset.value;
        if (val === 'monthly' || val === 'daily') {
          salaryType = val;
          document.querySelector('.hv-label[for="salary"]').textContent =
            salaryType === 'monthly' ? 'Salary amount (₹)' : 'Daily wage (₹)';
          salaryInput.placeholder = salaryType === 'monthly' ? '25,000' : '894';
        }
        if (val === 'paid' || val === 'unpaid') leaveType = val;
        calculate();
      });
    });
  });

  /* ── Steppers ────────────────────────────────────────────── */

  document.querySelectorAll('.hv-stepper').forEach(function (wrap) {
    var input = wrap.querySelector('input');
    wrap.querySelectorAll('.hv-step').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var step = parseFloat(btn.dataset.dir);
        var val  = parseFloat(input.value) || 0;
        val = Math.round((val + step) * 10) / 10;
        var inputId = input.id;
        if (inputId === 'days')   val = Math.min(31, Math.max(1, val));
        if (inputId === 'hours')  val = Math.min(24, Math.max(1, val));
        if (inputId === 'leave')  val = Math.max(0, val);
        if (inputId === 'travel') val = Math.min(8, Math.max(0, val));
        input.value = val % 1 === 0 ? String(val) : val.toFixed(1);
        calculate();
      });
    });
    input.addEventListener('input', function () { calculate(); });
  });

  /* ── GA4 event helper (fires only if gtag exists) ─────────── */

  function track(name) {
    if (typeof gtag === 'function') gtag('event', name);
  }

  /* ── Core calculation ────────────────────────────────────── */

  function calculate() {
    var S = parseIndian(salaryInput.value);
    var D = parseFloat(daysInput.value) || 0;
    var H = parseFloat(hoursInput.value) || 0;
    var L = parseFloat(leaveInput.value) || 0;
    var T = parseFloat(travelInput.value) || 0;

    // Show/hide leave type toggle
    if (L > 0) {
      leaveTypeField.hidden = false;
    } else {
      leaveTypeField.hidden = true;
    }

    // Validation
    if (S < 1 || D < 1 || H < 1 || D > 31 || H > 24 || L < 0 || T < 0 || T > 8) {
      resultsEl.hidden = true;
      return;
    }
    if (salaryType === 'monthly' && S > 10000000) { resultsEl.hidden = true; return; }

    // Clamp leave
    if (L >= D) { resultsEl.hidden = true; return; }

    var Dw = D - L;
    var hourly = 0;
    var monthlyPay = 0;
    var leaveCut = 0;
    var showLeaveCut = false;
    var showMonthlyEarning = false;

    if (salaryType === 'monthly') {
      if (leaveType === 'paid' || L === 0) {
        monthlyPay = S;
        hourly = S / (Dw * H);
      } else {
        monthlyPay = S * Dw / D;
        hourly = S / (D * H);
        leaveCut = S * L / D;
        showLeaveCut = true;
      }
    } else {
      hourly = S / H;
      monthlyPay = S * Dw;
      showMonthlyEarning = true;
    }

    if (!isFinite(hourly) || hourly <= 0) { resultsEl.hidden = true; return; }

    // Real hourly (with travel)
    var realHourly = 0;
    if (T > 0) {
      realHourly = monthlyPay / (Dw * (H + T));
      if (!isFinite(realHourly) || realHourly <= 0) realHourly = 0;
    }

    // Per minute
    var perMin = hourly / 60;

    // Yearly working hours
    var yearlyHours = Dw * H * 12;

    // Show results
    resultsEl.hidden = false;

    // Animate the big number
    animateCount(hourlyEl, lastHourly, Math.round(hourly));
    lastHourly = Math.round(hourly);

    // Per minute
    perMinEl.textContent = 'ഒരു മിനിറ്റിന് ₹' + perMin.toFixed(2);

    // Real hourly card
    if (T > 0 && realHourly > 0) {
      realCard.hidden = false;
      realEl.textContent = '₹' + formatIndian(Math.round(realHourly));
    } else {
      realCard.hidden = true;
    }

    // Leave cut
    if (showLeaveCut && leaveCut > 0) {
      leaveCutCard.hidden = false;
      leaveCutText.textContent = 'Leave cut: ₹' + formatIndian(Math.round(leaveCut));
    } else {
      leaveCutCard.hidden = true;
    }

    // Monthly earning (daily mode)
    if (showMonthlyEarning) {
      monthEarnCard.hidden = false;
      monthEarnText.textContent = 'Monthly earning: ₹' + formatIndian(Math.round(monthlyPay));
    } else {
      monthEarnCard.hidden = true;
    }

    // Tier message
    var hourlyRound = Math.round(hourly);
    var tierMsg = '';
    for (var i = 0; i < TIER_MESSAGES.length; i++) {
      if (hourlyRound < TIER_MESSAGES[i].max || (i === TIER_MESSAGES.length - 1)) {
        tierMsg = TIER_MESSAGES[i].msg;
        break;
      }
    }
    tierEl.textContent = tierMsg;

    // Comparison list
    var html = '';
    for (var j = 0; j < COMPARISONS.length; j++) {
      var item = COMPARISONS[j];
      var hrs = item.price / hourly;
      var hrsStr;
      if (hrs < 10) {
        hrsStr = hrs.toFixed(1);
      } else {
        hrsStr = String(Math.round(hrs));
      }
      html += '<div class="hv-compare-item">' +
        '<span class="hv-ci-emoji">' + item.emoji + '</span>' +
        '<span class="hv-ci-name">' + item.name + '</span>' +
        '<span class="hv-ci-price">₹' + formatIndian(item.price) + '</span>' +
        '<span class="hv-ci-hours">' + hrsStr + ' hr</span>' +
        '</div>';
    }
    compareList.innerHTML = html;

    // Track (only the event name, no input data)
    track('calculator_used');
  }

  /* ── Count-up animation ──────────────────────────────────── */

  function animateCount(el, from, to) {
    if (animFrame) cancelAnimationFrame(animFrame);

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || from === to) {
      el.textContent = '₹' + formatIndian(to);
      return;
    }

    var duration = 400;
    var start = null;

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(from + (to - from) * ease);
      el.textContent = '₹' + formatIndian(current);
      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      }
    }
    animFrame = requestAnimationFrame(step);
  }

  /* ── Sharing ─────────────────────────────────────────────── */

  function getShareMessage() {
    var val = hourlyEl.textContent;
    return 'എന്റെ ഒരു മണിക്കൂറിന്റെ വില ' + val + ' ആണ് 😅 നിങ്ങളുടേത് എത്രയാണെന്ന് നോക്ക് 👉 ' + PAGE_URL;
  }

  $('share-whatsapp').addEventListener('click', function () {
    track('share_whatsapp_click');
    window.open('https://wa.me/?text=' + encodeURIComponent(getShareMessage()), '_blank');
  });

  $('share-native').addEventListener('click', function () {
    track('share_copy_click');
    if (navigator.share) {
      navigator.share({
        title: 'Hourly Value Calculator',
        text: getShareMessage(),
        url: PAGE_URL
      }).catch(function () {});
    } else {
      copyToClip(getShareMessage());
    }
  });

  $('copy-link').addEventListener('click', function () {
    track('share_copy_click');
    copyToClip(PAGE_URL);
  });

  function copyToClip(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(function () { showToast('Copied ✓'); });
    }
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(function () { toast.classList.remove('show'); }, 2000);
  }

  /* ── Follow CTA tracking ─────────────────────────────────── */

  $('follow-link').addEventListener('click', function () { track('follow_click'); });

  /* ── Init ─────────────────────────────────────────────────── */

  calculate();
})();
