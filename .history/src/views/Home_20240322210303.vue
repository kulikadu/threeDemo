<template>
  <div>
    <el-button @click="toCube">cube</el-button>
    <el-button @click="toHomeView">HomeView</el-button>
    <el-button @click="toIcon">Icon</el-button>

  </div>
  <div>
    <el-icon>
      <Close />
    </el-icon>

    <el-icon>
      <Grid />
    </el-icon>

    <el-icon class="is-loading">
      <Loading />
    </el-icon>

    <el-icon color="#409EFC" class="no-inherit">
      <Share />
    </el-icon>
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
const toIcon = () => {
  router.push('/icon')
}
</script>

<style lang="scss" scoped></style>