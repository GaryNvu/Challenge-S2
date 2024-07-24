<template>
  <main class="home-page">
    <section class="menu">
      <img class="img-logo" src="../assets/logo-white-transparent.png" alt="logo">
      <h1>Cardory</h1>
      <p class="fs-3">Le site de référence pour vos achats de cartes à collectionner</p>
      <router-link to="/" title="Accueil" class="">
      <button class="btn btn-primary fs-4 px-4 py-3 mt-3">
        <i class="bi bi-bag"></i>
        Acheter
      </button>
      </router-link>
      <a href="#latest-products" class="latest-products-link">Latest product</a>
    </section>
  </main>
</template>

<script>
import api from '../../api';
import { VueperSlides, VueperSlide } from 'vueperslides'
import 'vueperslides/dist/vueperslides.css'

export default {
  components: { VueperSlides, VueperSlide },
  data() {
        return {
            products: [],
        };
    },
    async created() {
    try {
      const response = await api.getProducts();
      this.products = response.data;
    } catch (error) {
      console.error('An error occurred while fetching products:', error);
    }
  },
};
</script>
  
<style scoped>
.home-page {
  text-align: center;
  position: relative;
  overflow: hidden;
}

.img-logo {
  width: 10rem;
}

h1 {
  font-size: 3.5rem;
}

.menu {
  position: relative;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white;
  z-index: 1;
}

.cat-img {
  width: 85%;
  height: 100%;
}

.menu::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("../assets/home_background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(8px);
  z-index: -1;
}

.latest-products-link {
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0,0,0,0.5);
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
  transition: background-color 0.3s ease;
}
</style>
  