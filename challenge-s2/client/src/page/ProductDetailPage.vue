<template>
  <div>
    <div v-if="product">
      <h1>{{ product.name }}</h1>
      <div class="product d-flex justify-content-center">
        <img class="img-detail" :src="'/src/assets/' + product.imageUrl":alt="product.name">
        <div class="details d-flex flex-column justify-content-start text-start">
          <h3>Prix : {{ product.price }}</h3>
          <h3>Etat : {{ product.price }}</h3>
          <h3>Langue : {{ product.language }}</h3>
          <button class="btn btn-primary">Add to cart</button>
        </div>
      </div>
    </div>

    <div v-else>
      <PageNotFound />
    </div>
  </div>
</template>

<style>
  img {
    width : 30%;
  }
</style>

<script>
import api from '../../api';
import PageNotFound from "../page/PageNotFound.vue";

export default {
  name: "ProductDetailPage",
  components: {
    PageNotFound,
  },
  data() {
    return {
      product: null,
    };
  },
  async created() {
    try {
      const response = await api.getProductId(this.$route.params.productid);
      this.product = response.data;
    } catch (error) {
      console.error('An error occurred while fetching products:', error);
    }
  }
};
</script>