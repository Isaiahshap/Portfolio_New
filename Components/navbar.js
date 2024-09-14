export function renderNavbar() {
  return `
    <nav id="navbar" class="fixed w-full z-50 transition-all duration-300 opacity-0 backdrop-blur-sm">
      <div class="container mx-auto px-4 py-3 flex justify-between items-center">
        <a href="#" class="text-xl font-light text-highlight tracking-wider">YS</a>
        <div class="space-x-6">
          <a href="#about" class="text-sm text-gray-300 hover:text-highlight transition-colors duration-300 uppercase tracking-widest">About</a>
          <a href="#projects" class="text-sm text-gray-300 hover:text-highlight transition-colors duration-300 uppercase tracking-widest">Projects</a>
          <a href="#contact" class="text-sm text-gray-300 hover:text-highlight transition-colors duration-300 uppercase tracking-widest">Contact</a>
        </div>
      </div>
    </nav>
  `;
}

export function initNavbarAnimation() {
  const navbar = document.getElementById('navbar');
  const header = document.querySelector('header');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const headerBottom = header.offsetTop + header.offsetHeight;

    if (scrollPosition > headerBottom - window.innerHeight / 2) {
      navbar.style.opacity = '1';
      navbar.style.backgroundColor = 'rgba(10, 25, 47, 0.7)';
    } else {
      navbar.style.opacity = '0';
      navbar.style.backgroundColor = 'transparent';
    }
  });
}
