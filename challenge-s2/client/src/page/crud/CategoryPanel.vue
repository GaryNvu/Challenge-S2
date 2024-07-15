<template>
  <div>
    <div class="admin-header d-flex align-items-center justify-content-between">
      <div class="nav-page d-flex align-items-center">
        <router-link to="/admin">
          <i class="bi bi-arrow-left-circle-fill h4"></i>
        </router-link>
        
        <h3>Gestion Categories</h3>
      </div>

      <router-link class="ml-auto" to="/admin/category/new">
        <button class="btn btn-success">Créer une categorie</button>
      </router-link>
    </div>
    <el-table :data="categories">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="name" label="name"></el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <router-link class="ml-auto" to="`/admin/category/edit/${scope.row.id}`">
            <button class="btn btn-success">Edit</button>
          </router-link>
          <el-button class="btn btn-danger" @click="deleteCategory(scope.row.id)">Delete</el-button>
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
      categories: []
    }
  },
  mounted() {
      this.fetchCategories();
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await api.getCategory();
        this.categories = response.data;
        console.log(this.categories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
    async deleteCategory(categoryId) {
      try {
        await api.deleteCategory(categoryId);
        this.fetchCategories();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  }
}
</script>