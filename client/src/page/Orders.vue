<template>
    <h1 class="page-title mb-5">Commandes</h1>
    <div class="orders-container">
        <div v-if="orders && orders.length" class="d-flex flex-column align-items-center">
            <div v-for="order in orders" :key="order.id" class="w-100 mb-3">
                <div :class="['order-card', statusClass(order.status)]">
                    <div class="">
                    <div class="d-flex flex-row justify-content-between">
                        <h5 class="">Commande #{{ order.id }}</h5>
                        <p class=""><strong>Date :</strong> {{ new Date(order.createdAt).toLocaleDateString() }}</p>
                        <p class=""><strong>Statut :</strong> {{ order.status }}</p>
                    </div>
                        <p class="total fs-5"><strong>Total:</strong> {{ order.total.toFixed(2) }} €</p>
                        <router-link :to="`/orders/${order.id}`" class="btn btn-primary">Voir détails</router-link>
                    </div>
                </div>
            </div>
        </div>
        <div v-else>
            <p>Aucune commande trouvée.</p>
        </div>
    </div>
</template>

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
    width: 100%; /* Assurez-vous que les cartes prennent toute la largeur */
}
</style>

<script>
import api from "../../api.js";
import { mapGetters } from 'vuex';
import store from '../data/store.js';
import router from '../router'; // Assurez-vous que le router est correctement importé

export default {
    name: "Orders",
    data() {
        return {
            orders: null,
        }
    },
    mounted() {
        this.fetchOrders();
    },
    computed: {
        ...mapGetters(['getUser']),
    },
    methods: {
        async fetchOrders() {
            const userId = store.getters.getUser.id;
            console.log(userId);
            const res = await api.getOrderByUser(userId);
            if (res) {
                this.orders = res.data;
                console.log(this.orders);
            } else {
                console.error('Error while fetching orders');
            }
        },
        goToOrderDetails(orderId) {
            router.push({ name: 'OrderDetails', params: { orderId } });
        },
        statusClass(status) {
            switch (status) {
                case 'attente': return 'bg-light';
                case 'envoyee': return 'bg-warning';
                case 'delivree': return 'bg-success';
                default: return '';
            }
        }
    }
};
</script>
  