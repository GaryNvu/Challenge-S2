import * as VueRouter from 'vue-router';
import store from '../data/store';

import Dashboard from '../page/Dashboard.vue';
import ShoppingCartPage from '../page/ShoppingCartPage.vue';
import ProductsPage from '../page/ProductsPage.vue';
import ProductDetailPage from '../page/ProductDetailPage.vue';
import PageNotFound from '../page/PageNotFound.vue';
import Home from '../page/Home.vue';
import TermsPage from '../page/Terms.vue';
import ConfidentialityPage from '../page/ConfidentialityPage.vue';
import AuthentificationPage from '../page/AuthentificationPage.vue';

import AdminPage from '../page/crud/Admin.vue';
import UserPanel from '../page/crud/UserPanel.vue';
import UserCreate from '../page/crud/UserCreate.vue';
import ProductPanel from '../page/crud/ProductPanel.vue';
import ProductCreate from '../page/crud/ProductCreate.vue';
import ProductEdit from '../page/crud/ProductEdit.vue';
import BrandPanel from '../page/crud/BrandPanel.vue';
import BrandCreate from '../page/crud/BrandCreate.vue';
import CategoryPanel from '../page/crud/CategoryPanel.vue';
import CategoryCreate from '../page/crud/CategoryCreate.vue';

const routes = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/admin',
        component: AdminPage,
        children: [
            { path: 'users', component: UserPanel },
            { path: 'users/new', component: UserCreate },
            { path: 'products', component: ProductPanel },
            { path: 'products/new', component: ProductCreate },
            { path: 'products/edit/:id', component: ProductEdit, props: true },
            { path: 'brands', component: BrandPanel },
            { path: 'brands/new', component: BrandCreate },
            { path: 'category', component: CategoryPanel },
            { path: 'category/new', component: CategoryCreate },
        ],
        meta: { requiresAuth: true }
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
    },
    {
        path: '/confidentiality',
        component: ConfidentialityPage,
    },
    {
        path: '/authentification',
        component: AuthentificationPage,
    }
];

// Création du routeur
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,
});

/*router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.isAuthenticated) {
        next({ path: '/' });
      } else {
        next();
      }
    } else {
      next();
    }
  });*/

export default router