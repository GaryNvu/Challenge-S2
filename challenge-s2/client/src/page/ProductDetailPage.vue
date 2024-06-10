<template>
  <div>
    <div v-if="product">
      <img :src="product.image" class="img-wrap" />
      <div class="product-details">
        <h1>{{ product.name }}</h1>
        <h3 class="product-price">{{ product.price }}</h3>
        <button class="add-to-cart">Add to cart</button>
      </div>
    </div>

    <div v-else>
      <PageNotFound />
    </div>
  </div>
</template>

<script>
import { products } from "../temp-data.js";
import PageNotFound from "../page/PageNotFound.vue";

export default {
  name: "ProductDetailPage",
  components: {
    PageNotFound,
  },
  data() {
    return {
      product: products.find(
        (product) => product.id === this.$route.params.productid
      ),
    };
  },
};
</script>