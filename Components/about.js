export function renderAbout() {
  console.log('renderAbout called'); // Debugging log
  return `
    <section id="about" class="about-me relative py-32 text-white opacity-0 transition-opacity duration-500 ease-in-out">
      <div class="space-gradient absolute inset-0 rounded-[150px]"></div>
      <div class="shooting-stars-container absolute inset-0 z-0"></div>
      <div class="container mx-auto px-8 relative z-10">
        <h2 class="text-4xl font-bold mb-12 text-center">About Me</h2>
        <div class="flex flex-col items-center justify-center">
          <div class="w-full max-w-2xl space-y-6 text-center">
            <p class="text-lg leading-relaxed">
              I'm a passionate <span class="text-orange-500">Full Stack Developer</span> with a keen eye for design and a strong foundation in modern web technologies. My journey in web development has equipped me with the skills to create efficient and captivating web experiences.
            </p>
            <p class="text-lg leading-relaxed">
              From crafting sleek user interfaces to architecting robust backend systems, I thrive on bringing ideas to life through clean, efficient code. My goal is to build digital solutions that not only meet but <span class="text-orange-500">exceed expectations</span>.
            </p>
            <div class="skills-container mt-12">
              <div class="flex flex-wrap justify-center gap-4">
                <div class="skill interactive-letter">
                  <img src="/js.png" alt="JavaScript" class="skill-icon">
                </div>
                <div class="skill interactive-letter">
                  <img src="/react.png" alt="React" class="skill-icon">
                </div>
                <div class="skill interactive-letter">
                  <img src="/nodejs.png" alt="Node.js" class="skill-icon">
                </div>
                <div class="skill interactive-letter">
                  <img src="/python.png" alt="Python" class="skill-icon">
                </div>
                <div class="skill interactive-letter">
                  <img src="/html.png" alt="HTML" class="skill-icon">
                </div>
                <div class="skill interactive-letter">
                  <img src="/tailwindcss.png" alt="TailwindCSS" class="skill-icon">
                </div>
                <div class="skill interactive-letter">
                  <img src="/typescript.png" alt="TypeScript" class="skill-icon">
                </div>
                <div class="skill interactive-letter">
                  <img src="/css.png" alt="CSS" class="skill-icon">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `;
}
