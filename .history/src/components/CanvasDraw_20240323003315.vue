<template>
  <div>
    <canvas id="myCanvas" ref="canvas"></canvas>
  </div>
</template>

<script setup lang="ts">
let canvas = ref<HTMLCanvasElement>() || null;


// 绘制所有标记
function renderTags(ctx: any, tags: { x: number, y: number }[]) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // 绘制每个标记
  for (let i = 0; i < tags.length; i++) {
    const tag = tags[i];
    ctx.beginPath();
    ctx.fillStyle = 'red';
    ctx.arc(tag.x, tag.y, 5, 0, Math.PI * 2);
    ctx.fill();
  }
}

onMounted(() => {
  // canvasss = document.getElementById('myCanvas');
  const ctx = canvas.getContext('2d');

  // 初始化标记数组
  let tags: { x: number, y: number }[] = [];

  // 鼠标按下事件
  canvas.addEventListener('mousedown', (e: any) => {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // 记录鼠标按下位置
    tags.push({ x, y });

    // 渲染标记
    renderTags(ctx, tags);
    // 添加窗口重绘监听，以便在窗口大小改变时重新绘制标记
    // window.addEventListener('resize', renderTags(ctx: any, tags: { x: number, y: number }[]));
  });
}),
</script>

<style scoped>
canvas {
  border: 1px solid black;
  width: 100%;
  height: 100%;
}
</style>