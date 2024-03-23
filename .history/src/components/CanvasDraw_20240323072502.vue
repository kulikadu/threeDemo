<template>
  <div>
    <canvas ref="canvasRef" width="1500px" height="500px"></canvas><br>
    <button id="clear-button" @click="clearCanvas" aria-label="清除画布">清除</button>
    <button id="save-button" @click="saveCanvas" aria-label="保存画布">保存</button>
  </div>
</template>

<script setup lang="ts">

const canvasRef = ref(null);
const isDrawing = ref(false);

onMounted(() => {
  const ctx = canvasRef.value.getContext("2d");
  clearCanvas(ctx)
  setupEventListeners(ctx);
});

// 初始化画布
const initializeCanvas = (ctx) => {
  ctx.fillStyle = '#F6F6F6';
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
}

// 设置事件监听器
const setupEventListeners = (ctx) => {
  canvasRef.value.addEventListener('mousedown', startDrawing);
  canvasRef.value.addEventListener('mousemove', draw);
  canvasRef.value.addEventListener('mouseup', stopDrawing);
  canvasRef.value.addEventListener('mouseleave', stopDrawing);
}

// 开始绘画
const startDrawing = (e: MouseEvent) => {

  const ctx = canvasRef.value.getContext("2d");
  isDrawing.value = true;
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  let sx = e.clientX - canvasRef.value.offsetLeft;
  let sy = e.clientY - canvasRef.value.offsetTop;
  ctx.moveTo(sx, sy);
}

// 绘画
const draw = (e: MouseEvent) => {
  const ctx = canvasRef.value.getContext("2d");
  let x = e.clientX - canvasRef.value.offsetLeft;
  let y = e.clientY - canvasRef.value.offsetTop;
  ctx.lineTo(x, y);
  ctx.stroke();
}

// 停止绘画
const stopDrawing = () => {
  isDrawing.value = false;
  canvasRef.value.removeEventListener('mousedown', startDrawing);
  canvasRef.value.removeEventListener('mousemove', draw);
}

// 清除画布
const clearCanvas = (ctx) => {
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  initializeCanvas(ctx);
}

// 保存画布
const saveCanvas = () => {
  const ctx = canvasRef.value.getContext("2d");
  canvasRef.value.toBlob(blob => {
    if (!blob) return;
    const img = document.createElement("img");
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = '签名';
    link.click();
    URL.revokeObjectURL(url);
  }, 'image/png');

  console.log('已保存');
}
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>