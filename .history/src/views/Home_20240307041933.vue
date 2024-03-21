<template>
  <!-- <router-link to="/threeDemo">ThreeDemo</router-link>
    <router-link to="/demo">demo</router-link> -->
  <!-- <router-view></router-view> -->
  <!-- <RouterView /> -->
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
  flex-direction: column;
  justify-content: center;
}

.demo {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.demo2 {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
</style>