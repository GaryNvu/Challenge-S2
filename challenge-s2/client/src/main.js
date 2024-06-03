import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import * as VueRouter from 'vue-router';
import ShoppingCartPage from './page/ShoppingCartPage.vue';
import ProductsPage from './page/ProductsPage.vue';
import ProductDetailPage from './page/ProductDetailPage.vue';


createApp(App)
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
            path: '/product/:id',
            component: ProductDetailPage,
        },
        ]
    }))
    .mount('#app')
