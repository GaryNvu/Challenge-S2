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
        <div class="form-group">
            <label for="brand">Marque:</label>
            <input type="text" id="brand" v-model="product.brand" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="category">Catégorie:</label>
            <input type="text" id="category" v-model="product.category" class="form-control" required>
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
        brand: '',
        category: '',
        description: '',
        weight: null,
        stock: null,
        image: ''
    }
    }
},
methods: {
    async createProduct() {
    try {
        const response = await api.createProduct(this.product);
        console.log('Product created:', response.data);
        // Optionnel : Redirection vers la liste des produits après création
        this.$router.push('/admin/products');
    } catch (error) {
        console.error('Error creating product:', error);
    }
    }
}
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