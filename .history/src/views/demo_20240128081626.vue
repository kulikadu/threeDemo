<template>
  <div ref="container" id="container" style="width: 200px;height: 200px;"></div>
</template>
  
<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted } from 'vue';
const container: any = ref(null)
onMounted(() => {
  // 创建场景
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xadacad);

  // 创建相机
  const camera = new THREE.PerspectiveCamera(
    45,
    container.value.clientWidth / container.value.clientHeight,
    0.1,
    100
  );
  camera.position.set(0, 0, 3);

  // 创建渲染器
  const renderer = new THREE.WebGLRenderer();
  console.log('24', container)
  renderer.setSize(container.value.clientWidth, container.value.clientHeight);
  container.value.appendChild(renderer.domElement);

  // 定义顶点数据
  const positions = [
    -1, 0, 0,
    0, 1, 0,
  ];

  // 创建一个 BufferGeometry 对象
  const geometry = new THREE.BufferGeometry();
  const positionAttribute = new THREE.Float32BufferAttribute(positions, 3);
  geometry.setAttribute('position', positionAttribute);

  // 创建一个 LineLoop 对象
  const material = new THREE.LineBasicMaterial({ color: 0xf00, linewidth: 5 });
  const line = new THREE.LineLoop(geometry, material);

  // 将线条添加到场景中
  scene.add(line);

  // 开始渲染循环
  function render() {
    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }
  render();
})
</script>
  
<style scoped lang="less"></style>