import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import Inicio from './views/Inicio.vue'
import Login from './views/Login.vue'
import Registrar from './views/Registrar.vue'
import PaginaUsuario from './views/PaginaUsuario.vue'

const routes = [
  { path: '/', component: Inicio },
  { path: '/login', component: Login },
  { path: '/registrar', component: Registrar },
  { path: '/paginaUsuario', component: PaginaUsuario}
]

const router = createRouter({
  history: createWebHashHistory(), // Importante para Electron
  routes
})

createApp(App).use(router).mount('#app')