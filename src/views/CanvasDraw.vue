<template>
  <div>
    <canvas ref="canvasRef" width="1500px" height="800px"></canvas><br>
    <button id="clear-button" @click="clearCanvas" title="清除画布" aria-label="清除画布">清除</button>
    <button id="save-button" @click="saveCanvas" title="保存画布" aria-label="保存画布">保存</button>
  </div>
</template>

<script setup lang="ts">

const canvasRef = ref<HTMLCanvasElement>();
const isDrawing = ref(false);
let canvas: any;
onMounted(() => {
  canvas = canvasRef.value as HTMLCanvasElement
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  initializeCanvas(ctx);
  setupEventListeners();
});

// 初始化画布
const initializeCanvas = (ctx: CanvasRenderingContext2D) => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = '#F6F6F6';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';
  // 重置画布状态
  isDrawing.value = false;
}

// 设置事件监听器
const setupEventListeners = () => {
  canvas.addEventListener('mousedown', startDrawing);
  canvas.addEventListener('mouseup', stopDrawing);
  canvas.addEventListener('mouseleave', stopDrawing);
}

// 开始绘画
const startDrawing = (e: MouseEvent) => {
  const ctx = canvas.getContext("2d");
  isDrawing.value = true;
  ctx.strokeStyle = "#000000";
  ctx.beginPath();
  let sx = e.clientX - canvas.offsetLeft;
  let sy = e.clientY - canvas.offsetTop;
  ctx.moveTo(sx, sy);
  draw(e); // 开始绘画时直接调用draw
  canvas.addEventListener('mousemove', draw);
}

// 绘画
const draw = (e: MouseEvent) => {
  if (!isDrawing.value) return; // 检查是否正在绘画
  const ctx = canvas.getContext("2d");
  let x = e.clientX - canvas.offsetLeft;
  let y = e.clientY - canvas.offsetTop;
  ctx.lineTo(x, y);
  ctx.stroke();
  // 保证线条不会超出画布范围
  if (x > canvas.width) x = canvas.width;
  if (y > canvas.height) y = canvas.height;
  if (x < 0) x = 0;
  if (y < 0) y = 0;
}

// 停止绘画
const stopDrawing = () => {
  isDrawing.value = false;
  canvas.removeEventListener('mousemove', draw);
}

// 清除画布
const clearCanvas = () => {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvasRef.value?.width, canvas.height);
  initializeCanvas(ctx);
}

// 保存画布
const saveCanvas = () => {
  const ctx = canvas.getContext("2d");
  try {
    canvas.toBlob((blob: any) => {
      if (!blob || !ctx) return;
      const img = document.createElement("img");
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = '签名';
      link.click();
      URL.revokeObjectURL(url);
    }, 'image/png');
    console.log('已保存');
  } catch (error) {
    console.error('保存画布时发生错误:', error);
  }
}
</script>

<style scoped>
canvas {
  border: 1px solid black;
  /* width: 1500px;
  height: 500px; */
}
</style>