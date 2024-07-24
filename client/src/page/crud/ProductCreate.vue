<template>
    <div>
        <div class="admin-header d-flex align-items-center">
            <router-link to="/admin/products">
            <i class="bi bi-arrow-left-circle-fill h4"></i>
            </router-link>
            
            <h3>Création d'un produit</h3>
        </div>
        <form @submit.prevent="showCreateConfirmation">
        <div class="form-group">
            <label for="name">Nom :</label>
            <input type="text" id="name" v-model="product.name" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="price">Prix (€):</label>
            <input type="number" id="price" v-model.number="product.price" class="form-control" step="0.01" required>
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
            <label for="description">Description :</label>
            <textarea id="description" v-model="product.description" class="form-control" required></textarea>
        </div>
        <div class="form-group">
            <label for="condition">Condition :</label>
            <select id="condition" v-model="product.condition" required>
                <option value="Neuf">Neuf</option>
                <option value="Occasion">Occasion</option>
            </select>
        </div>
        <div class="form-group">
            <label for="language">Langue :</label>
            <select id="language" v-model="product.language" required>
                <option value="Francais">Français</option>
            </select>
        </div>
        <div class="form-group">
            <label for="weight">Poids (grammes):</label>
            <input type="number" id="weight" v-model="product.weight" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="stock">Stock :</label>
            <input type="number" id="stock" v-model="product.stock" class="form-control" required>
        </div>
        <div class="form-group">
            <label for="image">Image (Nom):</label>
            <input type="text" id="image" v-model="product.image" class="form-control">
        </div>
        <button type="submit" class="btn btn-primary">Créer Produit</button>
        </form>

        <Modal 
            :show="showModal" 
            @close="hideModal" 
            :onConfirm="createProduct" 
            :successMessage="'Produit créé avec succès!'" 
            :confirmButtonText="'OK'"
            :errorMessage="'Échec de la création du produit'">
            <template #header>Création de produit</template>
            <template #body>
                <div v-if="modalLoading">Chargement...</div>
                <div v-else-if="modalError">{{ modalErrorMessage }}</div>
                <div v-else-if="modalSuccess">{{ modalSuccessMessage }}</div>
                <div v-else>Voulez-vous vraiment créer ce produit ?</div>
            </template>
        </Modal>
    </div>
</template>

<script>
import api from '../../../api';
import Modal from '../../components/Modal.vue';

export default {
    components: {
        Modal
    },
    data() {
        return {
        product: {
            name: '',
            price: null,
            brand_id: null,
            category_id: null,
            description: '',
            condition: '',
            language: '',
            weight: null,
            stock: null,
            image: ''
        },
        brands: [],
        categories: [],
        showModal: false,
        successMessage: 'Produit crée avec succès !',
        errorMessage: 'Echec lors de la création du produit',
        modalLoading: false,
        modalError: false,
        modalSuccess: false,
        }
    },
    methods: {
        showCreateConfirmation() {
            this.showModal = true;
        },
        async createProduct() {
            try {
                console.log("test");
                const response = await api.createProduct(this.product);
                if(response) {
                    this.modalSuccess = true;
                    setTimeout(() => {
                    this.showModal = false;
                    this.$router.push('/admin/products');
                }, 2000);
                }
                
            } catch (error) {
                this.modalError = true;
                throw new Error('Échec de la création du produit');
            }
        },
        async fetchBrandsAndCategories() {
            try {
            // Récupérer la liste des marques depuis le backend
            const brandsResponse = await api.getBrands();
            this.brands = brandsResponse.data;
            
            // Récupérer la liste des catégories depuis le backend
            const categoriesResponse = await api.getCategory();
            this.categories = categoriesResponse.data;
        } catch (error) {
            console.error('Error fetching brands and categories:', error);
        }
        },
        hideModal() {
            this.showModal = false;
        }
    },
    created() {
        this.fetchBrandsAndCategories();
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