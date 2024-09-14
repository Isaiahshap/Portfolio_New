import './tailwind.css';
import { renderNavbar, initNavbarAnimation } from './Components/navbar.js';
import { renderHeader, initHeaderAnimation } from './Components/header.js';
import { renderAbout } from './Components/about.js';
import { renderProjects } from './Components/projects.js';
import { renderContact } from './Components/contact.js';
import { initParallax } from './Components/parallax.js';
import { initInteractiveText } from './Components/interactiveText.js';
import { renderGlobe, initGlobe } from './Components/globe.js';
import { renderCodeAnimation, initCodeAnimation } from './Components/codeAnimation.js';

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  app.innerHTML = `
    ${renderNavbar()}
    ${renderHeader()}
    <div class="container mx-auto relative mt-16 mb-16 z-0" style="height: 1000px;">
      <div class="absolute inset-0 flex items-center justify-center" style="width: 100%; height: 100%;">
        ${renderGlobe()}
      </div>
      <div class="relative z-10 w-full md:w-2/3 lg:w-1/2 mx-auto" style="padding-top: 200px;">
        ${renderCodeAnimation()}
      </div>
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
  initHeaderAnimation();
  initNavbarAnimation();
  initCodeAnimation();

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

  function initElectricityEffect() {
    const electricityBg = document.getElementById('electricity-bg');
    const particleCount = 200;
    const particles = [];
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.position = 'fixed';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';
    electricityBg.appendChild(canvas);

    const colors = ['rgba(100, 255, 218, ', 'rgba(147, 112, 219, ', 'rgba(0, 50, 100, ']; // Cyan, Purple, and Dark Blue

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1 + 0.5,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
    }

    let mouseX = 0;
    let mouseY = 0;
    let isLightning = false;
    let lightningProgress = 0;
    let lightningStartTime = 0;
    let clickX = 0;
    let clickY = 0;

    const throttledMouseMove = throttle((e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, 16);

    document.addEventListener('mousemove', throttledMouseMove);

    canvas.addEventListener('click', (e) => {
      clickX = e.clientX;
      clickY = e.clientY;
      isLightning = true;
      lightningStartTime = performance.now();
      lightningProgress = 0;
    });

    function drawElectricity() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseRadius = 200;
      const currentTime = performance.now();

      if (isLightning) {
        const elapsedTime = currentTime - lightningStartTime;
        lightningProgress = Math.min(elapsedTime / 500, 1);

        if (lightningProgress === 1) {
          setTimeout(() => {
            isLightning = false;
          }, 1000);
        }
      }

      const maxDistance = isLightning ? Math.max(canvas.width, canvas.height) * lightningProgress : mouseRadius;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        const centerX = isLightning ? clickX : mouseX;
        const centerY = isLightning ? clickY : mouseY;

        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distanceToCenter = Math.hypot(dx, dy);

        if (distanceToCenter < maxDistance) {
          for (let j = i + 1; j < particles.length; j++) {
            const otherParticle = particles[j];
            const particleDistance = Math.hypot(particle.x - otherParticle.x, particle.y - otherParticle.y);

            if (particleDistance < 100) {
              ctx.beginPath();
              ctx.moveTo(particle.x, particle.y);
              ctx.lineTo(otherParticle.x, otherParticle.y);
              ctx.strokeStyle = isLightning ? 'rgba(255, 255, 255, 0.8)' : `${particle.color}0.2)`;
              ctx.lineWidth = isLightning ? 1 : 0.5;
              ctx.stroke();
            }
          }
        }

        ctx.fillStyle = `${particle.color}0.6)`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      requestAnimationFrame(drawElectricity);
    }

    drawElectricity();

    window.addEventListener('resize', debounce(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }, 250));
  }

  function throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }
  }

  function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  initElectricityEffect();
});
