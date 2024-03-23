<template>
  <div>
    <el-button @click="toCube">cube</el-button>
    <el-button @click="toHomeView">HomeView</el-button>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
//跳转路由到cube页面
const toCube = () => {
  router.push('/Cube')
}
const toHomeView = () => {
  router.push('/HomeView')
}
</script>

<style lang="scss" scoped></style>