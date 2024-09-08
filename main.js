import './tailwind.css';
import { renderNavbar } from './Components/navbar.js';
import { renderHeader } from './Components/header.js';
import { renderAbout } from './Components/about.js';
import { renderProjects } from './Components/projects.js';
import { renderContact } from './Components/contact.js';
import { initParallax } from './Components/parallax.js';
import { initInteractiveText } from './Components/interactiveText.js';
import { renderGlobe, initGlobe } from './Components/globe.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  app.innerHTML = `
    ${renderNavbar()}
    ${renderHeader()}
    <div class="container mx-auto my-16">
      ${renderGlobe()}
    </div>
    <div class="container mx-auto px-4 py-8">
      ${renderAbout()}
      ${renderProjects()}
      ${renderContact()}
    </div>
  `;

  // Mouse tracking animation
  const cursor = document.getElementById('cursor');
  document.addEventListener('mousemove', (e) => {
    cursor.style.transform = `translate(${e.clientX - 8}px, ${e.clientY - 8}px)`;
  });

  // Scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-fade-in-up');
        if (entry.target.classList.contains('from-left')) {
          entry.target.classList.add('animate-slide-in-left');
        } else if (entry.target.classList.contains('from-right')) {
          entry.target.classList.add('animate-slide-in-right');
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('section, .animate-on-scroll').forEach(el => {
    observer.observe(el);
  });

  initParallax();
  initInteractiveText();
  initGlobe();

  function initDotHoverEffect() {
    const dots = document.querySelectorAll('.dot');
    dots.forEach(dot => {
      dot.addEventListener('mouseenter', () => {
        dot.style.opacity = '0.8';
        dot.style.filter = 'brightness(1.5)';
      });
      dot.addEventListener('mouseleave', () => {
        dot.style.opacity = '1';
        dot.style.filter = 'none';
      });
    });
  }

  initDotHoverEffect();
});
