<template>
    <h1 class="page-title mb-5">Commandes</h1>
    <div class="orders-container">
        <div class="search-bar mb-4 d-flex align-items-center justify-content-between">
            <input class="form-control mr-2" v-model="search.status" placeholder="Statut" style="width: 20%;">
            <input class="form-control mx-2" type="date" v-model="search.date" placeholder="Date" style="width: 25%;">
            <input class="form-control mx-2" type="number" v-model.number="search.total" placeholder="Prix Total" style="width: 20%;">
            <button class="btn btn-primary" @click="fetchOrders">Rechercher</button>
        </div>
        <div v-if="orders.length" class="d-flex flex-column align-items-center">
            <div v-for="order in orders" :key="order.id" class="w-100 mb-3 order-card">
                <div class="d-flex flex-row justify-content-between">
                    <h5>Commande #{{ order.id }}</h5>
                    <p><strong>Date :</strong> {{ new Date(order.createdAt).toLocaleDateString() }}</p>
                    <p v-if="order.status == 'attente'" class="light">Statut : {{ order.status }}</p>
                    <p v-else-if="order.status == 'envoyee'" class="warning">Statut : {{ order.status }}</p>
                    <p v-else-if="order.status == 'delivree'" class="success">Statut : {{ order.status }}</p>
                </div>
                <p><strong>Total:</strong> {{ order.total.toFixed(2) }} €</p>
                <router-link :to="`/orders/${order.id}`" class="btn btn-primary">Voir détails</router-link>
                
            </div>
            <button @click="changePage(currentPage - 1)" :disabled="currentPage <= 1">Précédent</button>
            <span>Page {{ currentPage }} de {{ totalPages }}</span>
            <button @click="changePage(currentPage + 1)" :disabled="currentPage >= totalPages">Suivant</button>
        </div>
        <div v-else>
            <p>Aucune commande trouvée.</p>
        </div>
    </div>
</template>

<script>
import api from "../../api.js";
import { mapGetters } from 'vuex';
import store from '../data/store.js';

export default {
    data() {
        return {
            orders: [],
            currentPage: 1,
            totalPages: 0,
            search: {
                status: '',
                date: '',
                total: null
            }
        };
    },
    mounted() {
        this.fetchOrders();
    },
    methods: {
        async fetchOrders() {
            const params = {
                page: this.currentPage,
                limit: 5,
                status: this.search.status,
                date: this.search.date,
                total: this.search.total
            };
            try {
                let userId = store.getters.getUser.id;
                const res = await api.getOrderByUser(userId, { params });
                this.orders = res.data.data;
                this.totalPages = res.data.totalPages;
                this.currentPage = res.data.currentPage;
            } catch (error) {
                console.error('Error while fetching orders', error);
            }
        },
        changePage(page) {
            this.currentPage = page;
            this.fetchOrders();
        },
    }
};
</script>

<style scoped>
.orders-container {
    width: 70%;
    margin: auto;
}
.order-card {
    padding: 2rem;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 0.45rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.search-bar {
    width: 100%;
    padding: 0 15px;
}

.light {
    background-color: lightgray;
    color: white;
    padding: 0.5rem;
    border-radius: 0.4rem;
}

.warning {
    background-color: #f0ad4e;
    color: white;
    padding: 0.5rem;
    border-radius: 0.4rem;
}

.light {
    background-color: #5cb85c;
    color: white;
    padding: 0.5rem;
    border-radius: 0.4rem;
}

.pagination-buttons {
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>