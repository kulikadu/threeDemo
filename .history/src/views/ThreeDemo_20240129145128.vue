<template>
  <div id="three-viewer" ref="threeDivRef"></div>
</template>

<script setup lang="ts">
// import { PerspectiveCamera, Mesh, MeshNormalMaterial, WebGLRenderer } from 'three';
import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import WebGL from 'three/addons/capabilities/WebGL.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { onMounted, ref } from 'vue';

const threeDivRef = ref<HTMLDivElement>()
onMounted(() => {
  const threeDiv = threeDivRef.value as HTMLElement
  let rendererWidth = threeDiv.clientWidth;
  let rendererHeight = threeDiv.clientHeight;
  const camera = new THREE.PerspectiveCamera(70, rendererWidth / rendererHeight, 0.1, 1000);
  camera.position.set(5, 5, 5);
  camera.lookAt(0, 0, 0)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshNormalMaterial();
  // const mesh = new THREE.Mesh(geometry, material);

  // 使用BufferGeometry创建一个立方体几何体
  const boxGeo = new THREE.BufferGeometry();
  const vertices = [
    0, 1, 0,
    1, 1, 0,
    1, 0, 0,
    0, 0, 0,

    0, 1, 1,
    1, 1, 1,
    1, 0, 1,
    0, 0, 1,
  ];
  const indices = [
    // 前面
    0, 1, 2,
    0, 2, 3,

    // 右面
    1, 5, 6,
    1, 6, 2,

    // 后面
    7, 6, 5,
    7, 5, 4,

    // 左面
    4, 0, 3,
    4, 3, 7,

    // 上面
    4, 5, 1,
    4, 1, 0,

    // 下面
    3, 2, 6,
    3, 6, 7,
  ];

  boxGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  boxGeo.setIndex(indices);
  // const material = new THREE.MeshLambertMaterial({ color: 0xffff00, side: THREE.FrontSide });
  const material = new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.FrontSide });
  const mesh = new THREE.Mesh(boxGeo, material);
  // mesh.position.set(0, 0, 0)
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xadacad);
  // mesh.translateX(-1);
  // mesh.position.set(-0.5, 0, 0)
  scene.add(mesh);
  // 创建坐标轴辅助对象
  const axesHelper = new THREE.AxesHelper(250);
  const axesHelper2 = new THREE.AxesHelper(150);
  scene.add(axesHelper);
  // mesh.add(axesHelper2)

  // 创建一个新的LineSegments对象来表示边框
  const edges = new THREE.EdgesGeometry(boxGeo);
  const lineMaterial = new THREE.LineBasicMaterial({ color: 0x000000 });

  const wireframe = new THREE.LineSegments(edges, lineMaterial);
  // wireframe.position.set(-0.5, -0.5, -0.5);
  // 将线框对象添加到场景中
  scene.add(wireframe);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(rendererWidth, rendererHeight);
  // 设置相机控件轨道控制器OrbitControls
  const controls = new OrbitControls(camera, renderer.domElement);
  // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  controls.addEventListener('change', function () {
    renderer.render(scene, camera); //执行渲染操作
  });
  window.onresize = function () {
    rendererWidth = threeDiv.clientWidth;
    rendererHeight = threeDiv.clientHeight;
    renderer.setSize(rendererWidth, rendererHeight);
    console.log(rendererWidth, rendererHeight);
    camera.aspect = rendererWidth / rendererHeight;
    camera.updateProjectionMatrix();
  }

  addEventListener('click', function (event) {
    //2.创建一个射线投射器`Raycaster
    const raycaster = new THREE.Raycaster()
    //1.坐标转化（屏幕坐标转标准设备坐标）
    const pointer = new THREE.Vector2();
    pointer.x = (event.clientX / rendererWidth) * 2 - 1;
    pointer.y = -(event.clientY / rendererHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObject(mesh, true);
    if (intersects.length > 0) {
      // intersects[0].object.material.color.set(new THREE.Color(0xff0000));
      // renderer.render(scene, camera);
    }
  })
  const stats = new Stats();
  // 将渲染器DOM元素添加到DOM中
  if (threeDiv && renderer.domElement && WebGL.isWebGLAvailable()) {
    threeDiv.appendChild(renderer.domElement);
    threeDiv.appendChild(stats.domElement);
    animate();

  } else if (!WebGL.isWebGLAvailable()) {
    const warning = WebGL.getWebGLErrorMessage();
    threeDiv.appendChild(warning);
    console.error('WebGL is not available.')
  }
  function animate() {
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    // mesh.rotation.z += 0.01;
    // group.rotateX(0.01);

    renderer.render(scene, camera);
    stats.update();
    requestAnimationFrame(animate);
  }

});
</script>

<style scoped>
#three-viewer {
  /* width: calc(500px - 2px);
  height: calc(500px - 2px); */
  width: 100%;
  height: 100%;
  /* border: 1px solid black; */
  /* position: absolute; */
}
</style>