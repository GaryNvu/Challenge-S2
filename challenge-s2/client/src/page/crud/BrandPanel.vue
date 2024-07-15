<template>
    <div>
      <div class="admin-header d-flex align-items-center justify-content-between">
        <div class="nav-page d-flex align-items-center">
          <router-link to="/admin">
            <i class="bi bi-arrow-left-circle-fill h4"></i>
          </router-link>
          
          <h3>Gestion Marques</h3>
        </div>
  
        <router-link class="ml-auto" to="/admin/products/new">
          <button class="btn btn-success">Créer une Marque</button>
        </router-link>
      </div>
      <el-table :data="brands">
        <el-table-column prop="id" label="ID"></el-table-column>
        <el-table-column prop="name" label="Nom"></el-table-column>
        <el-table-column label="Actions">
          <template #default="scope">
            <router-link class="ml-auto" :to="`/admin/brands/edit/${scope.row.id}`">
              <button class="btn btn-success">Edit</button>
            </router-link>
            <el-button @click="deleteBrand(scope.row.id)">Delete</el-button>
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
        brands: []
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
          console.log(this.brands);
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      },
      async deleteBrand(brandId) {
        try {
          await api.deleteBrand(brandId);
          this.fetchBrands();
        } catch (error) {
          console.error('Error deleting brand:', error);
        }
      }
    }
  }
  </script>