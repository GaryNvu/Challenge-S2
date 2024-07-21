<template>
  <h1 class="mt-2 pl-2">Panier</h1>
  <div class="d-flex flex-column justify-content-center align-items-center" v-if="cartItems.length > 0">
    <CartList :products="productDetails" @remove-from-cart=""/>
    <button class="checkout-button btn btn-primary p-2 fs-4">Proceed to Checkout</button>
  </div>
  <div v-if="cartItems.length === 0" class="text-center fs-3">Your cart is empty</div>
</template>

<script>
import api from '../../api';
import CartList from "../components/CartList.vue";

export default {
  name: "CartPage",
  components: {
    CartList,
  },
  data() {
    return {
      cartItems: {},
      productDetails: [],
    };
  },
  async created() {
    await this.fetchCart();
  },
  methods: {
    async fetchCart() {
      try {
        const response = await api.getCart(this.$route.params.userId);
        this.cartItems = response.data;
        this.processProducts();
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
    processProducts() {
      this.productDetails = this.cartItems.map(item => ({
        ...item.Product,
        quantity: item.quantity
      }));
    }
  },
};
</script>

<style scoped>
.checkout-button {
  width: 20%;
}
</style>


