<template>
    <div>
        <h3>Création de Produit</h3>
        <form @submit.prevent="createProduct">
        <div class="form-group">
            <label for="name">Nom:</label>
            <input type="text" id="name" v-model="product.name" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="price">Prix:</label>
            <input type="number" id="price" v-model="product.price" class="form-control" required>
        </div>
        <div>
            <label for="brand">Marque :</label>
            <select id="brand" v-model="product.brand_id" required>
                <option v-for="brand in brands" :key="brand.id" :value="brand.id">{{ brand.name }}</option>
            </select>
        </div>
        <div>
            <label for="category">Catégorie :</label>
            <select id="category" v-model="product.category_id" required>
                <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.name }}</option>
            </select>
        </div>
        <div class="form-group">
            <label for="description">Description:</label>
            <textarea id="description" v-model="product.description" class="form-control" required></textarea>
        </div>
        <div class="form-group">
            <label for="weight">Poids:</label>
            <input type="number" id="weight" v-model="product.weight" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="stock">Stock:</label>
            <input type="number" id="stock" v-model="product.stock" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="image">Image (Name):</label>
            <input type="text" id="image" v-model="product.image" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Créer Produit</button>
        </form>
    </div>
</template>

<script>
import api from '../../../api';

export default {
    data() {
        return {
        product: {
            name: '',
            price: null,
            brand_id: null,
            category_id: null,
            description: '',
            weight: null,
            stock: null,
            image: ''
        },
        brands: [],
        categories: [],
        }
    },
    methods: {
        async createProduct() {
            try {
                console.log(this.product)
                const response = await api.createProduct(this.product);
                console.log('Product created:', response.data);
                this.$router.push('/admin/products');
            } catch (error) {
                console.error('Error creating product:', error);
            }
        },
        async fetchBrandsAndCategories() {
            try {
            // Récupérer la liste des marques depuis le backend
            const brandsResponse = await api.getBrand();
            this.brands = brandsResponse.data;
            
            // Récupérer la liste des catégories depuis le backend
            const categoriesResponse = await api.getCategory();
            this.categories = categoriesResponse.data;
        } catch (error) {
            console.error('Error fetching brands and categories:', error);
        }
        },
    },
    created() {
        this.fetchBrandsAndCategories();
  },
}
</script>

<style scoped>
h3 {
    margin-left: 1rem;
    margin-bottom: 1rem;
}

form {
    margin-left: 1rem;
    margin-right: 1rem;
}

.form-group {
    margin-bottom: 1rem;
}
</style>