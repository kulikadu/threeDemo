<template>
  <div id="three-viewer" ref="threeDivRef"></div>
</template>

<script setup lang="ts">
// import { PerspectiveCamera, Mesh, MeshNormalMaterial, WebGLRenderer } from 'three';
import * as THREE from 'three';
import { onMounted, ref } from 'vue';

// 
onMounted(() => {
  const threeDivRef: any = ref(null)
  // const threeDivRef = ref<HTMLDivElement>()
  // threeDiv.value as HTMLElement
  // const rendererWidth = threeDivRef.value.clientWidth;
  // const rendererHeight = threeDivRef.value.clientHeight;
  // const rendererWidth = 500;
  // const rendererHeight = 500;
  const camera = new THREE.PerspectiveCamera(70, threeDivRef.value.clientWidth / threeDivRef.value.clientHeight, 0.01, 10);
  camera.position.z = 1;
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new THREE.MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xadacad);
  scene.add(mesh);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(threeDivRef.value.clientWidth, threeDivRef.value.clientHeight);

  // 将渲染器DOM元素添加到DOM中
  // if (threeDivRef.value && renderer.domElement) {
  //   threeDivRef.value.appendChild(renderer.domElement);
  //   animate();
  // }
  // const ll = document.getElementById('three-viewer');
  // ll.appendChild(renderer.domElement);
  threeDivRef.value.appendChild(renderer.domElement);
  animate();
  function animate() {
    mesh.rotation.x = 100 / 20000;
    mesh.rotation.y = 100 / 20000;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

});
</script>

<style scoped>
#three-viewer {
  width: 500px;
  height: 500px;
  border: 1px solid black;
  /* position: absolute; */
}
</style>