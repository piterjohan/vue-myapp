import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css"
import router from './router/router'

createApp(App)
.use(router)
.mount('#app')

import "bootstrap/dist/js/bootstrap";