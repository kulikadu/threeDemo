<template>
  <div class="container">
    <div class="demo">
      <ThreeDemo />
    </div>
    <div class="demo2">
      <ThreeDemo2 />
    </div>
  </div>
</template>

<script setup lang="ts">
import ThreeDemo from '../components/ThreeJS_demo/ThreeDemo.vue';
import ThreeDemo2 from '../components/ThreeJS_demo/ThreeDemo2.vue';
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  /* border: 1px solid red; */
  border-radius: 30px;
  /* padding: 30px; */
}

.demo {
  width: 50%;
  height: 100%;
  margin: 20px 10px 20px 20px;
}

.demo2 {
  width: 50%;
  height: 100%;
  margin: 20px 20px 20px 10px;
}
</style>