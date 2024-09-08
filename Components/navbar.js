export function renderNavbar() {
  return `
    <nav class="bg-light-blue shadow-md fixed w-full z-10">
      <div class="container mx-auto px-4 py-4 flex justify-between items-center">
        <a href="#" class="text-2xl font-bold text-highlight">Yeshaya</a>
        <div class="space-x-4">
          <a href="#about" class="text-white hover:text-highlight transition-colors">About</a>
          <a href="#projects" class="text-white hover:text-highlight transition-colors">Projects</a>
          <a href="#contact" class="text-white hover:text-highlight transition-colors">Contact</a>
        </div>
      </div>
    </nav>
  `;
}
