<template>
  <div class="d-flex justify-content-center flex-column align-items-center">
    <img class="mt-5" src="../assets/little-creature-removebg.png" alt="Little creature with cards around him">
    <h1 class="text-primary">404</h1>
    <h2 class="text-primary">Page Not Found</h2>
    <router-link to="/" title="Accueil" class="">
      <button class="btn btn-primary fs-3 mt-4">
        Accueil
      </button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style scoped>

  h1 {
    font-size: 4.5em;
  }

  h2 {
    font-size: 3rem;
  }

  img {
    width: 20%;
  }
</style>
