<template>
    <div>
      <div class="admin-header d-flex align-items-center">
        <router-link to="/admin/brands">
          <i class="bi bi-arrow-left-circle-fill h4"></i>
        </router-link>
        
        <h3>Modifier la commande</h3>
      </div>
      <form @submit.prevent="updateBrand">
        <div>
          <label for="name">Nom :</label>
          <input type="text" v-model="brand.name" id="name" required />
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
        brand: {
          name: '',
        },
      };
    },
    async created() {
      await this.fetchBrand();
    },
    methods: {
      async fetchBrand() {
        try {
          const response = await api.getBrandById(this.id);
          this.brand = response.data;
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      },
      async updateBrand() {
        try {
          await api.updateBrand(this.id, this.brand);
          this.$router.push('/admin/brands');
        } catch (error) {
          console.error('Error updating brand:', error);
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