<template>
    <div class="row">
        <div class="col-lg-3 mb-4" v-for="product in products" :key="product.id" :to="`/products/${product.id}`">
            <div class="card">
                <router-link :to="`/products/${product.id}`" class="d-block image-container pt-4" style="color: white;">
                    <img class="card-img-top" :src="product.image ? '/src/uploads/' + product.image : '/src/uploads/image-not-found.jpg'" :alt="product.name">
                </router-link>
                <div class="card-body">
                    <h5 class="card-title">{{ product.name }}</h5>
                    <p class="card-text">Price : {{ product.price }} €</p>
                    <p :class="{'text-success': product.stock > 0, 'text-danger': product.stock <= 0}">
                        {{ product.stock > 0 ? "En stock" : "Epuisé" }}
                    </p>
                </div>
                <div class="d-flex justify-content-between align-items-center m-3">
                    <div>Quantity</div>
                    <el-input-number v-model="product.amount" :min="0" :max="product.stock" controls-position="right" size="default" />
                    <button class="btn btn-primary btn-sm" @click="addToCart(product.id, product.amount)">
                        Add
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import api from "../../api.js";

export default {
    name: "ProductsList",
    props: {
        products: Array
    },
    methods: {
        async addToCart(productId, amount) {
            if (amount > 0) {
                try {
                    const response = await api.addToCart({ userId: "1", productId, amount });
                    console.log('Product added to cart:', response.data);
                } catch (error) {
                    console.error('An error occurred while adding product to cart:', error);
                }
            } else {
                alert('Please select a valid amount.');
            }
        }
    }
};
</script>

<style scoped>
.image-container {
    width: 85%;
    height: 260px;
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
