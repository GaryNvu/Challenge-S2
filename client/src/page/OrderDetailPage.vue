<template>
    <h1 class="page-title mb-5">Détails de la commande #{{ orderId }}</h1>
    <div class="order-details">
        <div v-if="order">
            <h2>Informations sur la commande</h2>
            <p><strong>Statut :</strong> {{ order.status }}</p>
            <p><strong>Date :</strong> {{ new Date(order.createdAt).toLocaleDateString() }}</p>
            <p><strong>Frais de livraison :</strong> {{ order.shippingFee }} €</p>
            <p><strong>Numéro de suivi :</strong> {{ order.deliveryTrackingNumber }}</p>
            <p><strong>Total :</strong> {{ order.total }} €</p>

            <h2>Produits commandés</h2>
            <div v-if="order.OrderItems && order.OrderItems.length">
                <div v-for="item in order.OrderItems" :key="item.id" class="product-card">
                    <img :src="item.Product.image ? '@/assets/uploads/' + item.Product.image : '/src/assets/uploads/image-not-found.jpg'" :alt="item.Product.name" alt="Product Image" class="product-image">
                    <div class="product-details">
                        <h3>{{ item.Product.name }}</h3>
                        <p>Catégorie: {{ item.Product.category }}</p>
                        <p>Prix unitaire: {{ item.price.toFixed(2) }} €</p>
                        <p>Quantité: {{ item.quantity }}</p>
                        <p>Total: {{ (item.price * item.quantity).toFixed(2) }} €</p>
                    </div>
                </div>
            </div>
            <div v-else>
                <p>Aucun produit trouvé pour cette commande.</p>
            </div>
        </div>
        <div v-else>
            <p>Chargement des détails de la commande...</p>
        </div>
    </div>
</template>

<script>
import api from '../../api.js';
import PageNotFound from "../page/PageNotFound.vue";
import store from '../data/store.js';

export default {
    name: 'OrderDetails',
    data() {
        return {
            orderId: this.$route.params.order_id,
            order: null,
            orderItems: null,
        }
    },
    mounted() {
        this.fetchOrderDetails();
    },
    methods: {
        async fetchOrderDetails() {
        console.log("Fetching order details for ID:", this.orderId);
        try {
            const response = await api.getOrderById(this.orderId);
            if (response && response.data) {
                this.order = response.data; 
                this.orderItems = response.data.OrderItems;
                console.log("Address:", this.order.address);
                console.log("Order Items:", this.orderItems);
            } else {
                console.error("No data received for order");
            }
        } catch (error) {
            console.error("Error fetching order details:", error);
        }
    }
    }
}
</script>

<style scoped>
.order-details {
    width: 80%;
    margin: auto;
    padding: 20px;
    padding: 2rem;
    background-color: #f8f9fa;
    border: 1px solid #dee2e6;
    border-radius: 0.45rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}
.product-card {
    display: flex;
    border: 1px solid #ccc;
    margin-top: 10px;
    padding: 10px;
}
.product-image {
    width: 100px;
    height: 100px;
    margin-right: 20px;
}
.product-details {
    flex-grow: 1;
}
</style>