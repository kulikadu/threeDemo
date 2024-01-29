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
  // scene.add(wireframe);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(rendererWidth, rendererHeight);
  // 设置相机控件轨道控制器OrbitControls
  // const controls = new OrbitControls(camera, renderer.domElement);
  // // 如果OrbitControls改变了相机参数，重新调用渲染器渲染三维场景
  // controls.addEventListener('change', function () {
  //   renderer.render(scene, camera); //执行渲染操作
  // });

  const lineArray = [
    [[0, 0, 0], [1, 0, 0]],
    [[1, 0, 0], [1, 1, 0]],
    [[1, 1, 0], [0, 1, 0]],
    [[0, 1, 0], [0, 0, 0]],

    [[0, 0, 1], [1, 0, 1]],
    [[1, 0, 1], [1, 1, 1]],
    [[1, 1, 1], [0, 1, 1]],
    [[0, 1, 1], [0, 0, 1]],

    [[1, 0, 1], [1, 0, 0]],
    [[1, 1, 1], [1, 1, 0]],
    [[0, 0, 0], [0, 0, 1]],
    [[0, 1, 0], [0, 1, 1]]
  ];
  const lineS = []
  for (let i = 0; i < lineArray.length; i++) {
    const points = [];
    points.push(new THREE.Vector3(lineArray[i][0][0], lineArray[i][0][1], lineArray[i][0][2]));
    points.push(new THREE.Vector3(lineArray[i][1][0], lineArray[i][1][1], lineArray[i][1][2]));
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const line = new THREE.LineSegments(geo, new THREE.LineBasicMaterial({
      color: 0x000000
    }));
    lineS.push(line)
    scene.add(line);
  }

  addEventListener('click', function (event) {
    //2.创建一个射线投射器`Raycaster
    const raycaster = new THREE.Raycaster()
    //1.坐标转化（屏幕坐标转标准设备坐标）
    const pointer = new THREE.Vector2();
    pointer.x = (event.clientX / rendererWidth) * 2 - 1;
    pointer.y = -(event.clientY / rendererHeight) * 2 + 1;
    raycaster.setFromCamera(pointer, camera);
    const intersectMesh = raycaster.intersectObject(mesh, true);
    // const intersectsWireframe = raycaster.intersectObject(wireframe, true);
    const intersectsLine = raycaster.intersectObjects(lineS);

    if (intersectMesh.length > 0) {
      const faceIndex = intersectMesh[0].faceIndex; // 获取到被点击的面索引
      const verticesArray = []
      let vertexPositions = getVertex3(faceIndex, mesh)
      for (let i = 0; i < vertexPositions.length; i++) {
        verticesArray.push(vertexPositions[i].x);
        verticesArray.push(vertexPositions[i].y);
        verticesArray.push(vertexPositions[i].z);
      }

      if (faceIndex % 2 == 0) {
        vertexPositions = getVertex3(faceIndex + 1, mesh)
      } else {
        vertexPositions = getVertex3(faceIndex - 1, mesh)
      }

      for (let i = 0; i < vertexPositions.length; i++) {
        verticesArray.push(vertexPositions[i].x);
        verticesArray.push(vertexPositions[i].y);
        verticesArray.push(vertexPositions[i].z);
      }
      const planeGeo = new THREE.BufferGeometry();
      const planeVertices = new Float32Array(verticesArray);

      // itemSize = 3 因为每个顶点都是一个三元组。
      planeGeo.setAttribute('position', new THREE.BufferAttribute(planeVertices, 3));
      const planeMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
      scene.add(planeMesh);
    }
    if (intersectsLine.length > 0) {
      intersectsLine[0].object.material.color.set('bule')
    }
  })


  // 根据索引获取顶点位置
  function getVertex3(faceIndex, mesh) {
    const vertexIndex = mesh.geometry.index.array.slice(faceIndex * 3, faceIndex * 3 + 3);
    // 获取三角形顶点索引
    const a = vertexIndex[0];
    const b = vertexIndex[1];
    const c = vertexIndex[2];
    // 根据索引获取顶点位置
    const vertexA = mesh.geometry.attributes.position.array[a * 3];
    const vertexB = mesh.geometry.attributes.position.array[b * 3];
    const vertexC = mesh.geometry.attributes.position.array[c * 3];
    // 构建或更新顶点对象
    const vertexPositions = [
      new THREE.Vector3(vertexA, mesh.geometry.attributes.position.array[a * 3 + 1], mesh.geometry.attributes.position.array[a * 3 + 2]),
      new THREE.Vector3(vertexB, mesh.geometry.attributes.position.array[b * 3 + 1], mesh.geometry.attributes.position.array[b * 3 + 2]),
      new THREE.Vector3(vertexC, mesh.geometry.attributes.position.array[c * 3 + 1], mesh.geometry.attributes.position.array[c * 3 + 2]),
    ];
    console.log('点击面的三角形坐标：', vertexPositions);
    return vertexPositions;
  }



  var mouse = { x: 0, y: 0 };
  document.addEventListener('mousemove', function (event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
  });

  // 每一帧更新相机位置
  renderer.render(scene, camera);







  // 页面大小改变时，更新渲染器的尺寸
  window.onresize = function () {
    rendererWidth = threeDiv.clientWidth;
    rendererHeight = threeDiv.clientHeight;
    renderer.setSize(rendererWidth, rendererHeight);
    console.log(rendererWidth, rendererHeight);
    camera.aspect = rendererWidth / rendererHeight;
    camera.updateProjectionMatrix();
  }
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
    requestAnimationFrame(animate);
    stats.update();
    // 根据鼠标移动调整相机位置（这里仅X轴平移）
    var distance = 1; // 控制平移的速度和范围
    if (mouse.x !== 0 || mouse.y !== 0) {
      camera.position.x += mouse.x * distance;
      camera.position.y += mouse.y * distance;
    }

    // 确保相机看向立方体中心
    camera.lookAt(mesh.position);
    renderer.render(scene, camera);
  }

});
</script>

<style scoped>
#three-viewer {
  width: 100%;
  height: 100%;
}
</style>