<template>
  <h1 class="mt-2 pl-2">Panier</h1>
  <div class="d-flex flex-column justify-content-center align-items-center" v-if="cartItems.length > 0">
    <CartList :products="productDetails" :userId="this.$route.params.userId" @remove-from-cart="removeFromCart"/>
    <button class="checkout-button btn btn-primary p-2 fs-4" @click="createOrder">Paiement</button>
  </div>
  <div v-if="cartItems.length === 0" class="text-center fs-3">Votre panier est vide</div>
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
        console.log(this.cartItems);
        this.processProducts();
      } catch (error) {
        console.error('Error fetching cart items:', error);
      }
    },
    processProducts() {
      this.productDetails = this.cartItems.map(item => ({
        ...item.Product,
        quantity: item.quantity,
        cart_id: item.cart_id,
      }));
    },
    removeFromCart(cartId) {
      api.removeFromCart(cartId)
        .then(() => {
          this.fetchCart();
        })
        .catch(error => {
          console.error('Failed to remove item from cart:', error);
        });
    },
    async createOrder() {
      console.log(this.cartItems[0].Product.id);
      let test = this.cartItems.map(item => ({
          productId: item.Product.id,
          quantity: item.quantity,
          price: item.Product.price,
        }));
        console.log("test");
      console.log(test);
      const orderDetails = {
        userId: this.$route.params.userId,
        address: 'Some address',
        cartItems: this.cartItems.map(item => ({
          productId: item.Product.id,
          quantity: item.quantity,
          price: item.Product.price,
        })),
        total: this.productDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0),
        paymentMethod: 'card',
        shippingFee: 5.0,
        discountCode: "",
        taxAmount: 4.0,
      };
      console.log(orderDetails);
      try {
        console.log(orderDetails);
        const response = await api.createOrder(orderDetails);
        console.log('Order created:', response.data);
        // Redirect or notify user that order was successful.
      } catch (error) {
        console.error('Failed to create order:', error);
      }
    }
  },
};
</script>

<style scoped>
h1 {
    margin-left: 1rem;
    margin-top: 1rem;
  }
.checkout-button {
  width: 20%;
}
</style>


