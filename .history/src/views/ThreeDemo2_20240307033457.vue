<template>
  <div id="three-viewer" ref="threeDivRef"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { onMounted, ref, onBeforeUnmount } from 'vue';

// 定义全局变量和函数
const threeDivRef = ref<HTMLDivElement>();
let renderer: THREE.WebGLRenderer | undefined;
let camera: THREE.PerspectiveCamera | undefined;
let scene: THREE.Scene | undefined;
let mesh: THREE.Mesh | undefined;
let stats: Stats | undefined;

// 初始化 Three.js 场景
function initThree() {
  const threeDiv = threeDivRef.value;
  if (!threeDiv) return;

  const rendererWidth = threeDiv.clientWidth;
  const rendererHeight = threeDiv.clientHeight;

  camera = new THREE.PerspectiveCamera(50, rendererWidth / rendererHeight, 0.1, 1000);
  camera.position.set(0, 0, 5);
  camera.lookAt(0, 0, 0);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.FrontSide });
  mesh = new THREE.Mesh(geometry, material);
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xadacad);
  scene.add(mesh);

  const axesHelper = new THREE.AxesHelper(250);
  scene.add(axesHelper);

  const edgesGeometry = new THREE.EdgesGeometry(geometry);
  const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });
  const wireframe = new THREE.LineSegments(edgesGeometry, edgesMaterial);
  scene.add(wireframe);

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(rendererWidth, rendererHeight);
  threeDiv.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
}

// 动画循环
function animate() {
  if (renderer && scene && camera) {
    renderer.render(scene, camera);
    stats?.update();
    requestAnimationFrame(animate);
  }
}

// 监听窗口大小改变事件
function onResize() {
  if (renderer && camera) {
    const threeDiv = threeDivRef.value;
    if (threeDiv) {
      const rendererWidth = threeDiv.clientWidth;
      const rendererHeight = threeDiv.clientHeight;
      camera.aspect = rendererWidth / rendererHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(rendererWidth, rendererHeight);
    }
  }
}

// 监听鼠标事件
function setupMouseEvents() {
  document.addEventListener('click', handleClick);
  document.addEventListener('wheel', handleMouseWheel);
  document.addEventListener('mousedown', handleMouseDown);
  document.addEventListener('mousemove', handleMouseMove);
  document.addEventListener('mouseup', handleMouseUp);
}

// 处理点击事件
function handleClick(event: MouseEvent) {
  // 示例：点击时改变立方体颜色
  if (mesh) {
    const randomColor = Math.floor(Math.random() * 0xffffff);
    mesh.material.color.set(randomColor);
  }
}

// 处理鼠标滚轮事件
function handleMouseWheel(event: WheelEvent) {
  event.preventDefault();
  // 示例：鼠标滚轮控制缩放
  if (camera) {
    const delta = event.deltaY > 0 ? -0.1 : 0.1;
    camera.fov += delta;
    camera.updateProjectionMatrix();
  }
}

// 处理鼠标按下事件
function handleMouseDown(event: MouseEvent) {
  // 示例：记录鼠标按下的位置
  console.log(`Mouse down at: ${event.clientX}, ${event.clientY}`);
}

// 处理鼠标移动事件
function handleMouseMove(event: MouseEvent) {
  // 示例：记录鼠标移动的位置
  console.log(`Mouse move to: ${event.clientX}, ${event.clientY}`);
}

// 处理鼠标抬起事件
function handleMouseUp(event: MouseEvent) {
  // 示例：记录鼠标抬起的位置
  console.log(`Mouse up at: ${event.clientX}, ${event.clientY}`);
}

onMounted(() => {
  if (WebGL.isWebGLAvailable()) {
    initThree();
    setupMouseEvents();
    animate();
    window.addEventListener('resize', onResize);
  } else {
    const warning = WebGL.getWebGLErrorMessage();
    threeDivRef.value?.appendChild(warning);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', onResize);
  document.removeEventListener('click', handleClick);
  document.removeEventListener('wheel', handleMouseWheel);
  document.removeEventListener('mousedown', handleMouseDown);
  document.removeEventListener('mousemove', handleMouseMove);
  document.removeEventListener('mouseup', handleMouseUp);
});
</script>

<style scoped>
#three-viewer {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>