<template>
    <div>
      <h3>Modifier le produit</h3>
      <form @submit.prevent="updateProduct">
        <div>
          <label for="name">Nom:</label>
          <input type="text" v-model="product.name" id="name" required />
        </div>
        <div>
          <label for="price">Prix:</label>
          <input type="number" v-model="product.price" id="price" required />
        </div>
        <div>
          <label for="description">Description:</label>
          <textarea v-model="product.description" id="description" required></textarea>
        </div>
        <div>
          <label for="weight">Poids:</label>
          <input type="number" v-model="product.weight" id="weight" required />
        </div>
        <div>
          <label for="stock">Stock:</label>
          <input type="number" v-model="product.stock" id="stock" required />
        </div>
        <div>
          <label for="image">Image:</label>
          <input type="text" v-model="product.image" id="image" />
        </div>
        <div>
          <label for="category">Catégorie:</label>
          <select v-model="product.category" id="category" required>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div>
          <label for="brand">Marque:</label>
          <select v-model="product.brand" id="brand" required>
            <option v-for="brand in brands" :key="brand.id" :value="brand.id">
              {{ brand.name }}
            </option>
          </select>
        </div>
        <button type="submit">Enregistrer les modifications</button>
      </form>
    </div>
  </template>
  
  <script>
  import api from '../../../api';
  
  export default {
    props: {
      id: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        product: {
          name: '',
          price: 0,
          description: '',
          weight: 0,
          stock: 0,
          image: '',
          category: null,
          brand: null
        },
        categories: [],
        brands: []
      };
    },
    async created() {
      await this.fetchCategories();
      await this.fetchBrands();
      await this.fetchProduct();
    },
    methods: {
      async fetchCategories() {
        try {
          const response = await api.getCategory();
          this.categories = response.data;
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
      async fetchBrands() {
        try {
          const response = await api.getBrand();
          this.brands = response.data;
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      },
      async fetchProduct() {
        try {
          console.log(this.id);
          const response = await api.getProductById(this.id);
          this.product = response.data;
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      },
      async updateProduct() {
        try {
          await api.updateProduct(this.product.sqlID, this.product);
          this.$router.push('/admin/products');
        } catch (error) {
          console.error('Error updating product:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  /* Ajoutez votre style ici */
  </style>