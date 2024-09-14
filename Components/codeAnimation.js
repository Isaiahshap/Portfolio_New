export function renderCodeAnimation() {
  return `
    <section id="code-animation" class="container mx-auto mb-8 p-4 rounded-lg">
      <pre class="text-highlight text-sm font-mono" style="height: ${29 * 1.5}em;"><code id="code-content"></code></pre>
    </section>
  `;
}

export function initCodeAnimation() {
  const codeContent = document.getElementById('code-content');
  const skills = [
    'const skills = {',
    '  languages: ["JavaScript", "Python", "TypeScript", "HTML", "CSS"],',
    '  frameworks: ["React", "Node.js", "Express", "TailwindCSS"],',
    '  databases: ["MongoDB", "PostgreSQL", "MySQL"],',
    '  tools: ["Git", "Docker", "AWS", "Webpack"],',
    '  practices: ["Agile", "TDD", "CI/CD", "RESTful APIs"]',
    '};',
    '',
    'function displayExpertise() {',
    '  console.log("Full Stack Developer with expertise in:");',
    '  Object.entries(skills).forEach(([category, items]) => {',
    '    console.log(`  ${category}:`);',
    '    items.forEach(item => console.log(`    - ${item}`));',
    '  });',
    '}',
    '',
    'displayExpertise();'
  ];

  let currentLine = 0;
  let currentChar = 0;

  function typeCode() {
    if (currentLine < skills.length) {
      if (currentChar < skills[currentLine].length) {
        codeContent.innerHTML += skills[currentLine][currentChar];
        currentChar++;
        setTimeout(typeCode, 25);
      } else {
        codeContent.innerHTML += '<br>';
        currentLine++;
        currentChar = 0;
        setTimeout(typeCode, 100);
      }
    }
  }

  typeCode();
}
