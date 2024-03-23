<template>
  <div>
    <canvas id="canvas"></canvas><br>
    <button id="clear-button" aria-label="清除画布">清除</button>
    <button id="save-button" aria-label="保存画布">保存</button>
  </div>
</template>

<script setup lang="ts">

const canvasRef = ref(null);
const clearButtonRef = ref(null);
const saveButtonRef = ref(null);

onMounted(() => {
  const canvas = canvasRef.value;
  const context = canvas.getContext('2d');
  context.fillStyle = 'gray';
  context.fillRect(0, 0, canvas.width, canvas.height);

  let isDrawing = false;
  let lastX = 0;
  let lastY = 0;

  canvas.addEventListener('mousedown', e => {
    isDrawing = true;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (x < 0 || x > canvas.width || y < 0 || y > canvas.height) return;
    [lastX, lastY] = [e.clientX - rect.left, e.clientY - rect.top];
    context.moveTo(lastX, lastY);
    canvas.addEventListener('mousemove', e => {
      if (!isDrawing) return;
      draw(e);
    });
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

    if (lastX && lastY) {
      context.lineTo(lastX, lastY);
      context.stroke();
    }
    // context.beginPath();
    // context.moveTo(x, y);
    [lastX, lastY] = [x, y];
  }

  clearButtonRef.value.addEventListener('click', () => {
    context.clearRect(0, 0, canvas.width, canvas.height);
  });

  saveButtonRef.value.addEventListener('click', () => {
    const image = canvas.toDataURL();
    console.log(image);
  });
});
</script>

<style scoped>
canvas {
  border: 1px solid black;
  width: 1500px;
  height: 500px;
}
</style>