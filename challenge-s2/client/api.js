import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default {
  getUsers() {
    return apiClient.get('/api/users');
  },
  getUserById() {
    return apiClient.get('/api/users/' + userid);
  },
  createUser(user) {
    return apiClient.post('/api/users', user);
  },
  updateUser(userId, user) {
    return apiClient.put(`/api/users/${userId}`, user);
  },
  deleteUser(userId) {
    return apiClient.delete(`/api/users/${userId}`);
  },
  getProducts() {
    return apiClient.get('/api/products');
  },
  getProductById(productid) {
    return apiClient.get('/products/' + productid)
  },
  createProduct(product) {
    return apiClient.post(`/api/products`, product);
  },
  updateProduct(productId, product) {
    return apiClient.put(`/api/products/${productId}`, product);
  },
  deleteProduct(productId) {
    return apiClient.delete(`/api/products/${productId}`);
  },
  login(user) {
    return apiClient.post('/api/login', user);
  },
  register(user) {
    return apiClient.post('/api/register', user);
  },
};