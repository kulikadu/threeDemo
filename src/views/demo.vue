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
  // const material = new THREE.MeshStandardMaterial({ vertexColors: THREE.VertexColors });
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


  // 初始化选中颜色变量
  let selectedFaceColor = 0xff0000; // 红色作为示例
  let selectedEdgeColor = 0x0000ff; // 绿色作为示例
  function onClick(event: any) {

    // 将鼠标位置归一化为设备坐标。x 和 y 方向的取值范围是 (-1 to +1)

    pointer.x = (event.clientX / window.innerWidth) * 2 - 1;
    pointer.y = - (event.clientY / window.innerHeight) * 2 + 1;
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(pointer, camera);
    // 计算物体和射线的焦点
    let intersectsCube = raycaster.intersectObject(cube, true);
    let intersectsWireframe = raycaster.intersectObject(wireframe, true);



    if (intersectsCube.length > 0) {
      const faceIndex = intersectsCube[0].faceIndex; // 获取到被点击的面索引
      const verticesArray = []
      let vertexPositions = getVertex(faceIndex)
      for (let i = 0; i < vertexPositions.length; i++) {
        verticesArray.push(vertexPositions[i].x);
        verticesArray.push(vertexPositions[i].y);
        verticesArray.push(vertexPositions[i].z);
      }

      if (faceIndex % 2 == 0) {
        vertexPositions = getVertex(faceIndex + 1)
      } else {
        vertexPositions = getVertex(faceIndex - 1)
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
      const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      const planeMesh = new THREE.Mesh(planeGeo, planeMaterial);
      scene.add(planeMesh);
    }

    if (intersectsWireframe.length > 0) {
      // 改变边框被点击线段的颜色（这里由于边框是由多个独立线段组成，实际无法精确区分单一线段）
      lineMaterial.color.set(selectedEdgeColor);
      lineMaterial.needsUpdate = true;
    }
  }
  // 根据索引获取顶点位置
  function getVertex(faceIndex) {
    const vertexIndex = cube.geometry.index.array.slice(faceIndex * 3, faceIndex * 3 + 3);
    // 获取三角形顶点索引
    const a = vertexIndex[0];
    const b = vertexIndex[1];
    const c = vertexIndex[2];
    // 根据索引获取顶点位置
    const vertexA = cube.geometry.attributes.position.array[a * 3];
    const vertexB = cube.geometry.attributes.position.array[b * 3];
    const vertexC = cube.geometry.attributes.position.array[c * 3];
    // 构建或更新顶点对象
    const vertexPositions = [
      new THREE.Vector3(vertexA, cube.geometry.attributes.position.array[a * 3 + 1], cube.geometry.attributes.position.array[a * 3 + 2]),
      new THREE.Vector3(vertexB, cube.geometry.attributes.position.array[b * 3 + 1], cube.geometry.attributes.position.array[b * 3 + 2]),
      new THREE.Vector3(vertexC, cube.geometry.attributes.position.array[c * 3 + 1], cube.geometry.attributes.position.array[c * 3 + 2]),
    ];
    console.log('点击面的三角形坐标：', vertexPositions);
    return vertexPositions;
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