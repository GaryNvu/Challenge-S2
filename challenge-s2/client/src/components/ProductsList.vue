<template>
    <div class="card mb-4">
        <div class="card-body">
            <div class="row">
                <div class="col-4 d-flex">
                    <h5 class="me-2">Sort By</h5>
                    <el-input style="max-height: 35px; max-width: 15rem;"/>
                </div>
                <div class=" col-4 d-flex ">
                    <h5 class="me-3">Show</h5>
                    <el-input style="max-height: 35px; max-width: 10rem;"/>
                </div>
                <div class=" col-4 d-flex justify-content-around">
                    <h5>Pages</h5>
                    <i class="fa-solid fa-chevron-left mt-1"></i>
                    <h5 class="bg-primary rounded-circle px-2 text-white">1</h5>
                    <h5>2</h5>
                    <h5>3 </h5>
                    <i class="fa-solid fa-chevron-right mt-1"></i>
                </div>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-3 mb-4" v-for="product in products" :key="product.id" :to="`/products/${product.id}`">
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
import api from '../../api';

export default {
    name: "ProductsList",
    data() {
        return {
            products: [],
            value: null
        };
    },
    async created() {
    try {
      const response = await api.getProducts();
      this.products = response.data;
    } catch (error) {
      console.error('An error occurred while fetching products:', error);
    }
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
