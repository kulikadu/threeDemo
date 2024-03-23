// import './assets/main.css'
import './assets/demo.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

// import ElementPlus from 'element-plus'
// import 'element-plus/dist/index.css'
import App from './views/Home.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)
// app.use(ElementPlus)
app.mount('#app')
// app.mount('#three-viewer')
