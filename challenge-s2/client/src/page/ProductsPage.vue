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
      <div class="sort d-flex flex-row p-3 justify-content-evenly align-items-center mb-3">
        <div class="d-flex flex-row align-items-center">
          <h5 class="me-2">Trier par :</h5>
          <select v-model="sortOrder" @change="sortProducts">
              <option value="price-asc">Prix: Croissant</option>
              <option value="price-desc">Prix: Décroissant</option>
          </select>
        </div>
        <input v-model="searchQuery" @input="filterProducts" placeholder="Rechercher des produits...">
        <div class="pagination-controls">
          <button @click="currentPage = Math.max(1, currentPage - 1)" :disabled="currentPage === 1">Précédent</button>
          Page {{ currentPage }} sur {{ totalPages }}
          <button @click="currentPage = Math.min(totalPages, currentPage + 1)" :disabled="currentPage === totalPages">Suivant</button>
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
    border-top: 1px #dee2e6 solid;
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
      sortOrder: 'price-asc',
      products: [],
      filteredProducts: [],
      categories: [], 
      brands: [],  
      selectedCategories: [],
      selectedBrands: [],
      minPrice: 0,
      maxPrice: 1000,
      inStockOnly: false,
      currentPage: 1,
        pageSize: 32
      };
  },
  computed: {
    totalPages() {
        return Math.ceil(this.filteredProducts.length / this.pageSize);
    },
    paginatedProducts() {
        let start = (this.currentPage - 1) * this.pageSize;
        let end = start + this.pageSize;
        return this.filteredProducts.slice(start, end);
    }
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
    sortProducts() {
        if (this.sortOrder === 'price-asc') {
            this.filteredProducts.sort((a, b) => a.price - b.price);
        } else if (this.sortOrder === 'price-desc') {
            this.filteredProducts.sort((a, b) => b.price - a.price);
        }
    },
    filterProducts() {
      this.filteredProducts = this.products.filter(product => {
        return product.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
              product.description.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    },
    fetchFilteredProducts() {
      const params = {
        search: this.searchQuery,
        category: this.selectedCategories.join(','),
        brand: this.selectedBrands.join(','),
        minPrice: this.minPrice,
        maxPrice: this.maxPrice,
        inStock: this.inStockOnly ? '1' : ''
      };

      api.getProducts({ params })
        .then(response => {
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
    inStockOnly: 'fetchFilteredProducts',
    filteredProducts: {
        deep: true,
        handler() {
            this.sortProducts();
        }
    }
  },
};
</script>
