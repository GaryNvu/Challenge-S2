<template>
    <aside :class="['bg-light', is_expanded ? 'expanded' : 'collapsed']">
      <div class="menu nav nav-pills flex-column mb-auto">
        <router-link to="/" class="nav-link" aria-current="page">
          <i class="bi bi-house"></i>
          <span class="text">Home</span>
        </router-link>
        <router-link to="/dashboard" class="nav-link" aria-current="page">
          <i class="bi bi-bar-chart-fill"></i>
          <span class="text">Dashboard</span>
        </router-link>
        <router-link to="/products" class="nav-link" aria-current="page">
          <i class="bi bi-bag"></i>
          <span class="text">Products</span>
        </router-link>
        <router-link to="/admin" class="nav-link" aria-current="page">
          <i class="bi bi-database-fill-lock"></i>
          <span class="text">Admin Panel</span>
        </router-link>
      </div>
    </aside>
  </template>
  
<script>
export default {
    name: "Sidebar",
    props: {
        is_expanded: {
            type: Boolean,
            required: true,
        }
    },
};
</script>

<style scoped>
aside {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    min-height: 100vh;
    transition: 0.2s ease-out;
}

.menu {
    display: flex;
    flex-direction: column;
    margin: 0 -1rem;
    padding: 0.5rem 1rem;
    transition: 0.2s ease-out;
}

.collapsed {
  width: 4rem;
}

.expanded {
    width: 12rem;
}

.expanded .text {
    opacity: 1;
}

.nav-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: 0.2s ease-out;
    color: #006BE9;
}

.nav-link .bi {
  font-size: 2rem;
}

.nav-link:hover {
    background-color: #006BE9;
    color: white;
}

.text {
    margin-left: 1rem;
    transition: 0.2s ease-out;
    opacity: 0;
}
</style>
  