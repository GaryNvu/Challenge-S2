<template>
  <h1 class="mt-3 mb-5">Shopping Cart</h1>
  <div class="d-flex flex-column justify-content-center align-items-center" v-if="cartItems.length > 0">
    <ShoppingCartList :products="cartItems" />
    <button class="checkout-button btn btn-primary">Proceed to Checkout</button>
  </div>
  <div v-if="cartItems.length === 0">Your cart is empty</div>
</template>

<script>
import ShoppingCartList from "../components/ShoppingCartList.vue";

export default {
  name: "ShoppingCartPage",
  components: {
    ShoppingCartList,
  },
  data() {
    return {
      cartItems,
    };
  },
};
</script>

<style scoped>
.checkout-button {
  width: 20%;
}
</style>


