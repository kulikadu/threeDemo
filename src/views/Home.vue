<template>
  <div class="common-layout">
    <el-container class="layout-container-demo">
      <el-aside>
        <el-scrollbar>
          <el-menu :default-openeds="['1']">
            <div v-for="subMenu in submenuList" :key="3">
              <el-sub-menu index="1">
                <template #title>
                  <el-icon>
                    <component :is="subMenu.iconComponent" />
                  </el-icon>
                  {{ subMenu.title }}
                </template>
                <el-menu-item v-for="subItem in subMenu.item" @click="navigateTo(subItem.path)">{{ subItem.name
                  }}</el-menu-item>
              </el-sub-menu>
            </div>
          </el-menu>
        </el-scrollbar>
      </el-aside>

      <el-main class="bg-yellow-50">
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import IconThreeJs from '@/components/icons/title/IconThreeJs.vue'
import IconCesiumJs from '@/components/icons/title/IconCesiumJs.vue'
import IconCanvas from '@/components/icons/title/IconCanvas.vue'
const router = useRouter()
const submenuList = ref([
  {
    iconComponent: IconThreeJs,
    title: 'ThreeJsDemos',
    item: [
      {
        name: 'Cube',
        path: '/cube'
      }
    ]
  },
  {
    iconComponent: IconCesiumJs,
    title: 'CesiumDemos',
    item: [
      {
        name: 'Cesium',
        path: '/CesiumDemos'
      }
    ]
  },
  {
    iconComponent: IconThreeJs,
    title: 'Icons',
    item: [
      {
        name: 'Icons',
        path: '/icon'
      }
    ]
  },
  {
    iconComponent: IconCanvas,
    title: 'CanvasDemo',
    item: [
      {
        name: 'CanvasDraw',
        path: '/CanvasDraw'
      }
    ]
  }
])
// 声明一个通用的跳转函数，通过传入路径参数来实现页面跳转
const navigateTo = (path: string) => {
  try {
    router.push(path)
  } catch (error) {
    console.error('导航失败:', error)
  }
}
</script>

<style lang="less">
.common-layout {
  width: 100%;
  height: 100%;
}

.layout-container-demo {
  width: 100%;
  height: 100%;

  .el-aside {
    width: 200px;
    color: var(--el-text-color-primary);
    background: var(--el-color-primary-light-8);
  }

  .el-main {
    padding-left: 0;
  }
}
</style>
