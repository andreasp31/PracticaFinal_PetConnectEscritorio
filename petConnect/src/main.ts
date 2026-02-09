import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

const app = createApp(App)

app.mount('#app')

window.ipcRenderer.on('main-process-message', (_event, message) => {
  console.log(message)
})