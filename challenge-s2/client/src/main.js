import { createApp } from 'vue';
import './style.css';
import './main.css';
import App from './App.vue';

import * as VueRouter from 'vue-router';
import ShoppingCartPage from './page/ShoppingCartPage.vue';
import ProductsPage from './page/ProductsPage.vue';
import ProductDetailPage from './page/ProductDetailPage.vue';
import PageNotFound from './page/PageNotFound.vue';

const routes = [
    {
        path: '/cart',
        component: ShoppingCartPage,
    },
    {
        path: '/products',
        component: ProductsPage,
    },
    {
        path: '/products/:productid',
        component: ProductDetailPage,
    },
    {
        path: '/:pathMatch(.*)*',
        component: PageNotFound,
    }
];

// Création du routeur
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

// Création et montage de l'application Vue
const app = createApp(App);
app.use(router);
app.mount('#app');
