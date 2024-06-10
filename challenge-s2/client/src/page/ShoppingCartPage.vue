<template>
  <div>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
      <ShoppingCartList :products="cartItems" />
      <button class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-if="cartItems.length === 0">Your cart is empty</div>
  </div>
</template>

<script>
import { cartItems } from "../temp-data.js";
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


