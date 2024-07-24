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
          <h3>Récapitulatif</h3>
          <div class="d-flex flex-column mt-4">
            <div class="d-flex flex-row justify-content-between">
              <p>Produits</p>
              <p>{{ productTotal.toFixed(2) }} €</p>
            </div>
            <hr>
            <div class="d-flex flex-row justify-content-between">
              <p>Frais de livraison</p>
              <p>{{ shippingCost.toFixed(2) }} €</p>
            </div>
            <hr>
            <div class="d-flex flex-row justify-content-between">
              <p>Total (TVA incluse)</p>
              <p>{{ (productTotal + shippingCost) }} €</p>
            </div>
          </div>
          <button class="btn btn-primary p-2 fs-5 mt-3" @click="showOrderConfirmation()">Paiement</button>
        </div>
      </div>
    </div>

    <Modal 
      :show="showModal" 
      @close="cancelOrder"
      :showCancelButton="true" 
      :onConfirm="createOrder"
      :confirmButtonText="'Confirmer'" 
      :successMessage="successMessage"
      :errorMessage="errorMessage" >
      <template #header>Confirmation de commande</template>
      <template #body>Voulez-vous vraiment effectuer cette commande ?</template>
    </Modal>
  </div>
</template>

<script>
import api from '../../api';
import CartList from "../components/CartList.vue";
import store from '../data/store.js';
import Modal from '../components/Modal.vue';

export default {
  name: "CartPage",
  components: {
    CartList,
    Modal,
  },
  data() {
    return {
      cartItems: {},
      productDetails: [],
      shippingCost: 5.0,
      showModal: false,
      successMessage: "",
      errorMessage: "",
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
          store.dispatch('fetchCart');
        })
        .catch(error => {
          console.error('Failed to remove item from cart:', error);
        });
        
    },
    showOrderConfirmation() {
      this.showModal = true;
    },
    cancelOrder() {
      this.showModal = false;
    },
    async createOrder() {
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
        this.successMessage = "Votre commande a bien été enregistrée. Un email vous a été envoyé.";
        setTimeout(() => {
          this.showModal = false;
        }, 2000);
      } catch (error) {
        console.error('Failed to create order:', error);
        this.errorMessage = "Échec de la commande. Veuillez réessayer.";
      }
      await api.clearCart(this.$route.params.userId);
      this.successMessage = "Votre commande a bien été enregistrée. Un email vous a été envoyé.";
        setTimeout(() => {
          this.showModal = false;
        }, 3000);
      this.fetchCart();
    }
  },
};
</script>

<style scoped>
  .container-fluid {
    padding: 0 2rem;
  }

  hr {
    margin: 0;
    padding: 0 0 1rem 0;
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


