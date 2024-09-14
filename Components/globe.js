import * as THREE from 'three';

let scene, camera, renderer, globe, wireframe;
let scrollPosition = 0;

export function renderGlobe() {
  return `<div id="globe-container" class="w-full h-full"></div>`;
}

export function initGlobe() {
  const container = document.getElementById('globe-container');
  
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  
  const size = Math.min(container.clientWidth, container.clientHeight);
  renderer.setSize(size, size);
  container.appendChild(renderer.domElement);
  
  const geometry = new THREE.SphereGeometry(6, 32, 32);
  const material = new THREE.MeshBasicMaterial({ color: 0x8a2be2, wireframe: true, transparent: true, opacity: 0.3 });
  globe = new THREE.Mesh(geometry, material);
  
  // Create a simplified wireframe
  const wireframeGeometry = new THREE.EdgesGeometry(geometry);
  const wireframeMaterial = new THREE.LineBasicMaterial({ color: 0x8a2be2, linewidth: 1, transparent: true, opacity: 0.5 });
  wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial);
  
  scene.add(wireframe);
  
  camera.position.set(2, -2, 15);
  
  window.addEventListener('resize', onWindowResize);
  window.addEventListener('scroll', onScroll);
  
  animate();
}

function onWindowResize() {
  const container = document.getElementById('globe-container');
  const size = Math.min(container.clientWidth, container.clientHeight);
  camera.aspect = 1;
  camera.updateProjectionMatrix();
  renderer.setSize(size, size);
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
