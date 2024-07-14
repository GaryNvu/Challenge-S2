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
      <el-table-column label="Actions">
        <template #default="scope">
          <el-button @click="editUser(scope.row)">Edit</el-button>
          <el-button @click="deleteUser(scope.row.id)">Delete</el-button>
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
        users: []
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
      editUser(user) {
        // Implement edit functionality
      },
      async deleteUser(userId) {
        try {
          await api.deleteUser(userId);
          this.fetchUsers(); // Refresh the user list
        } catch (error) {
          console.error('Error deleting user:', error);
        }
      }
    }
  }
  </script>