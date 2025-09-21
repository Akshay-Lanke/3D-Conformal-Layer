
import * as THREE from "three";
import { CYL_RADIUS, CYL_HEIGHT, CYL_GAP } from "./cylinders.js";

let layerMesh, layerGeo;

/**
 * Initializes the conformal layer mesh and adds it to the scene.
 * @param {THREE.Scene} scene - The Three.js scene.
 * @param {number} wSegments - Number of width segments for the plane.
 * @param {number} hSegments - Number of height segments for the plane.
 * @param {boolean} isLowPoly - Whether to use low-poly mode.
 */
export function initConformalLayer(scene, wSegments = 80, hSegments = 40, isLowPoly = false) {
  const width = 20;
  const height = 12;
  const segW = isLowPoly ? Math.floor(wSegments / 10) : wSegments;
  const segH = isLowPoly ? Math.floor(hSegments / 10) : hSegments;

  // Create a flat plane geometry
  layerGeo = new THREE.PlaneGeometry(width, height, segW, segH);
  // Rotate so it's horizontal (XZ plane)
  layerGeo.rotateX(-Math.PI / 2);

  // Material for the conformal layer
  const mat = new THREE.MeshLambertMaterial({
    color: 0x2ecc71,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
  });

  // Create mesh and add to scene
  layerMesh = new THREE.Mesh(layerGeo, mat);
  layerMesh.name = "conformalLayer";
  scene.add(layerMesh);

  updateConformalLayer();
}

/**
 * Updates the conformal layer geometry so it smoothly bridges the two cylinders.
 * This function modifies the Y position of each vertex based on its distance to each cylinder.
 */
export function updateConformalLayer() {
  if (!layerGeo) return;

  const positions = layerGeo.attributes.position;
  const vec3 = new THREE.Vector3();

  for (let i = 0; i < positions.count; i++) {
    vec3.fromBufferAttribute(positions, i);
    const y = getConformalY(vec3.x, vec3.z);
    positions.setY(i, y);
  }

  positions.needsUpdate = true;
  layerGeo.computeVertexNormals();
}

/**
 * Calculates the Y position for a given (x, z) so the surface smoothly connects the two cylinders.
 * @param {number} x - X coordinate of the vertex.
 * @param {number} z - Z coordinate of the vertex.
 * @returns {number} - The computed Y position.
 */
function getConformalY(x, z) {
  // Distance from left and right cylinder centers
  const distLeft = Math.hypot(x + CYL_GAP / 2, z);
  const distRight = Math.hypot(x - CYL_GAP / 2, z);
  const baseY = CYL_HEIGHT - 1.2;
  let maxProfile = -Infinity;

  // If within left cylinder, calculate profile
  if (distLeft <= CYL_RADIUS) {
    maxProfile = Math.max(
      maxProfile,
      CYL_HEIGHT - Math.sqrt(CYL_RADIUS * CYL_RADIUS - distLeft * distLeft)
    );
  }
  // If within right cylinder, calculate profile
  if (distRight <= CYL_RADIUS) {
    maxProfile = Math.max(
      maxProfile,
      CYL_HEIGHT - Math.sqrt(CYL_RADIUS * CYL_RADIUS - distRight * distRight)
    );
  }

  let y;
  if (maxProfile > -Infinity) {
    // Blend between the base and the cylinder profile for smoothness
    const blend = Math.max(0, (CYL_RADIUS - Math.min(distLeft, distRight)) / CYL_RADIUS);
    y = baseY * (1 - blend) + maxProfile * blend;
  } else {
    y = baseY;
  }

  // Add a slight dip in the middle for realism
  y += Math.min(1.0, Math.abs(x) / 14.0) * -0.15;
  return y;
}

/**
 * Returns the current conformal layer mesh.
 */
export function getLayerMesh() {
  return layerMesh;
}
