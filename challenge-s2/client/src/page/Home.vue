<template>
  <main class="home-page">
    <section class="menu">
      <h1>Cardory</h1>
      <p>Le site de référence pour vos achats de cartes à collectionner</p>
      <div class="categories row gap-4">
        <router-link
          to="/products"
          title="Magic: The Gathering"
          class="custom-link col-3 position-relative"
        >
          <img class="cat-img" src="../assets/Magic.png" />
        </router-link>
        <router-link
          to="/products"
          class="custom-link col-3 position-relative"
          aria-current="page"
        >
          <img class="cat-img" src="../assets/Pokémon.png" />
        </router-link>
        <router-link
          to="/products"
          class="custom-link col-3 position-relative"
          aria-current="page"
        >
          <img class="cat-img" src="../assets/YuGiOh.png" />
        </router-link>
      </div>
      <a href="#latest-products" class="latest-products-link">Latest product</a>
    </section>
    <!--<section id="latest-products" class="mt-5 mb-5">
      <vueper-slides
        class="no-shadow carousel"
        :arrows=true
        :visible-slides="3"
        :slide-ratio="1 / 4"
        :dragging-distance="70">
        <vueper-slide v-for="product in products" :key="product" :title="product.name.toString()" :image="'/src/uploads/' + product.image" :link="`/products/${product.sqlID}`"/>
      </vueper-slides>
    </section>-->
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

.vueperslide__title {
  margin-top: 50px;
}

.menu {
  position: relative;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: white; /* Optional: color for your text */
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
  background-image: url("../assets/home_background.png");
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: blur(8px); /* Apply blur to the background image */
  z-index: -1;
}

.categories {
  display: flex;
  flex-wrap: nowrap;
  margin-top: 75px;
  align-items: center;
  justify-content: center;
  z-index: 1;
}

.custom-link {
  padding: 25px 30px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: white;
  text-decoration: none;
  transition: background-color 0.3s ease;
}

.custom-link:hover {
  background-color: #006be9;
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
  