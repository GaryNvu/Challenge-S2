<template>
  <div>
    <h1>Shopping Cart</h1>
    <div v-if="cartItems.length > 0">
      <div>
        <div
          class="product-container"
          v-for="product in cartItems"
          :key="product.id"
        >
          <img class="product-image" :src="product.image" />
          <div class="details-wrap">
            <h3>{{ product.name }}</h3>
            <p>{{ product.price }}</p>
          </div>
          <button class="remove-button">Remove from cart</button>
        </div>
      </div>
      <button class="checkout-button">Proceed to Checkout</button>
    </div>
    <div v-if="cartItems.length === 0">Your cart is empty</div>
  </div>
</template>

<script>
import { cartItems } from "../temp-data.js";
export default {
  name: "ShoppingCartPage",
  data() {
    return {
      cartItems,
    };
  },
};
</script>
