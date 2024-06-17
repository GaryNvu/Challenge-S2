import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000', // Remplacez par l'URL de votre serveur
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getProducts() {
    return apiClient.get('/products');
  },
  getProductId(productid) {
    return apiClient.get('/products/' + productid)
  }
};