<template>
  <div class="product-details">
    <div style="margin-left: 200px">
      <img :src="product.image" />
    </div>
    <div>
      <h1>{{ product.name }}</h1>
      <h3 class="product-price">{{ product.price }}</h3>
      <button class="add-to-cart">Add to carte</button>
    </div>
  </div>
</template>



<script>
import { products } from "../temp-data.js";
export default {
  name: "ProductDetailPage",
  data() {
    return {
      product: products.find(
        (product) => product.id === this.$route.params.productid
      ),
    };
  },
};
</script>
