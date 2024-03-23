<template>
  <div>
    <canvas ref="canvasRef" width="1500px" height="500px"></canvas><br>
    <button id="clear-button" aria-label="清除画布">清除</button>
    <button id="save-button" aria-label="保存画布">保存</button>
    <button @click="fb">确定</button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const canvasRef = ref(null);

onMounted(() => {
  const ctx = canvasRef.value.getContext("2d");
  ctx.fillStyle = '#F6F6F6';
  ctx.fillRect(0, 0, canvasRef.value.width, canvasRef.value.height);
  ctx.lineWidth = 2;
  ctx.lineJoin = 'round';


  let handleMouseDown = (ev: MouseEvent) => {
    ctx.strokeStyle = "#000000";
    ctx.beginPath();
    let sx = ev.clientX - canvasRef.value.offsetLeft;
    let sy = ev.clientY - canvasRef.value.offsetTop;
    ctx.moveTo(sx, sy);
  }

  let handleMouseMove = (ev: MouseEvent) => {
    let x = ev.clientX - canvasRef.value.offsetLeft;
    let y = ev.clientY - canvasRef.value.offsetTop;
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function handleMouseUp() {
    canvasRef.value.removeEventListener('mousemove', handleMouseMove);
  }

  function handleMouseLeave() {
    canvasRef.value.removeEventListener('mousemove', handleMouseMove);
  }

  canvasRef.value.addEventListener('mousedown', handleMouseDown);
  canvasRef.value.addEventListener('mousemove', handleMouseMove);
  canvasRef.value.addEventListener('mouseup', handleMouseUp);
  canvasRef.value.addEventListener('mouseleave', handleMouseLeave);
  const fb = () => {
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
});
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>