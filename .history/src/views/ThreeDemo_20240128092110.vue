<template>
  <div id="three-viewer" ref="threeDivRef"></div>
</template>

<script setup lang="ts">
// import { PerspectiveCamera, Mesh, MeshNormalMaterial, WebGLRenderer } from 'three';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { onMounted, ref } from 'vue';

const threeDivRef = ref<HTMLDivElement>()
const threeDiv = threeDivRef.value
onMounted(() => {
  const rendererWidth = (threeDivRef.value as HTMLElement).clientWidth;
  const rendererHeight = (threeDivRef.value as HTMLElement).clientHeight;
  const camera = new THREE.PerspectiveCamera(70, rendererWidth / rendererHeight, 0.1, 1000);
  camera.position.z = 5;
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xadacad);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(rendererWidth, rendererHeight);

  const stats = new Stats();
  // 将渲染器DOM元素添加到DOM中
  if ((threeDivRef.value as HTMLElement) && renderer.domElement && WebGL.isWebGLAvailable()) {
    (threeDivRef.value as HTMLElement).appendChild(renderer.domElement);
    (threeDivRef.value as HTMLElement).appendChild(stats.domElement);
    animate();
  } else if (!WebGL.isWebGLAvailable()) {
    const warning = WebGL.getWebGLErrorMessage();
    (threeDivRef.value as HTMLElement).appendChild(warning);
    console.error('WebGL is not available.')
  }
  function animate() {
    // mesh.rotation.x = 100 / 20000;
    // mesh.rotation.y = 100 / 20000;
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    mesh.rotation.z += 0.01;

    renderer.render(scene, camera);
    stats.update();
    requestAnimationFrame(animate);
  }

});
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

#three-viewer {
  /* width: 500px;
  height: 500px; */
  width: 100vh;
  height: 100vh;
  border: 1px solid black;
  /* position: absolute; */
}
</style>