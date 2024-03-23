<template>
  <div>
    <!-- <el-button @click="navigateTo('/cube')">cube</el-button>
    <el-button @click="navigateTo('/HomeView')">HomeView</el-button>
    <el-button @click="navigateTo('/icon')">Icon</el-button> -->
  </div>
  <div class="common-layout">
    <el-container class="layout-container-demo">
      <el-aside width="200px">
        <el-scrollbar>
          <el-menu :default-openeds="['1', '3', '3-4-1']">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <i-ep-message />
                </el-icon>ThreeJsDemos
              </template>
              <el-menu-item index="1-4-1">Cube</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon><i-ep-menu /></el-icon>CesiumDemos
              </template>
              <el-menu-item index="1-4-1">Cesium</el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <i-ep-setting />
                </el-icon>CanvasDemo
              </template>
              <el-menu-item index="1-4-1">CanvasDraw</el-menu-item>
            </el-sub-menu>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main>
        <el-scrollbar>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140" />
            <el-table-column prop="name" label="Name" width="120" />
            <el-table-column prop="address" label="Address" />
          </el-table>
        </el-scrollbar>
      </el-main>
    </el-container>
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


const item = {
  date: '2016-05-02',
  name: 'Tom',
  address: 'No. 189, Grove St, Los Angeles',
}
const tableData = ref(Array.from({ length: 20 }).fill(item))
</script>

<style lang="less">
.layout-container-demo {
  width: 100%;
  height: 100%;

  .el-aside {
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
  }

  .el-main {
    padding-left: 0;
  }
}
</style>