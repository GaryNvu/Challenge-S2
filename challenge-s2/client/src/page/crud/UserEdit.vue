<template>
    <div>
      <div class="admin-header d-flex align-items-center">
        <router-link to="/admin/users">
          <i class="bi bi-arrow-left-circle-fill h4"></i>
        </router-link>
        
        <h3>Modifier l'utilisateur</h3>
      </div>
      
      <form @submit.prevent="updateUser">
        <div>
          <label for="firstname">Prénom :</label>
          <input type="text" v-model="user.firstname" id="firstname" required />
        </div>
        <div>
          <label for="lastname">Nom :</label>
          <input type="text" v-model="user.lastname" id="lastname" required />
        </div>
        <div>
          <label for="email">Email :</label>
          <textarea v-model="user.email" id="email" required></textarea>
        </div>
        <div>
          <label for="role">Rôle :</label>
          <textarea v-model="user.role" id="role" required></textarea>
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
        user: {
          firstname: '',
          lastname: '',
          email: '',
          role: '',
        },
      };
    },
    async created() {
      await this.fetchUser();
    },
    methods: {
      async fetchUser() {
        try {
          const response = await api.getUserById(this.id);
          this.user = response.data;
        } catch (error) {
          console.error('Error fetching user:', error);
        }
      },
      async updateUser() {
        try {
          await api.updateUser(this.id, this.user);
          this.$router.push('/admin/users');
        } catch (error) {
          console.error('Error updating product:', error);
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