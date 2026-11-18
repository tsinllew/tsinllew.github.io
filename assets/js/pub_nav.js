(function () {
  const nav = document.querySelector('.year-nav');
  if (!nav) return;
  const chips = Array.from(nav.querySelectorAll('.chip'));
  function setActiveByHash(hash) {
    chips.forEach(c => c.classList.remove('is-active'));
    const target = chips.find(c => c.getAttribute('href') === hash);
    (target || chips[0]).classList.add('is-active');
  }
  setActiveByHash(location.hash || chips[0].getAttribute('href'));
  chips.forEach(c => {
    c.addEventListener('click', function () {
      const href = this.getAttribute('href');
      setTimeout(() => setActiveByHash(href), 0);
    });
  });
  window.addEventListener('hashchange', () => setActiveByHash(location.hash));
})();