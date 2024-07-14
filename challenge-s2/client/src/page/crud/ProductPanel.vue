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
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="price" label="Price"></el-table-column>
      <el-table-column prop="brand" label="Brand"></el-table-column>
      <el-table-column prop="category" label="Category"></el-table-column>
      <el-table-column prop="description" label="Description"></el-table-column>
      <el-table-column prop="weight" label="Weight"></el-table-column>
      <el-table-column prop="stock" label="Stock"></el-table-column>
      <el-table-column prop="image" label="Image"></el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button @click="editProduct(scope.row)">Edit</el-button>
          <el-button @click="deleteProduct(scope.row.id)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
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

export default {
  data() {
    return {
      products: []
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
    editProduct(product) {
      // Implement edit functionality
    },
    async deleteProduct(productId) {
      try {
        await api.deleteProduct(productId);
        this.fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }
}
</script>