<template>
    <div>
      <div class="admin-header d-flex align-items-center">
        <router-link to="/admin/category">
          <i class="bi bi-arrow-left-circle-fill h4"></i>
        </router-link>
        
        <h3>Modifier une catégorie</h3>
      </div>
      <form @submit.prevent="updateCategory">
        <div>
          <label for="name">Name :</label>
          <input type="text" v-model="category.name" id="name" required />
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
        category: {
          name: '',
        },
      };
    },
    async created() {
      await this.fetchCategory();
    },
    methods: {
      async fetchCategory() {
        try {
          const response = await api.getCategoryById(this.id);
          this.category = response.data;
        } catch (error) {
          console.error('Error fetching category:', error);
        }
      },
      async updateCategory() {
        try {
          await api.updateCategory(this.id, this.category);
          this.$router.push('/admin/category');
        } catch (error) {
          console.error('Error updating category:', error);
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