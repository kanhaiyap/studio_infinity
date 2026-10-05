// Elements marked [data-parallax] get a --py value (-4 to 4) as they cross the viewport,
// which their images use to drift slightly slower than the page scrolls.
const RANGE = 4;

if (!matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const items = [...document.querySelectorAll<HTMLElement>('[data-parallax]')];
  const visible = new Set<HTMLElement>();
  let queued = false;

  const update = () => {
    queued = false;
    const vh = window.innerHeight;
    for (const el of visible) {
      const rect = el.getBoundingClientRect();
      const progress = (rect.top + rect.height / 2 - vh / 2) / vh; // -1 (above centre) … 1 (below)
      const clamped = Math.max(-1, Math.min(1, progress));
      el.style.setProperty('--py', (clamped * RANGE).toFixed(2));
    }
  };

  const queue = () => {
    if (!queued) {
      queued = true;
      requestAnimationFrame(update);
    }
  };

  if (items.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) visible.add(entry.target as HTMLElement);
        else visible.delete(entry.target as HTMLElement);
      }
      queue();
    });
    items.forEach((el) => observer.observe(el));
    window.addEventListener('scroll', queue, { passive: true });
    window.addEventListener('resize', queue);
  }
}
