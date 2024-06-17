<template>
  <div class="offset-2 col-8">
    <div v-if="product">
      <div class="card">
        <div class="card-header">
          <h1>{{ product.name }}</h1>
        </div>
        <div class="card-body">
          <div class="row">
            <img class="col-4 p-3" :src="'/src/assets/' + product.imageUrl" :alt="product.name">
            <div class="offset-2 col-6">
              <div class="d-flex flex-column justify-content-center h-75">
                <h3>Prix : {{ product.price }}</h3>
                <h3>Etat : {{ product.condition }}</h3>
                <h3>Langue : {{ product.language }}</h3>  
              </div>
              <div>
                <button class="btn btn-primary mt-auto mb-0">Add to cart</button>
              </div>
              
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-else>
      <PageNotFound />
    </div>
  </div>
</template>

<style></style>

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