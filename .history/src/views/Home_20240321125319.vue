<template>
  <div>
    <el-button @click="toCube">cube</el-button>
  </div>
</template>

<script setup>
import { Router } from 'vue-router'
//跳转路由到cube页面
const toCube = () => {
  Router.push('/cube')
}
</script>

<style lang="scss" scoped></style>