export function renderContact() {
  return `
    <section id="contact" class="py-20 text-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-12 text-center animate-fade-in-up">Get in Touch</h2>
        <div class="max-w-3xl mx-auto bg-gray-800 rounded-lg shadow-lg overflow-hidden animate-fade-in-up">
          <div class="p-8">
            <form class="space-y-6">
              <div>
                <label for="name" class="block text-sm font-medium text-gray-400 mb-2">Name</label>
                <input type="text" id="name" name="name" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" required />
              </div>
              <div>
                <label for="email" class="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input type="email" id="email" name="email" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" required />
              </div>
              <div>
                <label for="message" class="block text-sm font-medium text-gray-400 mb-2">Message</label>
                <textarea id="message" name="message" rows="4" class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-white" required></textarea>
              </div>
              <button type="submit" class="w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition duration-300 transform hover:scale-105">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
      <div class="absolute inset-0 stars"></div>
      <div class="absolute inset-0 stars2"></div>
      <div class="absolute inset-0 stars3"></div>
      <div class="absolute inset-0 planets"></div>
      <div class="absolute inset-0 space-objects"></div>
    </section>
  `;
}

export function initContactAnimations() {
  const inputs = document.querySelectorAll('input, textarea');
  inputs.forEach(input => {
    input.addEventListener('focus', () => {
      input.previousElementSibling.classList.add('text-xs', '-top-2.5', 'bg-gray-900', 'px-2');
    });
    input.addEventListener('blur', () => {
      if (!input.value) {
        input.previousElementSibling.classList.remove('text-xs', '-top-2.5', 'bg-gray-900', 'px-2');
      }
    });
  });
}
