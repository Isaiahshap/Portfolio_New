import * as THREE from 'three';

const skillsData = {
  languages: [
    { name: 'JavaScript', icon: '/js.png' },
    { name: 'Python', icon: '/python.png' },
    { name: 'TypeScript', icon: '/typescript.png' },
    { name: 'HTML', icon: '/html.png' },
    { name: 'CSS', icon: '/css.png' },
  ],
  frameworks: [
    { name: 'React', icon: '/react.png' },
    { name: 'Node.js', icon: '/nodejs.png' },
    { name: 'TailwindCSS', icon: '/tailwindcss.png' },
  ],

};

export function renderSkillsSection() {
  return `
    <section id="skills-section" class="mb-12 py-16 sticky top-0 h-screen flex flex-col justify-center">
      <h2 class="text-4xl font-semibold mb-8 text-highlight text-center">Skills</h2>
      <div id="skills-container" class="w-full h-[600px] relative"></div>
      <div id="skill-tooltip" class="hidden absolute bg-gray-800 text-white p-2 rounded-md text-sm z-10"></div>
    </section>
  `;
}

export function initSkillsGlobe() {
  const skills = Object.values(skillsData).flat();
  const container = document.getElementById('skills-container');
  const tooltip = document.getElementById('skill-tooltip');
  
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  
  renderer.setSize(container.clientWidth, container.clientHeight);
  container.appendChild(renderer.domElement);

  const spheres = [];

  const planetColors = [
    0xFFA500, 0x00CED1, 0xFF6347, 0x9370DB, 0x20B2AA, 0xDC143C, 0x00FA9A, 0x4682B4,
  ];

  skills.forEach((skill, index) => {
    const geometry = new THREE.SphereGeometry(1.2, 32, 32);
    const material = new THREE.MeshPhongMaterial({
      color: planetColors[index % planetColors.length],
      shininess: 30,
    });
    const sphere = new THREE.Mesh(geometry, material);
    
    const planeGeometry = new THREE.PlaneGeometry(1.5, 1.5);
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load(skill.icon, (texture) => {
      texture.minFilter = THREE.LinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy();
    });
    const planeMaterial = new THREE.MeshBasicMaterial({ map: texture, transparent: true, side: THREE.DoubleSide });
    const plane = new THREE.Mesh(planeGeometry, planeMaterial);
    plane.position.z = 1.21;
    
    sphere.add(plane);
    sphere.userData.skill = skill;
    
    scene.add(sphere);
    spheres.push(sphere);
  });

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  camera.position.z = 20;

  let scrollY = 0;
  let hoveredSphere = null;

  function animate() {
    requestAnimationFrame(animate);
    spheres.forEach((sphere, index) => {
      if (sphere !== hoveredSphere) {
        const angle = (index / spheres.length) * Math.PI * 2 + scrollY * 0.001;
        const radius = 10;
        sphere.position.x = Math.cos(angle) * radius;
        sphere.position.z = Math.sin(angle) * radius;
        sphere.position.y = Math.sin(scrollY * 0.001 + index) * 1.5;

        const scale = THREE.MathUtils.mapLinear(sphere.position.z, -radius, radius, 0.7, 1.3);
        sphere.scale.set(scale, scale, scale);
      }
      sphere.lookAt(camera.position);
    });
    renderer.render(scene, camera);
  }

  animate();

  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  container.addEventListener('mousemove', onMouseMove);
  container.addEventListener('mouseleave', onMouseLeave);

  function onMouseMove(event) {
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / container.clientWidth) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / container.clientHeight) * 2 + 1;
    checkIntersection(event);
  }

  function onMouseLeave() {
    hoveredSphere = null;
    tooltip.classList.add('hidden');
  }

  function checkIntersection(event) {
    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(spheres);
    
    if (intersects.length > 0) {
      const intersectedSphere = intersects[0].object;
      hoveredSphere = intersectedSphere;
      const skill = intersectedSphere.userData.skill;
      if (skill && skill.name) {
        tooltip.textContent = `${skill.name}: ${getSkillDescription(skill.name)}`;
        tooltip.style.left = `${event.clientX}px`;
        tooltip.style.top = `${event.clientY + 20}px`;
        tooltip.classList.remove('hidden');
        document.body.style.cursor = 'pointer';
      }
    } else {
      hoveredSphere = null;
      tooltip.classList.add('hidden');
      document.body.style.cursor = 'default';
    }
  }

  window.addEventListener('scroll', () => {
    scrollY = window.scrollY;
  });

  window.addEventListener('resize', onWindowResize);

  function onWindowResize() {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  }
}

function getSkillDescription(skillName) {
  const descriptions = {
    'JavaScript': 'A versatile programming language for web development',
    'Python': 'A high-level programming language known for its simplicity',
    'TypeScript': 'A typed superset of JavaScript that compiles to plain JavaScript',
    'HTML': 'The standard markup language for creating web pages',
    'CSS': 'A style sheet language used for describing the look of a document',
    'React': 'A JavaScript library for building user interfaces',
    'Node.js': 'A JavaScript runtime built on Chrome\'s V8 JavaScript engine',
    'TailwindCSS': 'A utility-first CSS framework for rapidly building custom designs',
  };
  return descriptions[skillName] || 'A valuable skill in web development';
}
