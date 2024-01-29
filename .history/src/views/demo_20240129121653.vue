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

    let colors = [];
    for (let i = 0; i < geometry.attributes.position.count; i++) {
      colors.push(1, 1, 1);
    }

    // 将颜色添加到几何体作为自定义属性
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

    if (intersectsCube.length > 0) {
      const currentNormals = intersectsCube[0].normal
      const normals = geometry.attributes.normal.array;

      for (let i = 0; i < normals.length / 3; i++) {
        // 获取每个顶点的法线向量
        const nx = normals[i * 3];
        const ny = normals[i * 3 + 1];
        const nz = normals[i * 3 + 2];

        // 根据法线方向计算颜色值（这里仅作示例，你可以根据实际需求设计颜色映射函数）
        const r = Math.abs(nx) * 0.5 + 0.5;
        const g = Math.abs(ny) * 0.5 + 0.5;
        const b = Math.abs(nz) * 0.5 + 0.5;

        // 更新颜色数组
        colors[i * 3] = r;
        colors[i * 3 + 1] = g;
        colors[i * 3 + 2] = b;
      }
      // 告诉Three.js颜色缓冲区已更改
      geometry.attributes.color.needsUpdate = true;
      setColorsByNormals();
    }

    if (intersectsWireframe.length > 0) {
      // 改变边框被点击线段的颜色（这里由于边框是由多个独立线段组成，实际无法精确区分单一线段）
      // 对于简单场景，可以整体改变边框颜色：
      lineMaterial.color.set(selectedEdgeColor);
      lineMaterial.needsUpdate = true;
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