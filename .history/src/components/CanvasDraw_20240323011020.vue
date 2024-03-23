<template>
  <div>
    <canvas id="tutorial"></canvas>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, ref } from 'vue';

onMounted(() => {
  draw();
})

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas?.getContext) return;
  if (!canvas.getContext) return;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "rgb(200,0,0)";
  //绘制矩形
  ctx.fillRect(10, 10, 55, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect(30, 30, 55, 50);
}
</script>

<style scoped>
canvas {
  border: 1px solid black;
  width: 100%;
  height: 100%;
}
</style>