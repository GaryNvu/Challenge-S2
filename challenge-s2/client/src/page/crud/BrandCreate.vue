<template>
    <div>
        <h3>Création de Marque</h3>
        <form @submit.prevent="createBrand">
        <div class="form-group">
            <label for="name">Nom:</label>
            <input type="text" id="name" v-model="brand.name" class="form-control" required>
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
            brand: {
                name: '',
            },
        }
    },
    methods: {
        async createBrand() {
            try {
                console.log(this.brand)
                const response = await api.createBrand(this.brand);
                console.log('Brand created:', response.data);
                this.$router.push('/admin/brand');
            } catch (error) {
                console.error('Error creating product:', error);
            }
        },
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