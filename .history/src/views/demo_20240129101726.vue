<template>
  <div ref="container" id="demo"></div>
</template>
  
<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted } from 'vue';
const container = ref<HTMLDivElement>()
onMounted(() => {
  const threeDiv = container.value as HTMLElement
  let rendererWidth = threeDiv.clientWidth;
  let rendererHeight = threeDiv.clientHeight;
  const camera = new THREE.PerspectiveCamera(70, rendererWidth / rendererHeight, 0.1, 1000);
  const scene = new THREE.Scene();

  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
  }

  animate();
})
</script>
  
<style scoped >
#demo {
  width: 100%;
  height: 100%;
  border: 1px solid red;
}
</style>