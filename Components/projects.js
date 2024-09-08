export function renderProjects() {
  const projects = [
    { title: 'Project 1', description: 'A brief description of project 1.' },
    { title: 'Project 2', description: 'A brief description of project 2.' },
    { title: 'Project 3', description: 'A brief description of project 3.' },
  ];

  return `
    <section id="projects" class="mb-12 py-16">
      <h2 class="text-4xl font-semibold mb-8 text-highlight">Projects</h2>
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${projects.map(project => `
          <div class="bg-light-blue border border-highlight rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2 hover:rotate-1 cursor-pointer">
            <h3 class="text-2xl font-semibold mb-4 text-highlight">${project.title}</h3>
            <p class="text-gray-300">${project.description}</p>
          </div>
        `).join('')}
      </div>
    </section>
  `;
}
