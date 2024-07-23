<template>
    <div>
        <div class="admin-header d-flex align-items-center">
            <router-link to="/admin/brands">
            <i class="bi bi-arrow-left-circle-fill h4"></i>
            </router-link>
            
            <h3>Création d'une marque</h3>
        </div>
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
                const response = await api.createBrand(this.brand);
                this.$router.push('/admin/brands');
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
  margin-bottom: 0;
}

.admin-header {
  margin-left: 1rem;
}

form {
    margin-left: 1rem;
    margin-right: 1rem;
}

.form-group {
    margin-bottom: 1rem;
}
</style>