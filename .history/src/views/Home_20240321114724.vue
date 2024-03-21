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
import { RouterLink, RouterView } from 'vue-router'
import ThreeDemo from './ThreeDemo.vue';
import ThreeDemo2 from './ThreeDemo2.vue';
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  /* flex: 1 1 auto; */
  /* flex-direction: column; */
  justify-content: center;
  /* align-items: center; */
  /* border: 1px solid red; */
  border-radius: 30px;
  /* padding: 30px; */
}

.demo {
  /* width: 100%;
  height: 100%; */
  width: 500px;
  height: 500px;
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
}

.demo2 {
  /* width: 100%;
  height: 100%; */
  width: 500px;
  height: 500px;
  /* display: flex; */
  /* flex-direction: column; */
  /* justify-content: center; */
}
</style>