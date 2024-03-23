<template>
  <div>
    <canvas id="canvas" width="1500px" height="500px"></canvas><br>
    <button id="clear-button" aria-label="清除画布">清除</button>
    <button id="save-button" aria-label="保存画布">保存</button>
    <button onclick="fb()">确定</button>
  </div>
</template>

<script setup lang="ts">


onMounted(() => {
  const mcv = document.querySelector("#canvas")
  const ctx = mcv.getContext("2d")
  ctx.fillStyle = '#F6F6F6'
  ctx.fillRect(0, 0, mcv.width, mcv.height)
  ctx.lineWidth = 2
  ctx.lineJoin = 'round'
  mcv.onmousedown = function (ev) {
    ctx.strokeStyle = "#000000"
    ctx.beginPath()
    let sx = ev.clientX - mcv.offsetLeft
    let sy = ev.clientY - mcv.offsetTop
    ctx.moveTo(sx, sy)
    mcv.onmousemove = function (e) {
      let x = e.clientX - mcv.offsetLeft
      let y = e.clientY - mcv.offsetTop
      ctx.lineTo(x, y)
      ctx.stroke()
    }

  }
  mcv.onmouseup = function () {
    mcv.onmousemove = null
  }
  mcv.onmouseleave = function () {
    mcv.onmousemove = null
  }
  function fn() {
    mcv.toBlob(function (bolb) {
      const img = document.createElement("img")
      const dz = URL.createObjectURL(bolb)
      const link = document.createElement("a")
      link.href = dz
      link.download = '签名'
      link.click()
      URL.revokeObjectURL(dz)
    })
  }
});
</script>

<style scoped>
canvas {
  border: 1px solid black;
}
</style>