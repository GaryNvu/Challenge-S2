<template>
    <div>
      <div class="admin-header d-flex align-items-center justify-content-between">
        <div class="nav-page d-flex align-items-center">
          <router-link to="/admin">
            <i class="bi bi-arrow-left-circle-fill h4"></i>
          </router-link>
          
          <h3>Gestion Marques</h3>
        </div>
  
        <router-link class="ml-auto" to="/admin/brands/new">
          <button class="btn btn-success">Créer une Marque</button>
        </router-link>
      </div>
      <el-table :data="brands">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="Nom"></el-table-column>
        <el-table-column label="Actions">
          <template #default="scope">
            <router-link class="ml-auto" :to="`/admin/brands/edit/${scope.row.id}`">
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
      <template #body>Voulez-vous vraiment supprimer cette marque ?</template>
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
        brands: [],
        showModal: false,
        brandIdToDelete: null,
      }
    },
    mounted() {
        this.fetchBrands();
    },
    methods: {
      async fetchBrands() {
        try {
          const response = await api.getBrands();
          this.brands = response.data;
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      },
      showDeleteConfirmation(brandId) {
        this.brandIdToDelete = brandId;
        this.showModal = true;
      },
      async confirmDelete() {
        try {
          await api.deleteBrand(this.brandIdToDelete);
          this.fetchBrands();
          this.brandIdToDelete = null;
          setTimeout(() => {
            this.showModal = false;
          }, 2000);
        } catch (error) {
          throw new Error('Échec de la suppression du produit');
        }
      },
      cancelDelete() {
        this.showModal = false;
        this.brandIdToDelete = null;
      }
    }
  }
  </script>