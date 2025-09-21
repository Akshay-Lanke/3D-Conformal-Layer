import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { createCylinders } from "./structure/cylinders.js";
import { initConformalLayer } from "./structure/conformalLayer.js";
import { setupUI } from "./structure/uiEvents.js";

// 1. ======= SCENE SETUP =======
const container = document.getElementById("app");
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x111116);

// Make renderer and camera always fullscreen
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.domElement.style.position = "fixed";
renderer.domElement.style.top = 0;
renderer.domElement.style.left = 0;
renderer.domElement.style.width = "100vw";
renderer.domElement.style.height = "100vh";
container.appendChild(renderer.domElement);

const camera = new THREE.PerspectiveCamera(
  70,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(0, 12, 24);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// 2. ======= LIGHTING =======
// Improved lighting: brighter hemisphere, stronger directional, and ambient
const hemiLight = new THREE.HemisphereLight(0xffffff, 0x222233, 1.1);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1.1);
dirLight.position.set(5, 10, 7);
dirLight.castShadow = true;
scene.add(dirLight);

const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
fillLight.position.set(-8, 6, -8);
scene.add(fillLight);

const ambLight = new THREE.AmbientLight(0xffffff, 0.25);
scene.add(ambLight);

// 3. ======= OBJECTS =======
// --- Base Plane ---
const baseMaterial = new THREE.MeshLambertMaterial({ color: 0x2b6bff });
const baseGeo = new THREE.BoxGeometry(18, 0.6, 8);
const base = new THREE.Mesh(baseGeo, baseMaterial);
base.position.y = -0.3;
scene.add(base);


// 4. ======= UI & EVENT LISTENERS =======
setupUI(camera, scene);

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// 5. ======= RENDER LOOP =======
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}

// --- Initial Call ---
createCylinders(scene);
initConformalLayer(scene);
animate();
