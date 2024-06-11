import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import * as VueRouter from 'vue-router';
import './main.css';
import ShoppingCartPage from './page/ShoppingCartPage.vue';
import ProductsPage from './page/ProductsPage.vue';
import ProductDetailPage from './page/ProductDetailPage.vue';
import PageNotFound from './page/PageNotFound.vue';
import "bootstrap/dist/css/bootstrap.css";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.js";
import '@fortawesome/fontawesome-free/js/all'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

createApp(App)
    .use(bootstrap)
    .use(ElementPlus)
    .use(VueRouter.createRouter({
        history: VueRouter.createWebHistory(),
        routes: [{
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
        ]
    }))
    .mount('#app')
