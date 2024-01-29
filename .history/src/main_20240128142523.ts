// import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import App from './App.vue'
import App from './views/ThreeDemo.vue'
// import App from './views/demo.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.mount('#app')
// app.mount('#three-viewer')
