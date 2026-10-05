// Elements marked [data-magnetic] drift slightly toward the cursor (mouse/trackpad only).
const MAX_SHIFT = 10;

const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;

if (finePointer && !reducedMotion) {
  document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
    el.addEventListener('pointermove', (event) => {
      const rect = el.getBoundingClientRect();
      const clamp = (n: number) => Math.max(-MAX_SHIFT, Math.min(MAX_SHIFT, n));
      const x = clamp((event.clientX - (rect.left + rect.width / 2)) * 0.25);
      const y = clamp((event.clientY - (rect.top + rect.height / 2)) * 0.35);
      el.style.transform = `translate(${x}px, ${y}px)`;
    });
    el.addEventListener('pointerleave', () => {
      el.style.transform = '';
    });
  });
}
