<template>
  <h1 class="mt-3 mb-5">Shopping Cart</h1>
  <div class="d-flex flex-column justify-content-center align-items-center" v-if="cartItems.length > 0">
    <ShoppingCartList :products="cartItems" @remove-from-cart="removeFromCart"/>
    <button class="checkout-button btn btn-primary">Proceed to Checkout</button>
  </div>
  <div v-if="cartItems.length === 0">Your cart is empty</div>
</template>

<script>
import api from '../../api';
import ShoppingCartList from "../components/ShoppingCartList.vue";

export default {
  name: "ShoppingCartPage",
  components: {
    ShoppingCartList,
  },
  data() {
    return {
      cartItems: {},
    };
  },
  async created() {
    try {
      const response = await api.getCart("1");
      this.cartItems = response.data;
    } catch (error) {
      console.error('An error occurred while fetching products:', error);
    }
  },
  methods: {
    async removeFromCart(productId) {
      try {
        const response = await api.removeFromCart(productId);
        console.log(response);
        
        this.cartItems = this.cartItems.filter((item) => item.id !== productId);
      } catch (error) {
        console.error("Error removing product from cart:", error);
      }
    },
  },
};
</script>

<style scoped>
.checkout-button {
  width: 20%;
}
</style>


