<template>
  <div>
    <el-button @click="toCube">cube</el-button>
  </div>
</template>

<script setup>
//跳转路由到cube页面
const toCube = () => {
  router.push('/cube')
}
</script>

<style lang="scss" scoped></style>