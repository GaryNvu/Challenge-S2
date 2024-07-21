<template>
  <div class="container-fluid">
    <h1 class="mt-2 pl-2">Panier</h1>
    <div class="row mt-4">
      <div class="col-md-8">
        <div v-if="cartItems.length > 0">
          <CartList :products="productDetails" :userId="this.$route.params.userId" @remove-from-cart="removeFromCart"/>
        </div>
        <div v-else class="text-center fs-3">Votre panier est vide</div>
      </div>
      <div class="col-md-4">
        <div v-if="cartItems.length > 0" class="order-summary">
          <h3>Récapitulatif de la commande</h3>
          <p>Total des produits : {{ productTotal.toFixed(2) }} € (TTC)</p>
          <p>Coût de livraison : {{ shippingCost.toFixed(2) }} €</p>
          <p>Total Final : {{ (productTotal + shippingCost) }} €</p>
          <button class="btn btn-primary p-2 fs-5 mt-3" @click="createOrder">Paiement</button>
        </div>
      </div>
    </div>
  </div>
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
      shippingCost: 5.0,
    };
  },
  async created() {
    await this.fetchCart();
  },
  computed: {
    productTotal() {
      return this.productDetails.reduce((sum, item) => sum + item.price * item.quantity, 0);
    }
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
      let test = this.cartItems.map(item => ({
          productId: item.Product.id,
          quantity: item.quantity,
          price: item.Product.price,
        }));
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
      try {
        const response = await api.createOrder(orderDetails);
      } catch (error) {
        console.error('Failed to create order:', error);
      }
    }
  },
};
</script>

<style scoped>
  .container-fluid {
    padding: 0 2rem;
  }

  .order-summary {
    background-color: #f8f9fa;
    padding: 20px;
    border: 1px solid #dee2e6;
    border-radius: 0.25rem;
    margin-bottom: 1rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .checkout-button {
    width: 20%;
  }
</style>


