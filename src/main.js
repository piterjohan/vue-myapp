import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import router from './router/router';

// Vuetify
// import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import { VSkeletonLoader } from 'vuetify/labs/VSkeletonLoader'

const vuetify = createVuetify({
    components: {
        VSkeletonLoader,
    },
});

createApp(App)
.use(router)
.use(vuetify)
.mount('#app');

import "bootstrap/dist/js/bootstrap";