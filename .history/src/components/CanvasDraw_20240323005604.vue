<template>
  <div>
    <canvas id="tutorial" width="300" height="300"></canvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

onMounted(() => {
  draw();
})

function draw() {
  var canvas = document.getElementById('tutorial');
  if (!canvas.getContext) return;
  if (!canvas.getContext) return;
  ctx.fillStyle = "rgb(200,0,0)";
  //绘制矩形
  ctx.fillRect(300, 300, 55, 50);

  ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
  ctx.fillRect(500, 500, 55, 50);
}
</script>

<style scoped>
canvas {
  border: 1px solid black;
  width: 100%;
  height: 100%;
}
</style>