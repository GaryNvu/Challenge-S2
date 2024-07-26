<template>
  <DynamicForm
    :formTitle="'Modifier le produit'"
    :fields="fields"
    :formData="product"
    :returnPath="'/admin/products'"
    :buttonLabel="'Enregistrer les modifications'"
    @submit="updateProduct"
  />
</template>
  
  <script>
  import api from '../../../api';
  import DynamicForm from '../../components/DynamicForm.vue';
  
  export default {
    components: {
      DynamicForm
    },
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
        condition: '',
        language: '',
        stock: 0,
        image: '',
        category_id: '',
        brand_id: ''
      },
      fields: [
        { key: 'name', label: 'Nom', type: 'text', required: true },
        { key: 'price', label: 'Prix', type: 'number', required: true },
        { key: 'category_id', label: 'Catégorie', type: 'select', options: this.categories, required: true },
        { key: 'brand_id', label: 'Marque', type: 'select', options: this.brands, required: true },
        { key: 'description', label: 'Description', type: 'textarea', required: true },
        { key: 'weight', label: 'Poids', type: 'number', required: true },
        { key: 'condition', label: 'Condition', type: 'select', options: this.conditions, required: true },
        { key: 'language', label: 'Language', type: 'select', options: this.languages, required: true },
        { key: 'stock', label: 'Stock', type: 'number', required: true },
        { key: 'image', label: 'Image', type: 'text', required: false }
      ],
      conditions: [],
      languages: [],
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
          this.updateFields();
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      },
      async fetchBrands() {
        try {
          const response = await api.getBrands();
          this.brands = response.data;
          this.updateFields();
        } catch (error) {
          console.error('Error fetching brands:', error);
        }
      },
      async fetchProduct() {
        try {
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
      },
      updateFields() {
        this.fields = [
          { key: 'name', label: 'Nom', type: 'text', required: true },
          { key: 'price', label: 'Prix', type: 'number', required: true },
          { key: 'category_id', label: 'Catégorie', type: 'select', options: this.categories, required: true },
          { key: 'brand_id', label: 'Marque', type: 'select', options: this.brands, required: true },
          { key: 'description', label: 'Description', type: 'textarea', required: true },
          { key: 'weight', label: 'Poids', type: 'number', required: true },
          { key: 'condition', label: 'Condition', type: 'text', required: true },
          { key: 'language', label: 'Language', type: 'text', required: true },
          { key: 'stock', label: 'Stock', type: 'number', required: true },
          { key: 'image', label: 'Image', type: 'text', required: false }
        ];
      }
    }
  };
  </script>
  
 