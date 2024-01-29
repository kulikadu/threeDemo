<template>
  <div>
    <!-- <router-link to="/threeDemo">ThreeDemo</router-link>
    <router-link to="/demo">demo</router-link> -->
    <!-- <router-view></router-view> -->
    <RouterView />
  </div>
</template>
<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<style>
/* body,
html {
  margin: 0;
  padding: 0;
} */

div {
  width: 100%;
  height: 100%;

}
</style>