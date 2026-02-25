import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import './style.css'
import { Buffer } from 'buffer'
import process from 'process'

window.Buffer = Buffer
window.process = process
const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')
