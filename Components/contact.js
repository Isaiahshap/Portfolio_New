export function renderContact() {
  return `
    <section id="contact" class="mb-12 py-16">
      <h2 class="text-4xl font-semibold mb-8 text-highlight">Contact Me</h2>
      <form class="max-w-md mx-auto">
        <div class="mb-6">
          <label for="name" class="block text-highlight font-semibold mb-2">Name</label>
          <input type="text" id="name" name="name" class="w-full px-3 py-2 bg-light-blue border border-highlight rounded-md focus:outline-none focus:ring-2 focus:ring-highlight text-white" required>
        </div>
        <div class="mb-6">
          <label for="email" class="block text-highlight font-semibold mb-2">Email</label>
          <input type="email" id="email" name="email" class="w-full px-3 py-2 bg-light-blue border border-highlight rounded-md focus:outline-none focus:ring-2 focus:ring-highlight text-white" required>
        </div>
        <div class="mb-6">
          <label for="message" class="block text-highlight font-semibold mb-2">Message</label>
          <textarea id="message" name="message" rows="4" class="w-full px-3 py-2 bg-light-blue border border-highlight rounded-md focus:outline-none focus:ring-2 focus:ring-highlight text-white" required></textarea>
        </div>
        <button type="submit" class="bg-highlight text-deep-blue font-semibold py-2 px-4 rounded-md hover:bg-white transition-colors w-full">Send Message</button>
      </form>
    </section>
  `;
}
