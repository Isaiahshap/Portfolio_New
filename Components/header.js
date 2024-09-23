export function renderHeader() {
  return `
    <header class="flex items-center justify-center min-h-screen relative">
      <div class="header-content flex flex-col items-center w-full max-w-6xl mx-auto">
        <div class="flex items-start w-full">
          <div class="relative w-48 h-48 mr-16 parallax" data-speed="-0.2">
            <img src="/public/yeshayaphoto.png" alt="Yeshaya" class="w-full h-full object-cover rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:rotate-3 animate-drop-in" id="profile-image">
          </div>
          <div class="flex-grow flex flex-col">
            <h1 class="text-8xl mb-8 no-select font-light" style="font-family: 'Quicksand', sans-serif;">
              ${Array.from("Hi, ").map(letter => `<span class="interactive-letter">${letter}</span>`).join('')}
              ${Array.from("I'm ").map(letter => `<span class="interactive-letter">${letter}</span>`).join('')}
              ${Array.from("Yeshaya").map(letter => `<span class="interactive-letter text-purple-500">${letter}</span>`).join('')}
              <span class="interactive-letter">.</span>
            </h1>
            <div class="mt-32">
              <h2 class="text-2xl text-highlight tracking-wider mb-6 no-select font-light text-light-orange" style="font-family: 'Quicksand', sans-serif;">
                ${Array.from("I make interactive and satisfying web applications.").map(letter => `<span class="interactive-letter">${letter === ' ' ? '&nbsp;' : letter}</span>`).join('')}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <div class="absolute bottom-16 left-1/2 transform -translate-x-1/2">
        <div class="scroll-indicator">
          <div class="scroll-indicator-dot"></div>
        </div>
      </div>
    </header>
  `;
}

export function initHeaderAnimation() {
  const header = document.querySelector('header');
  const scrollIndicator = document.querySelector('.scroll-indicator');
  const headerContent = document.querySelector('.header-content');

  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 100) {
      scrollIndicator.classList.add('scroll-indicator-hidden');
      headerContent.classList.add('header-content-hidden');
    } else {
      scrollIndicator.classList.remove('scroll-indicator-hidden');
      headerContent.classList.remove('header-content-hidden');
    }
  });
}
