<template>
    <div>
      <div class="admin-header d-flex align-items-center">
        <router-link to="/admin/orders">
          <i class="bi bi-arrow-left-circle-fill h4"></i>
        </router-link>
        
        <h3>Modifier la commande</h3>
      </div>
      <form @submit.prevent="updateOrder">
        <div>
          <label for="userId">Client :</label>
          <input type="text" v-model="order.userId" id="userId" required />
        </div>
        <div>
          <label for="address">Addresse :</label>
          <input type="text" v-model="order.address" id="address" required />
        </div>
        <div>
          <label for="total">Total :</label>
          <input type="number" v-model.number="order.total" id="total" required />
        </div>
        <div>
          <label for="status">Status :</label>
          <select v-model="order.status" id="status" required>
            <option value="attente">En attente</option>
            <option value="envoyee">Envoyée</option>
            <option value="delivree">Délivrée</option>
            <option value="annulee">Annulée</option>
          </select>
        </div>
        <div>
          <label for="shippingFee">Frais de livraison :</label>
          <input type="text" v-model="order.shippingFee" id="shippingFee" required />
        </div>
        <div>
          <label for="deliveryTrackingNumber">Numéro de livraison :</label>
          <input type="text" v-model="order.deliveryTrackingNumber" id="deliveryTrackingNumber" required />
        </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../../../api';
  
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        order: {
          userId: '',
          userId: '',
          address: '',
          total: 0,
          status: '',
          paymentMethod: '',
          shippingFee: 0,
          discountCode: '',
          taxAmount: 0,
          deliveryTrackingNumber: '',
          note: '',
        },
      };
    },
    async created() {
      await this.fetchOrder();
    },
    methods: {
      async fetchOrder() {
        try {
          const response = await api.getOrderById(this.id);
          this.order = response.data;
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      },
      async updateOrder() {
        try {
          await api.updateOrder(this.id, this.order);
          this.$router.push('/admin/orders');
        } catch (error) {
          console.error('Error updating order:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
 h3 {
  margin-left: 1rem;
  margin-bottom: 0;
}

.admin-header {
  margin-left: 1rem;
}
  </style>