<template>
  <h1 class="mt-2 pl-2">Products</h1>
  <div class="containerProducts d-flex flex-row gx-0 ml-2">
    <div class="filters p-3">
      <h2>Filtres</h2>
      <h3>Catégorie :</h3>
      <div v-for="category in categories" :key="category.id">
        <input type="checkbox" :value="category.name" v-model="selectedCategories">
          {{ category.name }}
      </div>

      <!-- Filtres pour Marque -->
      <h3>Marque :</h3>
      <div v-for="brand in brands" :key="brand.id">
        <input type="checkbox" :value="brand.name" v-model="selectedBrands">
        {{ brand.name }}
      </div>

      <!-- Filtre pour le Prix -->
      <h3>Prix :</h3>
      <div class="d-flex flex-column">
        <label>Minimum:</label>
        <input type="number" v-model.number="minPrice">
      </div>
      <div class="d-flex flex-column">
        <label>Maximum:</label>
        <input type="number" v-model.number="maxPrice">
      </div>

      <!-- Filtre pour le Stock -->
      <h3>Stock :</h3>
      <div>
        <input type="checkbox" v-model="inStockOnly">
        En stock seulement
      </div>
    </div>
    <div class="rightSide d-flex flex-column">
      <div class="sort d-flex flex-row p-3 align-items-center mb-3">
          <h5 class="me-2">Sort By</h5>
          <el-input style="max-height: 35px; max-width: 15rem;"/>
          <input v-model="searchQuery" @input="filterProducts" placeholder="Rechercher des produits...">
          <div class="d-flex justify-content-around">
            <h5>Pages</h5>
            <i class="fa-solid fa-chevron-left mt-1"></i>
            <i class="fa-solid fa-chevron-right mt-1"></i>
          </div>
      </div>
      <ProductsList :products="filteredProducts"/>
    </div>
  </div>
</template>

<style scoped>
  h2 {
    font-size: 1.5rem;
  }

  h3 {
    font-size: 1rem;
    padding-top: 2rem;
    border-top: 1px black solid;
  }

  .rightSide {
    width: 100%;
  }

  .filters {
    border: 1px #dee2e6 solid;
    border-radius: 0.7rem;
    margin-right: 3rem;
  }

  .containerProducts {
    margin: 0 2rem;
  }

  .sort {
    border: 1px #dee2e6 solid;
    border-radius: 0.7rem;
  }
</style>

<script>
import ProductsList from "../components/ProductsList.vue";
import api from "../../api.js";
export default {
  name: "ProductsPage",
  components: {
    ProductsList,
  },
  data() {
    return {
      searchQuery: '',
      products: [],
      filteredProducts: [],
      categories: [], 
      brands: [],  
      selectedCategories: [],
      selectedBrands: [],
      minPrice: 0,
      maxPrice: 1000,
      inStockOnly: false
    };
  },
  mounted() {
    this.fetchProducts();
    this.fetchCategory();
    this.fetchBrands();
  },
  methods: {
    async fetchProducts() {
      const res = await api.getProducts();
      if(res) {
        console.log("test");
        this.products = res.data;
        this.filteredProducts = this.products;
      } else {
        console.log('Error while fetching products');
      }
    },
    async fetchCategory() {
      const res = await api.getCategory();
      if(res) {
        console.log("test");
        this.categories = res.data;
      } else {
        console.log('Error while fetching products');
      }
    },
    async fetchBrands() {
      const res = await api.getBrands();
      if(res) {
        console.log("test");
        this.brands = res.data;
      } else {
        console.log('Error while fetching products');
      }
    },
    fetchFilteredProducts() {
      const params = {
        category: this.selectedCategories.join(','),
        brand: this.selectedBrands.join(','),
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        inStock: this.inStockOnly ? '1' : ''
      };

      api.getProducts({ params })
        .then(response => {
          console.log(response.data);
          this.filteredProducts = response.data;
        })
        .catch(error => {
          console.error('Failed to fetch products:', error);
        });
    }
  },
  watch: {
    // Applique les filtres chaque fois que les critères de filtrage changent
    searchQuery: 'fetchFilteredProducts',
    selectedCategories: 'fetchFilteredProducts',
    selectedBrands: 'fetchFilteredProducts',
    minPrice: 'fetchFilteredProducts',
    maxPrice: 'fetchFilteredProducts',
    inStockOnly: 'fetchFilteredProducts'
  },
};
</script>
