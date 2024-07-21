import axios from 'axios';
import Cookies from 'js-cookie';

const apiClient = axios.create({
  baseURL: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json'
  }
});

apiClient.interceptors.request.use(config => {
  const token = Cookies.get('token');
  if (token) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export default {
  getUsers() {
    return apiClient.get('/api/user');
  },
  getMe() {
    return apiClient.get('/api/user/me');
  },
  getUserById(userId) {
    return apiClient.get(`/api/user/${userId}`);
  },
  createUser(user) {
    return apiClient.post('/api/user', user);
  },
  updateUser(userId, user) {
    return apiClient.put(`/api/user/${userId}`, user);
  },
  deleteUser(userId) {
    return apiClient.delete(`/api/user/${userId}`);
  },

  getProducts(params = {}) {
    return apiClient.get('/api/product', params);
  },
  getProductById(_id) {
    return apiClient.get(`api/product/${_id}`);
  },
  createProduct(product) {
    return apiClient.post(`/api/product`, product);
  },
  updateProduct(productId, product) {
    return apiClient.put(`/api/product/${productId}`, product);
  },
  deleteProduct(productId) {
    return apiClient.delete(`/api/product/${productId}`);
  },

  getBrands() {
    return apiClient.get('/api/brand');
  },
  getBrandById(brand_id) {
    return apiClient.get(`/api/brand/${brand_id}`);
  },
  createBrand(brand) {
    return apiClient.post(`/api/brand`, brand);
  },
  updateBrand(brand_id, brand) {
    return apiClient.put(`/api/brand/${brand_id}`, brand);
  },
  deleteBrand(brand_id) {
    return apiClient.delete(`/api/brand/${brand_id}`);
  },

  getCategory() {
    return apiClient.get('/api/category');
  },
  getCategoryById(category_id) {
    return apiClient.get(`api/category/${category_id}`)
  },
  createCategory(category) {
    return apiClient.post(`/api/category`, category);
  },
  updateCategory(category_id, category) {
    return apiClient.put(`/api/category/${category_id}`, category);
  },
  deleteCategory(category_id) {
    return apiClient.delete(`/api/category/${category_id}`);
  },

  login(user) {
    return apiClient.post('/api/login', user);
  },
  register(user) {
    return apiClient.post('/api/register', user);
  },
  verifyEmail(token) {
    return apiClient.get(`/api/verify-email/`, { params: { token } })
  },

  getCart(userId) {
    return apiClient.get(`/api/cart/${userId}`);
  },
  addToCart(infos) {
    return apiClient.post('/api/cart/', infos);
  },
  removeFromCart(cartId) {
    return apiClient.delete(`/api/cart/${ cartId }`);
  },

  getOrder() {
    return apiClient.get('/api/order');
  },
  createOrder(infos) {
    console.log("infos api : ", infos);
    return apiClient.post('/api/order', infos);
  }
};