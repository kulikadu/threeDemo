<template>
  <div ref="demo" id="demo"></div>
</template>
  
<script setup lang="ts">
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ref, onMounted } from 'vue';
const demo = ref<HTMLDivElement>()
onMounted(() => {
  const demoDiv = demo.value as HTMLElement
  let rendererWidth = demoDiv.clientWidth;
  let rendererHeight = demoDiv.clientHeight;
  const camera = new THREE.PerspectiveCamera(70, rendererWidth / rendererHeight, 0.1, 1000);
  camera.position.z = 5;
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(rendererWidth, rendererHeight);
  demoDiv.appendChild(renderer.domElement);
  //创建一个方块并添加进场景
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);


  console.log('position', cube.position);
  const axesHelper = new THREE.AxesHelper(150);
  scene.add(axesHelper);
  // 创建一个新的LineSegments对象来表示边框
  const edges = new THREE.EdgesGeometry(geometry);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

  const wireframe = new THREE.LineSegments(edges, lineMaterial);
  // wireframe.position.set(-0.5, -0.5, -0.5);
  // 将线框对象添加到场景中
  scene.add(wireframe);


  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function onClick(event: any) {

    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera);
    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(scene.children);
    for (let i = 0; i < intersects.length; i++) {
      intersects[i].object.material.color.set(0xff0000);
    }
    renderer.render(scene, camera);
  }


  function animate() {
    requestAnimationFrame(animate);

    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.01;

    // 通过摄像机和鼠标位置更新射线
    // raycaster.setFromCamera(pointer, camera);
    // // 计算物体和射线的焦点
    // const intersects = raycaster.intersectObjects(scene.children);
    // for (let i = 0; i < intersects.length; i++) {
    //   // intersects[i].object.material.color.set(0xff0000);
    // }
    renderer.render(scene, camera);
  }
  window.addEventListener('click', onClick);
  animate();
  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  });
})
</script>
  
<style scoped >
#demo {
  width: 100%;
  height: 100%;
}
</style>