import * as THREE from 'three';

export const createCrenellations = (scene, tower, radius, count, material) =>{
    //Reuse geometry and material
    const blockGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

    //Create an InstancedMesh (one geometry, one material, many instances) 
    const instancedMesh = new THREE.InstancedMesh(blockGeometry, material, count);


    for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2;

        const x = tower.position.x + (radius + 0.3) * Math.cos(angle);
        const z = tower.position.z + (radius + 0.3) * Math.sin(angle);
        const y = tower.position.y + 2.75;

        const matrix = new THREE.Matrix4();
        matrix.setPosition(x, y, z);

        instancedMesh.setMatrixAt(i, matrix);
    }

    scene.add(instancedMesh);
}
