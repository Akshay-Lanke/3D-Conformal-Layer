import * as THREE from 'three';
import { createTower } from './tower.js';

export const createCastle = (scene, yellowTexture)=> {
    const blueMaterial = new THREE.MeshStandardMaterial({ color: 0x0000ff });

    //Ground
    const baseGeometry = new THREE.BoxGeometry(12, 1, 8);
    const base = new THREE.Mesh(baseGeometry, blueMaterial);
    base.position.y = 0.4;
    scene.add(base);

    //Towers
    createTower(scene, -4, -2.5, yellowTexture);
    createTower(scene, 4, -2.5, yellowTexture);

    //Connecting Wall
    const wallGeometry = new THREE.BoxGeometry(8, 3, 1);
    const wall = new THREE.Mesh(wallGeometry, blueMaterial);
    wall.position.set(0, 2, -2.5);
    scene.add(wall);
}
