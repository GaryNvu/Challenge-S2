import { createApp } from 'vue';
import './style.css';
import './main.css';
import App from './App.vue';
import router from './router'

import "bootstrap/dist/css/bootstrap.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";

// Création et montage de l'application Vue
const app = createApp(App);
app.use(router);
app.mount('#app');
