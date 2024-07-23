<template>
  <div>
    <h1 class="page-title">Administration</h1>
    <div class="tableContainer" v-if="isAdminRoot">
      <table class="admin-links-table">
        <thead>
          <tr>
            <th>Gestion</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="link-cell">
              <router-link to="/admin/users">Gérer les utilisateurs</router-link>
              <router-link to="/admin/users">
                <button class="btn btn-primary">Voir</button>
              </router-link>
            </td>
          </tr>
          <tr>
            <td class="link-cell">
              <router-link to="/admin/products">Gérer les produits</router-link>
              <router-link to="/admin/products">
                <button class="btn btn-primary">Voir</button>
              </router-link>
            </td>
          </tr>
          <tr>
            <td class="link-cell">
              <router-link to="/admin/brands">Gérer les marques</router-link>
              <router-link to="/admin/brands">
                <button class="btn btn-primary">Voir</button>
              </router-link>
            </td>
          </tr>
          <tr>
            <td class="link-cell">
              <router-link to="/admin/category">Gérer les categories</router-link>
              <router-link to="/admin/category">
                <button class="btn btn-primary">Voir</button>
              </router-link>
            </td>
          </tr>
          <tr>
            <td class="link-cell">
              <router-link to="/admin/order">Gérer les commandes</router-link>
              <router-link to="/admin/order">
                <button class="btn btn-primary">Voir</button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <router-view></router-view>
  </div>
</template>
<style scoped>
  
  .admin-links-table {
    margin: 1rem;
    border-collapse: collapse;
    width: 100%;
  }
  .tableContainer {
    width: 70%;
    margin-left: 5rem;
    margin-top: 3rem;
  }
  .admin-links-table th, .admin-links-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  .admin-links-table th {
    background-color: #f2f2f2;
    text-align: left;
  }
  .link-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
  
<script>
export default {
  name: 'Admin',
  computed: {
    isAdminRoot() {
      return this.$route.path === '/admin';
    }
  }
}
</script>