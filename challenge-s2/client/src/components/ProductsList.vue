<template>
    <div class="row">
        <div class="col-lg-3 mb-4" v-for="product in products" :key="product._id" :to="`/products/${product._id}`">
            <div class="card">
                <router-link :to="`/products/${product._id}`" class="d-block image-container pt-4" style="color: white;">
                    <img class="card-img-top" :src="product.image ? '/src/uploads/' + product.image : '/src/uploads/image-not-found.jpg'" :alt="product.name">
                </router-link>
                <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">Price : {{ product.price }} € (TTC)</p>
                    <p :class="{'text-success': product.stock > 0, 'text-danger': product.stock <= 0}">
                        {{ product.stock > 0 ? "En stock" : "Epuisé" }}
                    </p>
                </div>
                <div class="d-flex justify-content-between align-items-center m-3">
                    <div>Quantité</div>
                    <el-input-number v-model="quantities[product.sqlID]" :min="0" :max="product.stock" controls-position="right" size="default" />
                    <button class="btn btn-primary btn-sm" @click="addToCart(product.sqlID, quantities[product.sqlID])">
                        Ajouter
                    </button>
                </div>
            </div>
        </div>

        <Modal :show="showModal" @close="showModal = false" :showCancelButton="false" :confirmButtonText="'OK'">
            <template #header>Succès</template>
            <template #body>Le produit à bien été ajouté à votre panier</template>
        </Modal>
    </div>
</template>

<script>
import api from "../../api.js";
import { mapGetters, mapActions } from 'vuex';
import store from '../data/store.js';
import Modal from './Modal.vue';

export default {
    name: "ProductsList",
    components: {
        Modal
    },
    props: {
        products: Array
    },
    data() {
        return {
            quantities: {},
            showModal: false,
            successMessage: 'Produit ajouté avec succès !'
        };
    },
    computed: {
        ...mapGetters(['isAuthenticated', 'getUser']),
    },
    created() {
        this.initializeQuantities();
    },
    watch: {
        products(newVal) {
            if (newVal && newVal.length > 0) {
                this.initializeQuantities();
            }
        }
    },
    methods: {
        initializeQuantities() {
            if (!this.products || this.products.length === 0) {
                return;
            }
            this.quantities = {};
            this.products.forEach(product => {
                this.quantities[product.sqlID] = 0;
            });
        },
        async addToCart(productId, quantity) {
            if (quantity > 0) {
                try {
                    const userId = store.getters.getUser.id;
                    const response = await api.addToCart({ userId, productId, quantity });
                    await store.dispatch('fetchCart');
                    this.showModal = true;
                    setTimeout(() => { this.showModal = false; }, 3000);
                } catch (error) {
                    console.error('An error occurred while adding product to cart:', error);
                }
            } else {
                alert('Please select a valid amount.');
            }
        }
    },
};
</script>

<style scoped>
.image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
}

.card {
    border-color: #dee2e6;
}

.card-img-top {
    max-width: 100%;
    max-height: 100%;
}
.text-success {
    color: green;
}
.text-danger {
    color: red;
}
</style>
