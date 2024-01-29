import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  const doubleCount = computed(() => count.value * 2)
  function increment() {
    count.value++
  }

  return { count, doubleCount, increment }
})


// import { defineStore } from 'pinia'
// import { Viewer } from 'cesium'

// export interface SysStore {
//   cesiumViewer: Viewer | null
// }

// export const useSysStore = defineStore({
//   id: 'sys',
//   state: (): SysStore => ({
//     cesiumViewer: null
//   }),
//   actions: {
//     setCesiumViewer(viewer: Viewer) {
//       this.cesiumViewer = viewer
//     }
//   }
// })