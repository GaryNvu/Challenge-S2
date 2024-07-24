<template>
  <div v-if="product" class="product-container d-flex flex-column">
    <div class="d-flex flex-row align-items-center">
      <img class="p-3" :src="'/' + product.image" :alt="product.name">
      <div>
        <div class="d-flex flex-column">
          <h1>{{ product.name }}</h1>
          <h3>Prix : {{ product.price }} € TTC</h3>
          <h3>Etat : {{ product.condition }}</h3>
          <h3>Langue : {{ product.language }}</h3>
          <div class="d-flex align-items-center">
            <i v-if="product.stock > 0" class="bi bi-check fs-2 text-success"></i>
            <i v-else class="bi bi-x fs-2 text-danger"></i>
            <h3 :class="{'text-success': product.stock > 0, 'text-danger': product.stock <= 0}" class="mb-0">
                  {{ product.stock > 0 ? "En stock" : "Epuisé" }}
            </h3>
          </div>
        </div>
        <div class="d-flex flex-column">
          <div class="quantity d-flex align-items-center">
            <p class="mt-3 align-self-center">Quantité : </p>
            <el-input-number class="" v-model="amount" controls-position="right" :min="0" :max="product.stock" size="default" />
          </div>
          <button class="btn btn-primary" @click="addToCart(amount)">Ajouter au panier</button>
        </div>
      </div>
    </div>
    <div>
      <h3 class="mt-5">Description</h3>
      <p>{{ product.description }}</p>
    </div>
  </div>

  <div v-else>
    <PageNotFound />
  </div>
</template>

<script>
import api from '../../api.js';
import PageNotFound from "../page/PageNotFound.vue";
import store from '../data/store.js';

export default {
  name: "ProductDetailPage",
  components: {
    PageNotFound,
  },
  data() {
    return {
      product: null,
      amount: 0,
    };
  },
  async created() {
    try {
      const response = await api.getProductById(this.$route.params.productid);
      this.product = response.data;
    } catch (error) {
      console.error('An error occurred while fetching products:', error);
    }
  },
  methods: {
    async addToCart(quantity) {
      if (quantity > 0) {
          try {
            let productId = this.product.sqlID;
            console.log(productId);
            const userId = store.getters.getUser.id;
            console.log(productId, userId, quantity);
            const response = await api.addToCart({ userId, productId, quantity });
          } catch (error) {
            console.error('An error occurred while adding product to cart:', error);
          }
      } else {
          alert('Please select a valid amount.');
      }
    },
  }
};
</script>

<style scoped>
.product-container {
  width: 65%;
  margin: auto;
  margin-top: 3rem;
}

img {
  width: 400px;
  margin-right: 5rem;
}

h3 {
  font-size: 1.5rem;
}
</style>