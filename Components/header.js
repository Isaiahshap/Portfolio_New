export function renderHeader() {
  return `
    <header class="flex items-center justify-center min-h-screen">
      <div class="flex items-center">
        <div class="relative w-48 h-48 mr-16 parallax" data-speed="-0.2">
          <img src="/public/yeshayaphoto.png" alt="Yeshaya" class="w-full h-full object-cover rounded-full shadow-lg transition-all duration-300 hover:scale-105 hover:rotate-3 animate-float">
        </div>
        <div class="flex flex-col items-center">
          <h1 class="text-6xl font-bold mb-4">
            ${Array.from("YESHAYA").map(letter => `<span class="interactive-letter">${letter}</span>`).join('')}
          </h1>
          <h2 class="text-lg font-semibold text-highlight tracking-wider mb-6">
            ${Array.from("FULL STACK DEVELOPER").map(letter => `<span class="interactive-letter">${letter === ' ' ? '&nbsp;' : letter}</span>`).join('')}
          </h2>
        </div>
      </div>
    </header>
  `;
}
