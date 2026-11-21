/* Hourly Value Calculator — all logic runs in the browser.
   Nothing is sent, stored or saved anywhere. */

/* ── CURRENCY & COMPARISON CONFIG ─────────────────────────── */

var CURRENCIES = {
  INR: {
    symbol: '₹', toINR: 1, format: 'indian', placeholder: '25,000', maxSalary: 10000000,
    items: [
      { emoji: '☕', name: 'ഒരു ചായ + പഴംപൊരി', price: 25 },
      { emoji: '🍗', name: 'ഒരു biryani', price: 200 },
      { emoji: '🎬', name: 'Movie + popcorn', price: 250 },
      { emoji: '👟', name: 'ഒരു നല്ല ഷൂ', price: 2500 },
      { emoji: '🏖️', name: 'ഒരു Goa trip', price: 15000 },
      { emoji: '📱', name: 'പുതിയ iPhone', price: 80000 },
      { emoji: '🏍️', name: 'പുതിയ bike', price: 200000 }
    ]
  },
  AED: {
    symbol: 'د.إ', toINR: 23, format: 'western', placeholder: '5,000', maxSalary: 500000,
    items: [
      { emoji: '☕', name: 'Karak chai', price: 2 },
      { emoji: '🍗', name: 'Shawarma plate', price: 15 },
      { emoji: '🎬', name: 'Movie + popcorn', price: 55 },
      { emoji: '👟', name: 'Good shoes', price: 300 },
      { emoji: '🏖️', name: 'Desert safari', price: 200 },
      { emoji: '📱', name: 'New iPhone', price: 4500 },
      { emoji: '🚗', name: 'Used car', price: 25000 }
    ]
  },
  SAR: {
    symbol: 'ر.س', toINR: 22, format: 'western', placeholder: '5,000', maxSalary: 500000,
    items: [
      { emoji: '☕', name: 'Chai', price: 3 },
      { emoji: '🍗', name: 'Shawarma plate', price: 15 },
      { emoji: '🎬', name: 'Movie + popcorn', price: 55 },
      { emoji: '👟', name: 'Good shoes', price: 300 },
      { emoji: '🏖️', name: 'Weekend trip', price: 2000 },
      { emoji: '📱', name: 'New iPhone', price: 4500 },
      { emoji: '🚗', name: 'Used car', price: 30000 }
    ]
  },
  QAR: {
    symbol: 'ر.ق', toINR: 23, format: 'western', placeholder: '5,000', maxSalary: 500000,
    items: [
      { emoji: '☕', name: 'Karak chai', price: 3 },
      { emoji: '🍗', name: 'Shawarma plate', price: 15 },
      { emoji: '🎬', name: 'Movie + popcorn', price: 55 },
      { emoji: '👟', name: 'Good shoes', price: 350 },
      { emoji: '🏖️', name: 'Desert safari', price: 250 },
      { emoji: '📱', name: 'New iPhone', price: 4500 },
      { emoji: '🚗', name: 'Used car', price: 30000 }
    ]
  },
  OMR: {
    symbol: 'ر.ع', toINR: 218, format: 'western', placeholder: '800', maxSalary: 50000,
    items: [
      { emoji: '☕', name: 'Coffee + snack', price: 1 },
      { emoji: '🍗', name: 'Restaurant meal', price: 3 },
      { emoji: '🎬', name: 'Movie + popcorn', price: 5 },
      { emoji: '👟', name: 'Good shoes', price: 30 },
      { emoji: '🏖️', name: 'Weekend trip', price: 150 },
      { emoji: '📱', name: 'New iPhone', price: 500 },
      { emoji: '🚗', name: 'Used car', price: 3000 }
    ]
  },
  KWD: {
    symbol: 'د.ك', toINR: 273, format: 'western', placeholder: '600', maxSalary: 40000,
    items: [
      { emoji: '☕', name: 'Coffee + snack', price: 1 },
      { emoji: '🍗', name: 'Restaurant meal', price: 2 },
      { emoji: '🎬', name: 'Movie + popcorn', price: 4 },
      { emoji: '👟', name: 'Good shoes', price: 25 },
      { emoji: '🏖️', name: 'Weekend trip', price: 120 },
      { emoji: '📱', name: 'New iPhone', price: 400 },
      { emoji: '🚗', name: 'Used car', price: 2500 }
    ]
  },
  BHD: {
    symbol: 'د.ب', toINR: 223, format: 'western', placeholder: '700', maxSalary: 50000,
    items: [
      { emoji: '☕', name: 'Coffee + snack', price: 1 },
      { emoji: '🍗', name: 'Restaurant meal', price: 3 },
      { emoji: '🎬', name: 'Movie + popcorn', price: 5 },
      { emoji: '👟', name: 'Good shoes', price: 30 },
      { emoji: '🏖️', name: 'Weekend trip', price: 150 },
      { emoji: '📱', name: 'New iPhone', price: 450 },
      { emoji: '🚗', name: 'Used car', price: 3000 }
    ]
  },
  USD: {
    symbol: '$', toINR: 84, format: 'western', placeholder: '3,000', maxSalary: 200000,
    items: [
      { emoji: '☕', name: 'Coffee', price: 5 },
      { emoji: '🍗', name: 'Lunch out', price: 15 },
      { emoji: '🎬', name: 'Movie night', price: 25 },
      { emoji: '👟', name: 'Good shoes', price: 150 },
      { emoji: '🏖️', name: 'Weekend trip', price: 800 },
      { emoji: '📱', name: 'New iPhone', price: 1200 },
      { emoji: '🚗', name: 'Used car', price: 8000 }
    ]
  },
  EUR: {
    symbol: '€', toINR: 90, format: 'western', placeholder: '3,000', maxSalary: 200000,
    items: [
      { emoji: '☕', name: 'Coffee', price: 4 },
      { emoji: '🍗', name: 'Lunch out', price: 12 },
      { emoji: '🎬', name: 'Movie night', price: 20 },
      { emoji: '👟', name: 'Good shoes', price: 130 },
      { emoji: '🏖️', name: 'Weekend trip', price: 600 },
      { emoji: '📱', name: 'New iPhone', price: 1100 },
      { emoji: '🚗', name: 'Used car', price: 6000 }
    ]
  },
  GBP: {
    symbol: '£', toINR: 105, format: 'western', placeholder: '2,500', maxSalary: 200000,
    items: [
      { emoji: '☕', name: 'Coffee', price: 4 },
      { emoji: '🍗', name: 'Lunch out', price: 12 },
      { emoji: '🎬', name: 'Movie night', price: 18 },
      { emoji: '👟', name: 'Good shoes', price: 100 },
      { emoji: '🏖️', name: 'Weekend trip', price: 500 },
      { emoji: '📱', name: 'New iPhone', price: 1000 },
      { emoji: '🚗', name: 'Used car', price: 5000 }
    ]
  }
};

