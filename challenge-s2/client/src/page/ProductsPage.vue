<template>
  <div class="row">
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
export default {
  name: "ProductsPage",
  components: {
    ProductsList,
    Filters,
  },
  data() {
    return {
    };
  },
};
</script>
