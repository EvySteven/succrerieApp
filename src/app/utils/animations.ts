import confetti from 'canvas-confetti';

export function triggerConfetti(origin?: { x: number; y: number }) {
  const defaults = {
    particleCount: 40,
    spread: 60,
    origin: origin ?? { x: 0.5, y: 0.6 },
    colors: ['#FF6B9D', '#FFD93D', '#A855F7', '#4ADE80'],
  };
  confetti({ ...defaults, startVelocity: 28 });
}

export function flyToCart(fromEl: HTMLElement) {
  const cartBtn = document.querySelector('[data-cart-icon]');
  if (!cartBtn) return;

  const from = fromEl.getBoundingClientRect();
  const to = cartBtn.getBoundingClientRect();

  const flyer = document.createElement('div');
  flyer.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF6B9D" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"/><path d="M8.5 8.5v.01"/><path d="M15.5 8.5v.01"/><path d="M12 12v.01"/></svg>`;
  flyer.style.cssText = `
    position: fixed;
    left: ${from.left + from.width / 2}px;
    top: ${from.top + from.height / 2}px;
    z-index: 9999;
    pointer-events: none;
    transition: all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  `;
  document.body.appendChild(flyer);

  requestAnimationFrame(() => {
    flyer.style.left = `${to.left + to.width / 2}px`;
    flyer.style.top = `${to.top + to.height / 2}px`;
    flyer.style.transform = 'scale(0.3)';
    flyer.style.opacity = '0.5';
  });

  setTimeout(() => flyer.remove(), 650);
}
