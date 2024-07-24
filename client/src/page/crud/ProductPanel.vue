<template>
  <div>
    <div class="admin-header d-flex align-items-center justify-content-between">
      <div class="nav-page d-flex align-items-center">
        <router-link to="/admin">
          <i class="bi bi-arrow-left-circle-fill h4"></i>
        </router-link>
        
        <h3>Gestion Produits</h3>
      </div>

      <router-link class="ml-auto" to="/admin/products/new">
        <button class="btn btn-success">Créer un produit</button>
      </router-link>
    </div>
    <el-table :data="products">
      <el-table-column prop="price" label="Prix"></el-table-column>
      <el-table-column prop="brand" label="Marque"></el-table-column>
      <el-table-column prop="category" label="Catégorie"></el-table-column>
      <el-table-column prop="description" label="Description"></el-table-column>
      <el-table-column prop="weight" label="Poids"></el-table-column>
      <el-table-column prop="condition" label="Condition"></el-table-column>
      <el-table-column prop="language" label="Langue"></el-table-column>
      <el-table-column prop="stock" label="Stock"></el-table-column>
      <el-table-column prop="image" label="Image"></el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <router-link class="ml-auto" :to="`/admin/products/edit/${scope.row._id}`">
            <button class="btn btn-success">Modifier</button>
          </router-link>
          <el-button @click="showDeleteConfirmation(scope.row.sqlID)">Supprimer</el-button>
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
      <template #body>Voulez-vous vraiment supprimer ce produit ?</template>
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
      products: [],
      showModal: false,
      productIdToDelete: null,
      successMessage: 'Suppression réussie!',
      errorMessage: 'Echec de la suppression'
    }
  },
  mounted() {
      this.fetchProducts();
  },
  methods: {
    async fetchProducts() {
      try {
        const response = await api.getProducts();
        this.products = response.data;
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    showDeleteConfirmation(productId) {
      this.productIdToDelete = productId;
      this.showModal = true;
    },
    async confirmDelete() {
      try {
        await api.deleteProduct(this.productIdToDelete);
        this.successMessage = 'Suppression réussie !';
        this.fetchProducts();
        this.productIdToDelete = null;
        setTimeout(() => {
          this.showModal = false;
        }, 2000);
      } catch (error) {
        this.errorMessage = 'Echec de la suppresion';
        throw new Error('Échec de la suppression du produit');
      }
    },
    cancelDelete() {
      this.showModal = false;
      this.productIdToDelete = null;
    }
  }
}
</script>