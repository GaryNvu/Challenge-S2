<template>
  <div class="row">
    <div class="col-2">
      <Filters />
    </div>
    <div class="col-10">
      <ProductsList :products="products" />
    </div>
  </div>
</template>

<script>
import ProductsList from "../components/ProductsList.vue";
import Filters from "../components/Filters.vue";
import axios from "axios";
export default {
  name: "ProductsPage",
  components: {
    ProductsList,
    Filters,
  },
  data() {
    return {
      products: [],
    };
  },
  async created() {
    const res = await axios.get("/api/products");
    const products = res.data;
    this.products = products;
  },
};
</script>
