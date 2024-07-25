<template>
    <div>
      <div class="admin-header d-flex align-items-center justify-content-between">
        <div class="nav-page d-flex align-items-center">
          <router-link to="/admin">
            <i class="bi bi-arrow-left-circle-fill h4"></i>
          </router-link>
          
          <h3>Gestion des commandes</h3>
        </div>
      </div>
      <el-table :data="orders">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="user_id" label="User ID"></el-table-column>
        <el-table-column prop="address" label="Adresse"></el-table-column>
        <el-table-column prop="total" label="Total"></el-table-column>
        <el-table-column prop="status" label="Status"></el-table-column>
        <el-table-column prop="createdAt" label="Date de commande"></el-table-column>
        <el-table-column label="Actions">
          <template #default="scope">
            <router-link class="ml-auto" :to="`/admin/orders/edit/${scope.row.id}`">
              <button class="btn btn-success">Modifier</button>
            </router-link>
            <el-button @click="showDeleteConfirmation(scope.row.id)">Supprimer</el-button>
          </template>
        </el-table-column>
      </el-table>

      <Modal 
      :show="showModal" 
      @close="cancelDelete" 
      :onConfirm="confirmDelete" 
      :successMessage="successMessage" 
      :errorMessage="errorMessage">
      <template #header>Confirmation de suppression</template>
      <template #body>Voulez-vous vraiment supprimer cette commande ?</template>
    </Modal>
    </div>
  </template>
  
  <style scoped>
    h3 {
      margin-left: 1rem;
      margin-bottom: 0;
    }
  
    .admin-header {
      margin-left: 1rem;
    }
  </style>
    
  <script>
  import api from '../../../api';
  import Modal from '../../components/Modal.vue';
  
  export default {
    components: {
      Modal
    },
    data() {
      return {
        orders: [],
        showModal: false,
        orderIdToDelete: null,
      }
    },
    mounted() {
        this.fetchOrders();
    },
    methods: {
      async fetchOrders() {
        try {
          const response = await api.getOrder();
          this.orders = response.data;
        } catch (error) {
          console.error('Error fetching orders:', error);
        }
      },
      showDeleteConfirmation(id) {
        this.orderIdToDelete = id;
        this.showModal = true;
      },
      async confirmDelete() {
        try {
          await api.deleteOrder(this.orderIdToDelete);
          this.fetchBrands();
          this.orderIdToDelete = null;
          setTimeout(() => {
            this.showModal = false;
          }, 2000);
        } catch (error) {
          setTimeout(() => {
            this.showModal = false;
          }, 2000);
          throw new Error('Échec de la suppression de la commande');
        }
      },
      cancelDelete() {
        this.showModal = false;
        this.orderIdToDelete = null;
      }
    }
  }
  </script>