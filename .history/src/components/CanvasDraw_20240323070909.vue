<template>
  <div>
    <canvas ref="canvasRef" width="1500px" height="500px"></canvas><br>
    <button id="clear-button" @click="clearCanvas" aria-label="清除画布">清除</button>
    <button id="save-button" @click="saveCanvas" aria-label="保存画布">保存</button>
    <button @click="fb">确定</button>
  </div>
</template>

<script setup lang="ts">

const canvasRef = ref(null);
const isDrawing = ref(false);

onMounted(() => {
  const ctx = canvasRef.value.getContext("2d");
  initializeCanvas(ctx);
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
const startDrawing = (ev: MouseEvent) => {
  isDrawing.value = true;
  draw(ev);
}

// 绘画
const draw = (ev: MouseEvent) => {
  if (!isDrawing.value) return;
  const ctx = canvasRef.value.getContext("2d");
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  const sx = ev.clientX - canvasRef.value.offsetLeft;
  const sy = ev.clientY - canvasRef.value.offsetTop;
  if (!isDrawing.value) return;
  ctx.moveTo(sx, sy);
  ctx.lineTo(sx, sy);
  ctx.stroke();
}

// 停止绘画
const stopDrawing = () => {
  isDrawing.value = false;
  canvasRef.value.removeEventListener('mousemove', draw);
}

// 清除画布
const clearCanvas = () => {
  const ctx = canvasRef.value.getContext("2d");
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
}

// 确定按钮功能（示例保留，具体实现根据需求调整）
const fb = () => {
  console.log('确定按钮被点击了。');
}
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>