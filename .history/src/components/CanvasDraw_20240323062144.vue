<template>
  <div>
    <canvas id="canvas"></canvas><br>
    <button id="clear-button">清除</button>
    <button id="save-button">保存</button>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, ref } from 'vue';

onMounted(() => {
  const canvas = document.getElementById('canvas');
  const context = canvas.getContext('2d');

  let isDrawing = false;

  canvas.addEventListener('mousedown', e => {
    isDrawing = true;
    draw(e);
  });

  canvas.addEventListener('mousemove', e => {
    if (!isDrawing) return;
    draw(e);
  });

  canvas.addEventListener('mouseup', () => {
    isDrawing = false;
  });

  canvas.addEventListener('mouseout', () => {
    isDrawing = false;
  });

  function draw(e) {
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    context.lineWidth = 2;
    context.lineCap = 'round';
    context.strokeStyle = 'black';

    context.lineTo(x, y);
    context.stroke();
    context.beginPath();
    context.moveTo(x, y);
  }

  document.getElementById('clear-button').addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  });

  document.getElementById('save-button').addEventListener('click', () => {
    const image = canvas.toDataURL();
    console.log(image);  // 你可以在这里处理图像，例如发送到服务器或保存到本地
  });
})
</script>

<style scoped>
canvas {
  border: 1px solid black;
  width: 1500px;
  height: 500px;
}
</style>