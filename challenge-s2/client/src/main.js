import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import router from './router';
import store from './data/store';

import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import '@fortawesome/fontawesome-free/js/all'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// Création et montage de l'application Vue
const app = createApp(App);
app.use(router);
app.use(store);
app.use(ElementPlus);
app.mount('#app');

