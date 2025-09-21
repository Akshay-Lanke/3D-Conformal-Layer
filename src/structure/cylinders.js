// src/castle/cylinders.js
import * as THREE from "three";

export const CYL_RADIUS = 2.4;
export const CYL_HEIGHT = 6.0;
export const CYL_GAP = 6.0;

export function createCylinders(scene, radialSegments = 32) {
  const existing = scene.getObjectByName("cylinders");
  if (existing) scene.remove(existing);

  const group = new THREE.Group();
  group.name = "cylinders";
  const cylMat = new THREE.MeshLambertMaterial({ color: 0x9e9e9e });
  const geo = new THREE.CylinderGeometry(
    CYL_RADIUS,
    CYL_RADIUS,
    CYL_HEIGHT,
    radialSegments,
    1
  );

  const left = new THREE.Mesh(geo, cylMat);
  left.position.set(-CYL_GAP / 2, CYL_HEIGHT / 2, 0);
  group.add(left);

  const right = new THREE.Mesh(geo, cylMat);
  right.position.set(CYL_GAP / 2, CYL_HEIGHT / 2, 0);
  group.add(right);

  scene.add(group);
}
