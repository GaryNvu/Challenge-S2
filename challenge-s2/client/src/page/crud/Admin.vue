<template>
  <div>
    <h1>Administration</h1>
    <div v-if="isAdminRoot">
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
        </tbody>
      </table>
    </div>
    <router-view></router-view>
  </div>
</template>
<style scoped>
  h1 {
    margin-left: 1rem;
    margin-top: 1rem;
  }
  .admin-links-table {
    margin: 1rem;
    border-collapse: collapse;
    width: 80%;
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