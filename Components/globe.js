import * as THREE from 'three';

let scene, camera, renderer, globe, wireframe;
let scrollPosition = 0;

export function renderGlobe() {
  return `<div id="globe-container" class="w-full h-full"></div>`;
}

export function initGlobe() {
  const container = document.getElementById('globe-container');
  
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  
  const geometry = new THREE.SphereGeometry(5, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x64ffda, wireframe: true });
  globe = new THREE.Mesh(geometry, material);
  
  // Create a simplified wireframe
  const wireframeGeometry = new THREE.EdgesGeometry(geometry);
  const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x64ffda, linewidth: 1 });
  wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
  
  scene.add(wireframe);
  
  camera.position.z = 15;
  
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('scroll', onScroll);
  
  animate();
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onScroll() {
  const newScrollPosition = window.pageYOffset;
  const scrollDelta = newScrollPosition - scrollPosition;
  
  // Rotate the globe based on scroll direction
  wireframe.rotation.y += scrollDelta * 0.001;
  
  scrollPosition = newScrollPosition;
}

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
