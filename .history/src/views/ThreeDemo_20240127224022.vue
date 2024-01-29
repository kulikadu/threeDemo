<template>
  <div id="three-viewer" ref="threeDivRef">2342343</div>
</template>

<script setup >
import * as THREE from 'three';


// document.body.appendChild(renderer.domElement);

// animation



onMounted(() => {
  const threeDiv = document.getElementById('three-viewer')
  const width = threeDiv.clientWidth, height = threeDiv.clientHeight;

  // init

  const camera = new THREE.PerspectiveCamera(70, width / height, 0.01, 10);
  // const camera = new THREE.camera();
  camera.position.z = 1;

  const scene = new THREE.Scene();

  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshNormalMaterial();

  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(width, height);
  renderer.setAnimationLoop(animation);
  const animation = (time) => {

    mesh.rotation.x = time / 2000;
    mesh.rotation.y = time / 1000;

    renderer.render(scene, camera);

  }
  if (threeDiv) {
    console.log(threeDiv);
    threeDiv.appendChild(renderer.domElement);
    animation(100)
  }
})  
</script>

<style  scoped >
#three-viewer {
  width: 100vh;
  height: 100vh;
  border: 1px solid black;
  position: absolute;
}
</style>