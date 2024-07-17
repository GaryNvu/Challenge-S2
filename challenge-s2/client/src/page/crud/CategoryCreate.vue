<template>
  <div>
      <div class="admin-header d-flex align-items-center">
        <router-link to="/admin/category">
          <i class="bi bi-arrow-left-circle-fill h4"></i>
        </router-link>
        
        <h3>Créer une catégorie</h3>
      </div>
      
      <form @submit.prevent="createCategory">
      <div class="form-group">
          <label for="name">Nom:</label>
          <input type="text" id="name" v-model="category.name" class="form-control" required>
      </div>
      <button type="submit" class="btn btn-primary">Créer Catégorie</button>
      </form>
  </div>
</template>

<script>
import api from '../../../api';

export default {
  data() {
      return {
          category: {
              name: '',
          },
      }
  },
  methods: {
      async createCategory() {
          try {
              console.log(this.category)
              const response = await api.createCategory(this.category);
              console.log('Category created:', response.data);
              this.$router.push('/admin/category');
          } catch (error) {
              console.error('Error creating category:', error);
          }
      },
  },
}
</script>

<style scoped>
h3 {
  margin-left: 1rem;
  margin-bottom: 0;
}

.admin-header {
  margin-left: 1rem;
}

form {
  margin-left: 1rem;
  margin-right: 1rem;
}

.form-group {
  margin-bottom: 1rem;
}
</style>