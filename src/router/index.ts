import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: () => import('@/views/Home.vue')
    // },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/cube',
      name: 'cube',
      component: () => import('@/views/Cube.vue')
    },
    {
      path: '/demo',
      name: 'demo',
      component: () => import('../views/demo.vue')
    },
    {
      path: '/HomeView',
      name: 'HomeView',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/icon',
      name: 'icon',
      component: () => import('../views/icon.vue')
    },
    {
      path: '/CanvasDraw',
      name: 'CanvasDraw',
      component: () => import('../views/CanvasDraw.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('../views/404.vue'), // 你的 404 页面组件
    },
  ]
})

export default router
