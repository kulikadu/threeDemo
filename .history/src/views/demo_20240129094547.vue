<template>
  <div ref="threeDivRef" id="container" style="width: 200px;height: 200px;"></div>
</template>
  
<script setup lang="ts">
import * as THREE from 'three'
import { ref, onMounted } from 'vue';
const threeDivRef: any = ref(null)
onMounted(() => {
  const threeDiv = threeDivRef.value as HTMLElement
  let rendererWidth = threeDiv.clientWidth;
  let rendererHeight = threeDiv.clientHeight;
  const camera = new THREE.PerspectiveCamera(70, rendererWidth / rendererHeight, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0)
  const box = new THREE.BoxGeometry(1, 1, 1);
  const mesh = new THREE.Mesh(box, new THREE.MeshBasicMaterial({ color: 0x0000ff }));
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xadacad);
  scene.add(mesh);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(rendererWidth, rendererHeight);






  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();

  function onPointerMove(event) {

    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;

  }

  function render() {

    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera);

    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {

      intersects[i].object.material.color.set(0xff0000);

    }

    renderer.render(scene, camera);

  }

  window.addEventListener('pointermove', onPointerMove);

  window.requestAnimationFrame(render);
})
</script>
  
<style scoped >
#container {
  width: 100%;
  height: 100%;
}
</style>