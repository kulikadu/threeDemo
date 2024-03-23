<template>
  <div>
    <canvas id="tutorial"></canvas>
  </div>
</template>

<script setup lang="ts">
// import { onMounted, ref } from 'vue';

onMounted(() => {
  init();
})
function init() {

  // 获取对象
  const cvs = document.getElementById("bg");
  // 设置canvas画布宽高
  const width = window.innerWidth;
  const height = window.innerHeight;
  cvs.width = width;
  cvs.height = height;
  // 返回一个用于在画布上绘图的环境
  const ctx = cvs.getContext("2d");
  // 定义每列的宽度
  const columnWidth = 20;
  // 生成的列数
  const columnCount = Math.floor(window.innerWidth / columnWidth)
  // 创建数组
  const columnNextIndexes = new Array(columnCount);
  // 全部用1填充
  columnNextIndexes.fill(1);
  draw(ctx, width, height, columnCount, columnWidth, columnNextIndexes);
  setInterval(draw, 40)
}

// 绘画
function draw(ctx: { fillStyle: string; fillRect: (arg0: number, arg1: number, arg2: any, arg3: any) => void; font: string; fillText: (arg0: string, arg1: number, arg2: number) => void; }, width: number, height: number, columnCount: number, columnWidth: number, columnNextIndexes: any[]) {
  // 背景颜色
  ctx.fillStyle = 'rgba(240,240,240,0.2)';
  // fillRect(x1, y1, width, width) 画图形
  ctx.fillRect(0, 0, width, height);
  // 设置颜色
  ctx.fillStyle = getRandomColor();
  const fz = 20;
  // 字体样式
  ctx.font = `${fz}px Calibri`;
  for (let i = 0; i < columnCount; i++) {
    // x坐标
    const x = i * columnWidth;
    // y坐标
    const y = fz * columnNextIndexes[i];
    // 填充内容
    ctx.fillText(getRandomChar(), x, y);
    // 判断是否超出可视范围
    if (y > height && Math.random() > 0.99) {
      columnNextIndexes[i] = 0;

    } else {
      columnNextIndexes[i]++
    }
  }
}
// 随机颜色
function getRandomColor() {
  const fontColor = [
    "#33b5e5",
    "#0099cc",
    "#aa66cc",
    "#9933cc",
    "#669900",
    "#ffbb33",
    "#ff8800",
    "#ff4444",
    "#cc0000"
  ]
  return fontColor[Math.floor(Math.random() * fontColor.length)]
}
// 随机字符
function getRandomChar() {
  const str = "console.log('hello world')";
  return str[Math.floor(Math.random() * str.length)]
}
</script>

<style scoped>
canvas {
  border: 1px solid black;
  width: 500px;
  height: 500px;
}
</style>