var TIER_MESSAGES = [
  { maxINR: 75,       msg: 'ഒരു മണിക്കൂർ പണിയെടുത്താൽ ഒരു ചായയും പഴംപൊരിയും കഴിഞ്ഞ് ബാക്കി ചില്ലറ 😅' },
  { maxINR: 149,      msg: 'ഒരു biryani വാങ്ങാൻ ഏകദേശം രണ്ട് മണിക്കൂർ പണി 🍗' },
  { maxINR: 299,      msg: 'Not bad! പക്ഷേ boss-ന്റെ \'10 മിനിറ്റ് കൂടി\' ഇപ്പോഴും free ആണ് 😏' },
  { maxINR: 599,      msg: 'നിങ്ങളുടെ ഒരു meeting-ന് നല്ല വിലയുണ്ട്. Email-ൽ തീർക്കാൻ പറ 😎' },
  { maxINR: Infinity, msg: 'നിങ്ങളുടെ സമയം വിലപ്പെട്ടതാണ്. ഈ page കണ്ടിരുന്ന സമയത്തിനും വിലയുണ്ട് 😂' }
];

var PAGE_URL = 'https://safwandigital.com/resources/hourly-value-calculator/';

/* ── END CONFIG ────────────────────────────────────────────── */

(function () {
  var $ = function (id) { return document.getElementById(id); };

  var currencySelect = $('currency');
  var currencyPrefix = $('currency-prefix');
  var salaryInput    = $('salary');
  var daysInput      = $('days');
  var hoursInput     = $('hours');
  var leaveInput     = $('leave');
  var travelInput    = $('travel');
  var resultsEl      = $('results');
  var hourlyEl       = $('hourly-value');
  var perMinEl       = $('per-minute');
  var realCard       = $('real-hourly-card');
  var realEl         = $('real-hourly-value');
  var leaveCutCard   = $('leave-cut-card');
  var leaveCutText   = $('leave-cut-text');
  var monthEarnCard  = $('monthly-earning-card');
  var monthEarnText  = $('monthly-earning-text');
  var tierEl         = $('tier-message');
  var compareList    = $('compare-list');
  var leaveTypeField = $('leave-type-field');
  var toast          = $('toast');

  var salaryType = 'monthly';
  var leaveType  = 'paid';
  var currentCurrency = 'INR';
  var lastHourly = 0;
  var animFrame  = null;

  /* ── Number formatting ───────────────────────────────────── */

  function formatIndian(n) {
    n = Math.round(n);
    var s = String(n);
    if (s.length <= 3) return s;
    var last3 = s.slice(-3);
    var rest  = s.slice(0, -3);
    return rest.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + last3;
  }

  function formatWestern(n) {
    n = Math.round(n);
    return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  function formatNumber(n) {
    var cur = CURRENCIES[currentCurrency];
    return cur.format === 'indian' ? formatIndian(n) : formatWestern(n);
  }

  function parseNumber(s) {
    return parseInt(String(s).replace(/,/g, '').replace(/[^\d]/g, ''), 10) || 0;
  }

  function sym() {
    return CURRENCIES[currentCurrency].symbol;
  }

  function formatTime(hrs, hoursPerDay) {
    var days = hrs / hoursPerDay;
    if (days < 1.5) return '';
    if (days < 30) return Math.round(days) + ' days';
    var months = days / 30;
    if (months < 12) {
      var m = Math.round(months * 10) / 10;
      return (m % 1 === 0 ? String(m) : m.toFixed(1)) + (m === 1 ? ' month' : ' months');
    }
    var y = Math.round((months / 12) * 10) / 10;
    return (y % 1 === 0 ? String(y) : y.toFixed(1)) + (y === 1 ? ' year' : ' years');
  }

  /* ── Currency change ─────────────────────────────────────── */

  function updateCurrencyUI() {
    var cur = CURRENCIES[currentCurrency];
    currencyPrefix.textContent = cur.symbol;
    salaryInput.placeholder = cur.placeholder;
    var labelText = salaryType === 'monthly'
      ? 'Salary amount (' + cur.symbol + ')'
      : 'Daily wage (' + cur.symbol + ')';
    document.querySelector('.hv-label[for="salary"]').textContent = labelText;
  }

  currencySelect.addEventListener('change', function () {
    currentCurrency = this.value;
    updateCurrencyUI();
    var raw = salaryInput.value.replace(/,/g, '').replace(/[^\d]/g, '');
    if (raw !== '') {
      var num = parseInt(raw, 10);
      var cur = CURRENCIES[currentCurrency];
      if (num > cur.maxSalary) num = cur.maxSalary;
      salaryInput.value = formatNumber(num);
    }
    lastHourly = 0;
    calculate();
    track('currency_change');
  });

  /* ── Live formatting for salary field ────────────────────── */

  salaryInput.addEventListener('input', function () {
    var raw = this.value.replace(/,/g, '').replace(/[^\d]/g, '');
    if (raw === '') { this.value = ''; calculate(); return; }
    var num = parseInt(raw, 10);
    var maxSal = CURRENCIES[currentCurrency].maxSalary;
    if (num > maxSal) num = maxSal;
    var caret = this.selectionStart;
    var oldLen = this.value.length;
    this.value = formatNumber(num);
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
          updateCurrencyUI();
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

  /* ── GA4 event helper ────────────────────────────────────── */

  function track(name) {
    if (typeof gtag === 'function') gtag('event', name);
  }

  /* ── Core calculation ────────────────────────────────────── */

  function calculate() {
    var S = parseNumber(salaryInput.value);
    var D = parseFloat(daysInput.value) || 0;
    var H = parseFloat(hoursInput.value) || 0;
    var L = parseFloat(leaveInput.value) || 0;
    var T = parseFloat(travelInput.value) || 0;
    var cur = CURRENCIES[currentCurrency];

    if (L > 0) { leaveTypeField.hidden = false; }
    else { leaveTypeField.hidden = true; }

    if (S < 1 || D < 1 || H < 1 || D > 31 || H > 24 || L < 0 || T < 0 || T > 8) {
      resultsEl.hidden = true; return;
    }
    if (salaryType === 'monthly' && S > cur.maxSalary) { resultsEl.hidden = true; return; }
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

    var realHourly = 0;
    if (T > 0) {
      realHourly = monthlyPay / (Dw * (H + T));
      if (!isFinite(realHourly) || realHourly <= 0) realHourly = 0;
    }

    var perMin = hourly / 60;
    resultsEl.hidden = false;

    // Animate the big number
    var displayHourly = Math.round(hourly);
    animateCount(hourlyEl, lastHourly, displayHourly);
    lastHourly = displayHourly;

    // Per minute
    perMinEl.textContent = 'ഒരു മിനിറ്റിന് ' + sym() + perMin.toFixed(2);

    // Real hourly card
    if (T > 0 && realHourly > 0) {
      realCard.hidden = false;
      realEl.textContent = sym() + formatNumber(Math.round(realHourly));
    } else {
      realCard.hidden = true;
    }

    // Leave cut
    if (showLeaveCut && leaveCut > 0) {
      leaveCutCard.hidden = false;
      leaveCutText.textContent = 'Leave cut: ' + sym() + formatNumber(Math.round(leaveCut));
    } else {
      leaveCutCard.hidden = true;
    }

    // Monthly earning (daily mode)
    if (showMonthlyEarning) {
      monthEarnCard.hidden = false;
      monthEarnText.textContent = 'Monthly earning: ' + sym() + formatNumber(Math.round(monthlyPay));
    } else {
      monthEarnCard.hidden = true;
    }

    // Tier message (convert to INR equivalent for threshold comparison)
    var hourlyINR = hourly * cur.toINR;
    var tierMsg = '';
    for (var i = 0; i < TIER_MESSAGES.length; i++) {
      if (hourlyINR < TIER_MESSAGES[i].maxINR || (i === TIER_MESSAGES.length - 1)) {
        tierMsg = TIER_MESSAGES[i].msg;
        break;
      }
    }
    tierEl.textContent = tierMsg;

    // Comparison list
    var items = cur.items;
    var html = '';
    for (var j = 0; j < items.length; j++) {
      var item = items[j];
      var hrs = item.price / hourly;
      var hrsStr;
      if (hrs < 10) {
        hrsStr = hrs.toFixed(1);
      } else {
        hrsStr = String(Math.round(hrs));
      }
      var timeStr = formatTime(hrs, H);
      html += '<div class="hv-compare-item">' +
        '<span class="hv-ci-emoji">' + item.emoji + '</span>' +
        '<span class="hv-ci-name">' + item.name + '</span>' +
        '<span class="hv-ci-price">' + sym() + formatNumber(item.price) + '</span>' +
        '<span class="hv-ci-hours">' + hrsStr + ' hr</span>' +
        (timeStr ? '<span class="hv-ci-time">' + timeStr + '</span>' : '') +
        '</div>';
    }
    compareList.innerHTML = html;

    track('calculator_used');
  }

  /* ── Count-up animation ──────────────────────────────────── */

  function animateCount(el, from, to) {
    if (animFrame) cancelAnimationFrame(animFrame);

    var prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || from === to) {
      el.textContent = sym() + formatNumber(to);
      return;
    }

    var duration = 400;
    var start = null;
    var s = sym();

    function step(ts) {
      if (!start) start = ts;
      var progress = Math.min((ts - start) / duration, 1);
      var ease = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(from + (to - from) * ease);
      el.textContent = s + formatNumber(current);
      if (progress < 1) {
        animFrame = requestAnimationFrame(step);
      }
    }
    animFrame = requestAnimationFrame(step);
  }

  /* ── Sharing ─────────────────────────────────────────────── */

  function getShareMessage() {
    var val = hourlyEl.textContent;
    return 'എന്റെ ഒരു മണിക്കൂർ വരുമാനം ' + val + ' ആണ് 😅 നിങ്ങളുടേത് എത്രയാണെന്ന് നോക്ക് 👉 ' + PAGE_URL;
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
