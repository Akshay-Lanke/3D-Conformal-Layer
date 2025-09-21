// src/castle/ui.js
import { getLayerMesh, initConformalLayer } from "./conformalLayer.js";

export function setupUI(camera, scene) {
  document.getElementById("toggleLayer").addEventListener("click", () => {
    const layerMesh = getLayerMesh();
    if (layerMesh) layerMesh.visible = !layerMesh.visible;
  });

  document.getElementById("viewTop").addEventListener("click", () => {
    camera.position.set(0, 26, 0.01);
    camera.up.set(0, 0, -1);
    camera.lookAt(0, 0, 0);
  });

  document.getElementById("viewSide").addEventListener("click", () => {
    camera.position.set(24, 12, 0);
    camera.up.set(0, 1, 0);
    camera.lookAt(0, 3, 0);
  });

  document.getElementById("lowPoly").addEventListener("change", (e) => {
    const isLow = e.target.checked;
    const layerMesh = getLayerMesh();
    if (layerMesh) scene.remove(layerMesh);
    initConformalLayer(scene, 80, 40, isLow);
  });
}
