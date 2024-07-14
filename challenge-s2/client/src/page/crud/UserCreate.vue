<template>
    <div class="container">
      <h2>Créer un nouvel utilisateur</h2>
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
    .container {
        margin-top: 20px;
    }
</style>
  