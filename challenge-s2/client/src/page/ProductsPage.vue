<template>
  <div class="row">
    <div class="col-8 offset-2">
      <div class="row">
        <div class="col-2">
          <Filters />
        </div>
        <div class="col-10">
          <ProductsList :products="products" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductsList from "../components/ProductsList.vue";
import Filters from "../components/Filters.vue";
import { products } from "../temp-data.js";
export default {
  name: "ProductsPage",
  components: {
    ProductsList,
    Filters,
  },
  data() {
    return {
      products,
    };
  },
};
</script>
