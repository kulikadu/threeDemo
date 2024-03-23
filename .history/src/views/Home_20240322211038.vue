<template>
  <div>
    <el-button @click="navigateTo('/cube')">cube</el-button>
    <el-button @click="navigateTo('/HomeView')">HomeView</el-button>
    <el-button @click="navigateTo('/icon')">Icon</el-button>
  </div>
  <div>
    <el-icon>
      <Close />
    </el-icon>
    <el-icon>
      <Grid />
    </el-icon>
    <el-icon v-if="isLoading" class="is-loading">
      <Loading />
    </el-icon>
    <el-icon v-else color="#409EFC" class="no-inherit">
      <Share />
    </el-icon>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()

// 声明一个通用的跳转函数，通过传入路径参数来实现页面跳转
const navigateTo = (path) => {
  try {
    router.push(path)
  } catch (error) {
    console.error('导航失败:', error)
    // 可以在这里加入更多的错误处理逻辑，比如用户提示等
  }
}

// 假设有一个用于控制加载状态的变量
const isLoading = false
</script>

<style lang="scss" scoped></style>