<template>
    
    <aside :class="{'is-expanded': is_expanded}" class="bg-light">
      <div class="menu nav nav-pills mb-auto">
        <router-link to="/" class="nav-link" aria-current="page">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-house" viewBox="0 0 16 16">
            <path d="M8.707 1.5a1 1 0 0 0-1.414 0L.646 8.146a.5.5 0 0 0 .708.708L2 8.207V13.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V8.207l.646.647a.5.5 0 0 0 .708-.708L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM13 7.207V13.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V7.207l5-5z"/>
          </svg>
          <span class="text">Home</span>
        </router-link>
        <router-link to="/dashboard" class="nav-link" aria-current="page">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bar-chart-fill" viewBox="0 0 16 16">
            <path d="M1 11a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1zm5-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1zm5-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1z"/>
          </svg>
          <span class="text">Dashboard</span>
        </router-link>
        <router-link to="/products" class="nav-link" aria-current="page">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="currentColor" class="bi bi-bag" viewBox="0 0 16 16">
            <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1m3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1z"/>
          </svg>
          <span class="text">Products</span>
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
    width: calc(2rem + 32px);
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

.is-expanded {
    width: 240px;
}

.is-expanded .text {
    opacity: 1;
}

.nav-link {
    display: flex;
    align-items: center;
    text-decoration: none;
    padding: 0.5rem 1rem;
    transition: 0.2s ease-out;
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
  