export function renderAbout() {
  return `
    <section id="about" class="relative py-32 text-white opacity-0 transition-opacity duration-500 ease-in-out">
      <div class="space-gradient absolute inset-0 rounded-[150px]"></div>
      <div class="container mx-auto px-8 relative z-10">
        <h2 class="text-4xl font-bold mb-12 text-center">About Me</h2>
        <div class="flex flex-col items-center justify-center">
          <div class="w-full max-w-2xl space-y-6 text-center">
            <p class="text-lg leading-relaxed">
              I'm a passionate Full Stack Developer with a keen eye for design and a strong foundation in modern web technologies. My journey in web development has equipped me with the skills to create efficient and captivating web experiences.
            </p>
            <p class="text-lg leading-relaxed">
              From crafting sleek user interfaces to architecting robust backend systems, I thrive on bringing ideas to life through clean, efficient code. My goal is to build digital solutions that not only meet but exceed expectations.
            </p>
            <div class="flex flex-wrap justify-center gap-4 mt-8">
              <span class="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">JavaScript</span>
              <span class="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">React</span>
              <span class="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">Node.js</span>
              <span class="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">Python</span>
              <span class="px-4 py-2 bg-blue-600 text-white rounded-full text-sm font-semibold">AWS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
