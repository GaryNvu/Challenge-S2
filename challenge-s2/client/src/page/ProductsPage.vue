<template>
  <div>
    <h1>Products</h1>
    <div class="grid-wrap">
      <div
        class="product-item"
        v-for="product in products"
        :key="product.id"
        :to="`/products/${product.id}`"
      >
        <img :src="product.image" alt="product.name" />
        <h3 class="product-name">{{ product.name }}</h3>
        <p class="product-price">{{ product.price }}</p>
        <button>View Detail</button>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from "../temp-data.js";
export default {
  name: "ProductsPage",
  data() {
    return {
      products,
    };
  },
};
</script>
