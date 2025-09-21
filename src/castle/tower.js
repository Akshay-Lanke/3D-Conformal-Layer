import * as THREE from 'three';
import { createCrenellations } from './crenellation.js';


export const createTower = (scene, x, z, texture)=> {
    const yellowMaterial = new THREE.MeshStandardMaterial({ map: texture });

    const towerGeometry = new THREE.CylinderGeometry(1, 1, 5, 16);
    const tower = new THREE.Mesh(towerGeometry, yellowMaterial);
    tower.position.set(x, 2.5, z);
    scene.add(tower);

    createCrenellations(scene, tower, 1, 16, yellowMaterial);
}
