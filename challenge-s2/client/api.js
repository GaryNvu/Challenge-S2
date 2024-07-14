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
  getUserById() {
    return apiClient.get('/api/users' + userid);
  },
  getProducts() {
    return apiClient.get('/api/products');
  },
  getProductById(productid) {
    return apiClient.get('/products/' + productid)
  },
  login(user) {
    return apiClient.post('/api/login', user);
  },
  register(user) {
    return apiClient.post('/api/register', user);
  },
};