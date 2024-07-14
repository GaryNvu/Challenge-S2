import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

export default {
  getUsers() {
    return apiClient.get('/api/users');
  },
<<<<<<< HEAD
  getUserById() {
    return apiClient.get('/api/users' + userid);
  },
  getProducts() {
    return apiClient.get('/api/products');
  },
  getProductById(productid) {
=======
  getProducts() {
    return apiClient.get('/api/products');
  },
  /*getProductId(productid) {
>>>>>>> f3ed5db858415b587f991c480519d7064d3fa8ae
    return apiClient.get('/products/' + productid)
  },
  login(user) {
    return apiClient.post('/api/login', user);
  },
  register(user) {
    return apiClient.post('/api/register', user);
  },
<<<<<<< HEAD
=======
  removeFromCart(productId) {
    return apiClient.delete('/cart/1/' + productId);
  }*/
>>>>>>> f3ed5db858415b587f991c480519d7064d3fa8ae
};