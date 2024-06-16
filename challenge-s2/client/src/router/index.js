import * as VueRouter from 'vue-router';

import Dashboard from '../page/Dashboard.vue';
import ShoppingCartPage from '../page/ShoppingCartPage.vue';
import ProductsPage from '../page/ProductsPage.vue';
import ProductDetailPage from '../page/ProductDetailPage.vue';
import PageNotFound from '../page/PageNotFound.vue';
import Home from '../page/Home.vue';
import Settings from '../page/Settings.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/dashboard',
        component: Dashboard,
    },
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
        path: '/settings',
        component: Settings,
    },
    {
        path: '/:pathMatch(.*)*',
        component: PageNotFound,
    }
];

const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

export default router