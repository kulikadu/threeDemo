<template>
  <div id="three-viewer" ref="threeDivRef">2342343</div>
</template>

<script setup>
import { PerspectiveCamera, Mesh, MeshNormalMaterial, WebGLRenderer } from 'three';

onMounted(() => {
  const threeDiv = ref(null);
  const rendererWidth = threeDiv.value.clientWidth;
  const rendererHeight = threeDiv.value.clientHeight;
  const camera = new PerspectiveCamera(70, rendererWidth / rendererHeight, 0.01, 10);
  camera.position.z = 1;
  const scene = new THREE.Scene();
  const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const material = new MeshNormalMaterial();
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  const renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(rendererWidth, rendererHeight);

  // 将渲染器DOM元素添加到DOM中
  onMounted(() => {
    if (threeDiv && renderer.domElement) {
      threeDiv.value.appendChild(renderer.domElement);
      animate();
    }
  });

  function animate() {
    mesh.rotation.x += 0.01;
    mesh.rotation.y += 0.01;
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }

  // 初始动画
  animate();
});
</script>

<style scoped>
#three-viewer {
  width: 100vh;
  height: 100vh;
  border: 1px solid black;
  position: absolute;
}
</style>