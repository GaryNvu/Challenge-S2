<template>
  <h1 class="mt-2 pl-2">Products</h1>
  <div class="row m-4">
    <div class="col-2">
      <Filters />
    </div>
    <div class="col-10">
      <ProductsList />
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
