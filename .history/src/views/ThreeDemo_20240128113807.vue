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
  const rendererWidth = threeDiv.clientWidth;
  const rendererHeight = threeDiv.clientHeight;
  const camera = new THREE.PerspectiveCamera(70, rendererWidth / rendererHeight, 0.1, 1000);
  camera.position.z = 5;
  camera.lookAt(0, 0, 0)
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  // const material = new THREE.MeshNormalMaterial();
  // const mesh = new THREE.Mesh(geometry, material);

  // 使用BufferGeometry创建一个立方体几何体
  const boxGeo = new THREE.BufferGeometry();
  // const vertices = [
  //   -1, -1, -1,
  //   1, -1, -1,
  //   1, 1, -1,
  //   -1, 1, -1,
  //   -1, -1, 1,
  //   1, -1, 1,
  //   1, 1, 1,
  //   -1, 1, 1
  // ];
  // const indices = [
  //   0, 1, 2,
  //   0, 2, 3,
  //   4, 5, 6,
  //   4, 6, 7,
  //   0, 4, 1,
  //   1, 4, 5,
  //   2, 3, 6,
  //   2, 6, 7,
  //   0, 3, 4,
  //   3, 7, 4
  // ];
  const vertices = [
    0, 1, 0,//0
    1, 1, 0,//1
    1, 0, 0,//2
    0, 0, 0,//3

    0, 1, 1,
    1, 1, 1,
    1, 0, 1,
    0, 0, 1,
  ];
  const indices = [
    0, 1, 2,
    2, 3, 1,
    4, 5, 6,
    6, 7, 4,
    0, 1, 5,
    5, 4, 0,
    2, 6, 7,
    7, 3, 2,
    1, 2, 5,
    5, 6, 1,
    3, 1, 4,
    4, 7, 3
  ];

  boxGeo.index = new THREE.BufferAttribute(new Float32Array(boxGeo.faces.length * 3), 1);
  for (let i = 0; i < geometry.faces.length; i++) {
    const face = geometry.faces[i];
    geometry.index.array[i * 3] = face.a;
    geometry.index.array[i * 3 + 1] = face.b;
    geometry.index.array[i * 3 + 2] = face.c;
  }

  boxGeo.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  boxGeo.setIndex(indices);
  const material = new THREE.MeshLambertMaterial({ color: 0xffff00, side: THREE.FrontSide });
  const mesh = new THREE.Mesh(boxGeo, material);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0xadacad);
  scene.add(mesh);
  const axesHelper = new THREE.AxesHelper(250);
  scene.add(axesHelper);
  //点光源
  var point = new THREE.PointLight(0xfffffff);
  point.position.set(10, 10, 10); //点光源位置
  scene.add(point); //点光源添加到场景中
  //环境光
  // var ambient = new THREE.AmbientLight(0x444444);
  // scene.add(ambient);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(rendererWidth, rendererHeight);

  const stats = new Stats();
  // 将渲染器DOM元素添加到DOM中
  if (threeDiv && renderer.domElement && WebGL.isWebGLAvailable()) {
    threeDiv.appendChild(renderer.domElement);
    threeDiv.appendChild(stats.domElement);
    animate();

    // 设置相机控件轨道控制器OrbitControls
    const controls = new OrbitControls(camera, renderer.domElement);
    // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
    controls.addEventListener('change', function () {
      renderer.render(scene, camera); //执行渲染操作
    });//监听鼠标、键盘事件
    // window.addEventListener('resize', function () {
    //   renderer.setSize(rendererWidth, rendererHeight);
    //   camera.aspect = rendererWidth / rendererHeight;
    //   camera.updateProjectionMatrix();
    // });
  } else if (!WebGL.isWebGLAvailable()) {
    const warning = WebGL.getWebGLErrorMessage();
    threeDiv.appendChild(warning);
    console.error('WebGL is not available.')
  }
  function animate() {
    // mesh.rotation.x = 100 / 20000;
    // mesh.rotation.y = 100 / 20000;
    // mesh.rotation.x += 0.01;
    // mesh.rotation.y += 0.01;
    // mesh.rotation.z += 0.01;

    renderer.render(scene, camera);
    stats.update();
    // requestAnimationFrame(animate);
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