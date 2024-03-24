<template>
  <div class="common-layout">
    <el-container class="layout-container-demo">
      <el-aside width="200px" height="1000px">
        <el-scrollbar>
          <el-menu :default-openeds="['1']">
            <div v-for="subMenu in submenuList" :key="subMenu.id">
              <el-sub-menu>
                <template #title>
                  <el-icon>
                    <i-ep-message />
                  </el-icon>
                  {{ subMenu.title }}
                </template>
                <el-menu-item v-for="subItem in subMenu.item" :key="subItem.id" :index="subItem.id" @click="navigateTo(subItem.path)">
                  {{ subItem.name }}
                </el-menu-item>
              </el-sub-menu>
            </div>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
const submenuList = [
  {
    icon: 'i-ep-message ',
    title: 'ThreeJsDemos',
    item: [
      {
        name: 'Cube',
        path: '/cube'
      }
    ]
  },
  {
    icon: 'i-ep-menu',
    title: 'CesiumDemos',
    item: [
      {
        name: 'Cesium',
        path: '/CesiumDemos'
      }
    ]
  },
  {
    icon: 'i-ep-setting ',
    title: 'Icons',
    item: [
      {
        name: 'Icons',
        path: '/icon'
      }
    ]
  },
  {
    icon: 'i-ep-setting ',
    title: 'CanvasDemo',
    item: [
      {
        name: 'CanvasDraw',
        path: '/CanvasDraw'
      }
    ]
  }
]
// 声明一个通用的跳转函数，通过传入路径参数来实现页面跳转
const navigateTo = (path) => {
  try {
    router.push(path)
  } catch (error) {
    console.error('导航失败:', error)
  }
}


</script>

<style lang="less" scope>
.common-layout {
  width: 100%;
  height: 100%;
}

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