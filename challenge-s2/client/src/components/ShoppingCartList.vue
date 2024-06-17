<template>
  <div class="container w-50">
    <div class="row justify-content-center">
      <div
        class="product-container col-12"
        v-for="product in products"
        :key="product.id"
      >
        <div class="row align-items-center p-3">
          <div class="col-3">
            <img class="product-image img-fluid" :src="'/src/assets/' + product.imageUrl" alt="Product Image" />
          </div>
          <div class="col-7 d-flex flex-column">
            <div class="details-wrap text-left align-items-center">
              <h3>{{ product.name }}</h3>
              <p>{{ product.categorie }}</p>
              <p>{{ product.price }}</p>
            </div>
          </div>
          <div class="col-2 d-flex justify-content-center">
            <button class="remove-button" @click="removeFromCart(product.id)">
              <i class="bi bi-trash3"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ShoppingCartList",
  props: ["products"],
  methods: {
    removeFromCart(productId) {
      this.$emit("remove-from-cart", productId);
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
