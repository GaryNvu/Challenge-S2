<template>
  <div>
    <div class="admin-header d-flex align-items-center justify-content-between">
      <div class="nav-page d-flex align-items-center">
        <router-link to="/admin">
          <i class="bi bi-arrow-left-circle-fill h4"></i>
        </router-link>
        
        <h3>Gestion Utilisateur</h3>
      </div>

      <router-link class="ml-auto" to="/admin/users/new">
        <button class="btn btn-success">Créer un Utilisateur</button>
      </router-link>
    </div>
    <el-table :data="users">
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="firstname" label="Firstname"></el-table-column>
      <el-table-column prop="lastname" label="Lastname"></el-table-column>
      <el-table-column prop="email" label="Email"></el-table-column>
      <el-table-column prop="role" label="Rôle"></el-table-column>
      <el-table-column label="Actions">
        <template #default="scope">
          <router-link class="ml-auto" :to="`/admin/users/edit/${scope.row.id}`">
            <button class="btn btn-success">Edit</button>
          </router-link>
          <el-button @click="showDeleteConfirmation(scope.row.id)">Delete</el-button>
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
      <template #body>Voulez-vous vraiment supprimer cet utilisateur ?</template>
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
      users: [],
      showModal: false,
      userIdToDelete: null,
      successMessage: 'Suppression réussie!',
      errorMessage: 'Echec de la suppression'
    }
  },
  mounted() {
      this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await api.getUsers();
        this.users = response.data;
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    },
    showDeleteConfirmation(userId) {
      this.userIdToDelete = userId;
      this.showModal = true;
    },
    async confirmDelete() {
      try {
        await api.deleteUser(this.userIdToDelete);
        this.successMessage = 'Suppression réussie !';
        this.fetchUsers();
        this.userIdToDelete = null;
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
      this.userIdToDelete = null;
    }
  }
}
</script>