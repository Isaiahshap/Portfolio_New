export function renderProjects() {
  const projects = [
    { title: 'Yeshaya.net', description: 'A 90s themed retro website.', tech: ['HTML', 'CSS', 'JavaScript'], image: '/path/to/yeshaya-net.jpg', link: 'https://yeshaya.net/' },
    { title: '3D Hotdog Component Library', description: 'A library for 3D hotdog components.', tech: ['Vue.js', 'Express', 'PostgreSQL'], image: '/path/to/project-two.jpg', link: 'https://github.com/Isaiahshap/hotdog-library' },
    { title: 'Project Three', description: 'A brief description of project three.', tech: ['React Native', 'Firebase'], image: '/path/to/project-three.jpg' },
  ];

  return `
    <section id="projects" class="py-20 text-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold mb-12 text-center animate-fade-in-up">Projects</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          ${projects.map((project, index) => `
            <div class="bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl animate-fade-in-up">
              <a href="${project.link}" target="_blank">
                <img src="${project.image}" alt="${project.title}" class="w-full h-48 object-cover transform hover:scale-105 transition-transform duration-300" />
              </a>
              <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${project.title}</h3>
                <p class="text-gray-400 mb-4">${project.description}</p>
                <div class="flex flex-wrap gap-2">
                  ${project.tech.map(tech => `
                    <span class="px-2 py-1 bg-blue-600 text-white rounded-full text-xs font-semibold">${tech}</span>
                  `).join('')}
                </div>
              </div>
            </div>
          `).join('')}
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
