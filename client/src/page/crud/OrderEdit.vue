<template>
  <div class="container mt-4" style="max-width: 600px;">
    <div class="mb-4 d-flex flex-row">
      <router-link to="/admin/orders" class="btn btn-light mr-3">
        <i class="bi bi-arrow-left-circle"></i> Retour
      </router-link>
      <h3>Modifier la commande</h3>
    </div>
    <form @submit.prevent="updateOrder">
      <div class="form-group mb-3">
        <label for="status">Status :</label>
        <select v-model="order.status" id="status" class="form-control" required>
          <option value="attente">En attente</option>
          <option value="envoyee">Envoyée</option>
          <option value="delivree">Délivrée</option>
          <option value="annulee">Annulée</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary mb-5">Enregistrer les modifications</button>
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
          status: "",
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
          const updatedData = { status: this.order.status }
          await api.updateOrder(this.id, updatedData);
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