<template>
  <div class="container w-50">
    <div class="row justify-content-center">
      <div v-if="deleted" class="alert alert-danger d-flex align-items-center" role="alert">
          <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
          <p>
            {{ deleted }} have been remove from your cart !
          </p>
        </div>
      <div
        class="product-container col-12"
        v-for="product in products"
        :key="product.id"
      >
        
        <div class="row align-items-center p-3">
          <div class="col-3">
            <img class="product-image img-fluid" :src="'/src/uploads/' + product.imageUrl" alt="Product Image" />
          </div>
          <div class="col-7 d-flex flex-column">
            <div class="details-wrap text-left align-items-center">
              <h3>{{ product.name }}</h3>
              <p>Price : {{ product.price }} €</p>
              <p>Quantity : {{ product.amount }}</p>
            </div>
          </div>
          <div class="col-2 d-flex justify-content-center">
            <button class="remove-button" @click="removeFromCart(product.id, product.name)">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="product-container">
        <h4 class="mt-2">Total : {{ total }} €</h4>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingCartList",
  props: ["products"],
  data() {
    return {
      deleted: null,
    };
  },
  computed: {
    total() {
      return this.products.reduce((sum, product) => {
        return sum + (product.price * product.amount);
      }, 0);
    }
  },
  methods: {
    removeFromCart(productId, name) {
      this.$emit("remove-from-cart", productId);
      this.deleted = name;
    },
  }
};
</script>

<style scoped>  
  .product-container {
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.product-image {
  width: 70%;
}

.details-wrap p, h3{
  margin: 0;
}

.remove-button {
  background-color: #f8f9fa;
}

.remove-button .bi {
  font-size: 1.5rem;
  color: red;
}
</style>
