import './tailwind.css';
import { renderNavbar, initNavbarAnimation } from './Components/navbar.js';
import { renderHeader, initHeaderAnimation } from './Components/header.js';
import { renderAbout } from './Components/about.js';
import { renderProjects } from './Components/projects.js';
import { renderContact } from './Components/contact.js';
import { initParallax } from './Components/parallax.js';
import { initInteractiveText } from './Components/interactiveText.js';

function smoothScroll(target, duration = 1000) {
  const targetElement = document.querySelector(target);
  if (!targetElement) return;

  const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.addEventListener('DOMContentLoaded', () => {
  const app = document.querySelector('#app');
  app.innerHTML = `
    ${renderNavbar()}
    ${renderHeader()}
    <div class="container mx-auto px-4 py-8">
      ${renderAbout()}
      ${renderProjects()}
      ${renderContact()}
    </div>
    <div id="rocket" class="rocket">🚀</div>
  `;

  console.log('App innerHTML set'); // Debugging log
  console.log(document.querySelector('#about')); // Debugging log

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
  initHeaderAnimation();
  initNavbarAnimation();
  initAboutAnimation(); // Ensure this is called
  initShootingStars();

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
    const particleCount = 1000;
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

    const colors = ['rgba(100, 255, 218, ', 'rgba(147, 112, 219, ', 'rgba(0, 50, 100, '];

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

    const offscreenCanvas = new OffscreenCanvas(canvas.width, canvas.height);
    const offscreenCtx = offscreenCanvas.getContext('2d');

    function drawElectricity() {
      offscreenCtx.clearRect(0, 0, canvas.width, canvas.height);

      const mouseRadius = 100;
      const mouseConnectRadius = 90;
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

      const centerX = isLightning ? clickX : mouseX;
      const centerY = isLightning ? clickY : mouseY;

      for (let i = 0; i < particles.length; i++) {
        const particle = particles[i];

        particle.x += particle.vx;
        particle.y += particle.vy;

        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1;

        const dx = centerX - particle.x;
        const dy = centerY - particle.y;
        const distanceToCenter = Math.hypot(dx, dy);

        let isConnected = false;

        if (distanceToCenter < maxDistance) {
          for (let j = i + 1; j < particles.length; j++) {
            const otherParticle = particles[j];
            const particleDistance = Math.hypot(particle.x - otherParticle.x, particle.y - otherParticle.y);

            if (particleDistance < 80) {
              isConnected = true;
              offscreenCtx.beginPath();
              offscreenCtx.moveTo(particle.x, particle.y);
              offscreenCtx.lineTo(otherParticle.x, otherParticle.y);
              const alpha = isLightning ? 0.4 : 0.5;
              offscreenCtx.strokeStyle = isLightning ? `rgba(255, 255, 255, ${alpha})` : `${particle.color}${alpha})`;
              offscreenCtx.lineWidth = isLightning ? 0.8 : 0.4;
              offscreenCtx.stroke();
            }
          }

          if (distanceToCenter < mouseConnectRadius) {
            offscreenCtx.beginPath();
            offscreenCtx.moveTo(particle.x, particle.y);
            offscreenCtx.lineTo(centerX, centerY);
            const alpha = isLightning ? 0.4 : 0.8;
            offscreenCtx.strokeStyle = isLightning ? `rgba(255, 255, 255, ${alpha})` : `${particle.color}${alpha})`;
            offscreenCtx.lineWidth = isLightning ? 0.8 : 0.4;
            offscreenCtx.stroke();
          }
        }

        const particleAlpha = isConnected ? 0.9 : 0.4;
        const particleRadius = isConnected ? particle.radius * 1.2 : particle.radius;
        offscreenCtx.fillStyle = `${particle.color}${particleAlpha})`;
        offscreenCtx.beginPath();
        offscreenCtx.arc(particle.x, particle.y, particleRadius, 0, Math.PI * 2);
        offscreenCtx.fill();

        if (isConnected) {
          offscreenCtx.beginPath();
          offscreenCtx.arc(particle.x, particle.y, particleRadius * 1.2, 0, Math.PI * 2);
          offscreenCtx.fillStyle = `${particle.color}0.05)`;
          offscreenCtx.fill();
        }
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(offscreenCanvas, 0, 0);

      requestAnimationFrame(drawElectricity);
    }

    drawElectricity();

    window.addEventListener('resize', debounce(() => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      offscreenCanvas.width = canvas.width;
      offscreenCanvas.height = canvas.height;
    }, 250));
  }

  initElectricityEffect();

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

  function initShootingStars() {
    const aboutSection = document.getElementById('about');
    const shootingStarsContainer = document.querySelector('.shooting-stars-container');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startShootingStars();
        } else {
          stopShootingStars();
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '-100px 0px'
    });

    observer.observe(aboutSection);

    let shootingStarsInterval;

    function startShootingStars() {
      shootingStarsInterval = setInterval(createShootingStar, 500);
    }

    function stopShootingStars() {
      clearInterval(shootingStarsInterval);
    }

    function createShootingStar() {
      const star = document.createElement('div');
      star.classList.add('shooting-star');
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      shootingStarsContainer.appendChild(star);

      setTimeout(() => {
        shootingStarsContainer.removeChild(star);
      }, 2000);
    }
  }

  initShootingStars();

  function initAboutAnimation() {
    const aboutSection = document.getElementById('about');
    aboutSection.classList.add('visible'); // Force visibility for debugging
    aboutSection.classList.remove('hidden'); // Remove hidden class for debugging
  }

  initAboutAnimation();

  function initRocketAnimation() {
    const rocket = document.getElementById('rocket');
    const maxX = window.innerWidth - 24;
    const maxY = window.innerHeight - 24;

    function moveRocket() {
      const x = Math.random() * maxX;
      const y = Math.random() * maxY;
      const rotation = Math.random() * 360;

      rocket.style.transform = `translate(${x}px, ${y}px) rotate(${rotation}deg)`;

      setTimeout(moveRocket, Math.random() * 3000 + 2000);
    }

    moveRocket();
  }

  initRocketAnimation();

  const aboutSection = document.querySelector('.about-me');
  if (aboutSection) {
    console.log('About section found');
    aboutSection.classList.add('visible');
    console.log('Visible class added');
  } else {
    console.log('About section not found');
  }
});

export { smoothScroll };
