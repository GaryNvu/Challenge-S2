import * as VueRouter from 'vue-router';
import store from '../data/store';

import Dashboard from '../page/Dashboard.vue';
import CartPage from '../page/CartPage.vue';
import ProductsPage from '../page/ProductsPage.vue';
import ProductDetailPage from '../page/ProductDetailPage.vue';
import PageNotFound from '../page/PageNotFound.vue';
import Home from '../page/Home.vue';
import AuthentificationPage from '../page/AuthentificationPage.vue';
import VerifyEmail from '../page/VerifyEmail.vue';
import Orders from '../page/Orders.vue';
import OrderDetailPage from '../page/OrderDetailPage.vue';

import TermsPage from '../page/rgpd/TermsPage.vue';
import LegalMentionPage from '../page/rgpd/LegalMentionPage.vue';
import ConfidentialityPage from '../page/rgpd/ConfidentialityPage.vue';
import ShippingPage from '../page/rgpd/ShippingPage.vue';
import PaymentPage from '../page/rgpd/PaymentPage.vue';

import AdminPage from '../page/crud/Admin.vue';
import UserPanel from '../page/crud/UserPanel.vue';
import UserCreate from '../page/crud/UserCreate.vue';
import UserEdit from '../page/crud/UserEdit.vue';
import ProductPanel from '../page/crud/ProductPanel.vue';
import ProductCreate from '../page/crud/ProductCreate.vue';
import ProductEdit from '../page/crud/ProductEdit.vue';
import BrandPanel from '../page/crud/BrandPanel.vue';
import BrandCreate from '../page/crud/BrandCreate.vue';
import BrandEdit from '../page/crud/BrandEdit.vue';
import CategoryPanel from '../page/crud/CategoryPanel.vue';
import CategoryCreate from '../page/crud/CategoryCreate.vue';
import CategoryEdit from '../page/crud/CategoryEdit.vue';
import OrderPanel from '../page/crud/OrderPanel.vue';
import OrderEdit from '../page/crud/OrderEdit.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/admin',
        component: AdminPage,
        meta: { requiresAuth: true, roles: ['ROLE_ADMIN']},
        children: [
            { path: 'users', component: UserPanel },
            { path: 'users/new', component: UserCreate },
            { path: 'users/edit/:id', component: UserEdit, props: true },
            { path: 'products', component: ProductPanel },
            { path: 'products/new', component: ProductCreate },
            { path: 'products/edit/:id', component: ProductEdit, props: true },
            { path: 'brands', component: BrandPanel },
            { path: 'brands/new', component: BrandCreate },
            { path: 'brands/edit/:id', component: BrandEdit, props: true },
            { path: 'category', component: CategoryPanel },
            { path: 'category/new', component: CategoryCreate },
            { path: 'category/edit/:id', component: CategoryEdit, props: true },
            { path: 'orders', component: OrderPanel },
            { path: 'orders/edit/:id', component: OrderEdit, props: true },
        ],
    },
    {
        path: '/dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, roles: ['ROLE_ADMIN', 'ROLE_STORE_KEEPER']},
    },
    {
        path: '/cart/:userId',
        component: CartPage,
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
        path: '/legal-mentions',
        component: LegalMentionPage,
    },
    {
        path: '/terms',
        component: TermsPage,
    },
    {
        path: '/confidentiality',
        component: ConfidentialityPage,
    },
    {
        path: '/shipping',
        component: ShippingPage,
    },
    {
        path: '/payment',
        component: PaymentPage,
    },
    {
        path: '/authentification',
        component: AuthentificationPage,
    },
    { 
        path: '/verify-email', 
        component: VerifyEmail, 
    },

    {
        path: '/orders',
        component: Orders,
    },
    {
        path: '/orders/:order_id',
        component: OrderDetailPage,
    }
];

// Création du routeur
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

router.beforeEach((to, from, next) => {
    const { requiresAuth, roles } = to.meta;
    const isAuthenticated = store.getters.isAuthenticated;
    const userRole = store.getters.userRole;

    if (requiresAuth && !isAuthenticated) {
        return next('/authentification');
    }

    if (isAuthenticated && roles && !roles.includes(userRole)) {
        return next('/');
    }

    next();
});

export default router