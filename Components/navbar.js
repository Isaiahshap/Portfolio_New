import { smoothScroll } from '../main.js';

export function renderNavbar() {
  return `
    <nav id="navbar" class="fixed w-full z-50 transition-all duration-500 opacity-0 transform -translate-y-full">
      <div class="container mx-auto px-4 py-3">
        <div class="flex justify-between items-center backdrop-blur-md bg-opacity-20 bg-gray-900 rounded-full px-6 py-2">
          <a href="#" class="text-xl font-light text-highlight tracking-wider">YS</a>
          <div class="space-x-6">
            <a href="#about" class="nav-link text-sm text-gray-300 transition-colors duration-300 uppercase tracking-widest">About</a>
            <a href="#projects" class="nav-link text-sm text-gray-300 transition-colors duration-300 uppercase tracking-widest">Projects</a>
            <a href="#contact" class="nav-link text-sm text-gray-300 transition-colors duration-300 uppercase tracking-widest">Contact</a>
          </div>
        </div>
      </div>
    </nav>
  `;
}

export function initNavbarAnimation() {
  const navbar = document.getElementById('navbar');
  const header = document.querySelector('header');
  let lastScrollTop = 0;

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const headerBottom = header.offsetTop + header.offsetHeight;
    const scrollDirection = scrollPosition > lastScrollTop ? 'down' : 'up';

    if (scrollPosition > headerBottom - window.innerHeight / 2) {
      navbar.style.opacity = '1';
      navbar.style.transform = `translateY(${scrollDirection === 'down' ? '0' : '-10px'})`;
    } else {
      navbar.style.opacity = '0';
      navbar.style.transform = 'translateY(-100%)';
    }

    lastScrollTop = scrollPosition <= 0 ? 0 : scrollPosition;
  });

  // Add event listeners for smooth scrolling
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      smoothScroll(target, 1000);
    });
  });
}
