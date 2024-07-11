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
  getProducts() {
    return apiClient.get('/api/products');
  },
  /*getProductId(productid) {
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
  }*/
};