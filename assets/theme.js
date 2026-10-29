// Sets light or dark mode before the page is drawn, so there's no flash.
// Uses the visitor's saved choice, otherwise their phone or computer setting.
(function () {
  var t;
  try { t = localStorage.getItem('theme'); } catch (e) {}
  if (t !== 'light' && t !== 'dark') t = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.setAttribute('data-theme', t);
})();
