import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:8000',
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
  },
  getCart(userid) {
    return apiClient.get('/cart/' + userid)
  },
  addToCart(cartItem) {
    return apiClient.post('/cart', cartItem);
  },
  removeFromCart(productId) {
    return apiClient.delete('/cart/1/' + productId);
  }
};