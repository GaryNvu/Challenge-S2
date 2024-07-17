<template>
    <div>
      <div class="admin-header d-flex align-items-center">
        <router-link to="/admin/users">
          <i class="bi bi-arrow-left-circle-fill h4"></i>
        </router-link>
        
        <h3>Créer un nouvel utilisateur</h3>
      </div>

      <form @submit.prevent="createUser">
        <div class="form-group">
          <label for="firstname">Prénom</label>
          <input type="text" class="form-control" id="firstname" v-model="user.firstname" required>
        </div>
        <div class="form-group">
          <label for="lastname">Nom</label>
          <input type="text" class="form-control" id="lastname" v-model="user.lastname" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" class="form-control" id="email" v-model="user.email" required>
        </div>
        <div class="form-group">
          <label for="role">Rôle</label>
          <input type="role" class="form-control" id="role" v-model="user.role" required>
        </div>
        <div class="form-group">
          <label for="password">Mot de passe</label>
          <input type="password" class="form-control" id="password" v-model="user.password" required>
        </div>
        <button type="submit" class="btn btn-primary">Créer</button>
      </form>
    </div>
</template>

<script>
import api from '../../../api';

export default {
data() {
    return {
    user: {
        firstname: '',
        lastname: '',
        email: '',
        role: '',
        password: ''
    }
    };
},
methods: {
    async createUser() {
    try {
        await api.createUser(this.user);
        this.$router.push('/admin/users');
    } catch (error) {
        console.error('Erreur lors de la création de l\'utilisateur :', error);
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
  