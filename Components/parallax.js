export function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(el => {
      const speed = el.dataset.speed;
      el.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}
