import * as VueRouter from 'vue-router';

import Dashboard from '../page/Dashboard.vue';
import ShoppingCartPage from '../page/ShoppingCartPage.vue';
import ProductsPage from '../page/ProductsPage.vue';
import ProductDetailPage from '../page/ProductDetailPage.vue';
import PageNotFound from '../page/PageNotFound.vue';
import Home from '../page/Home.vue';
import TermsPage from '../page/Terms.vue';
import Terms from '../page/Terms.vue';

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
        path: '/:pathMatch(.*)*',
        component: PageNotFound,
    },
    {
        path: '/terms',
        component: TermsPage,
    }
];

// Création du routeur
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

export default router