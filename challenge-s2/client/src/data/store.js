import { createStore } from 'vuex';
import api from '../../api';
import Cookies from 'js-cookie';

export default createStore({
  state: {
    user: null,
    token: Cookies.get('token') || null,
    cart: [],
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, { token, expiration }) {
      if (token) {
        state.token = token;
        Cookies.set('token', token, { expires: expiration });
      }
    },
    CLEAR_AUTH(state) {
      state.user = null;
      state.token = null;
      Cookies.remove('token');
    },
    SET_CART(state, cartItems) {
      state.cart = cartItems;
    },
    ADD_TO_CART(state, item) {
      const existingItem = state.cart.find(product => product.id === item.id);
      if (existingItem) {
        existingItem.quantity += item.quantity;
      } else {
        state.cart.push(item);
      }
    },
    REMOVE_FROM_CART(state, productId) {
      state.cart = state.cart.filter(item => item.id !== productId);
    }
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    setToken({ commit }, { token, expiration }) {
      commit('SET_TOKEN', { token, expiration });
    },
    async login({ commit }, { email, password }) {
      try {
        const response = await api.post('/login', { email, password });
        const { token } = response.data;
        commit('SET_TOKEN', { token :token });
        await dispatch('fetchUser');
        await dispatch('fetchCart');
      } catch (error) {
        console.error('Login failed:', error);
        commit('CLEAR_AUTH');
        throw error;
      }
    },
    async fetchUser({ commit, state }) {
      if (state.token) {
        try {
          const response = await api.getMe();
          commit('SET_USER', response.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          commit('clearAuth');
        }
      } else {
        commit('clearAuth');
      }
    },
    async fetchCart({ commit }) {
      if (this.state.user) {
        try {
          const response = await api.getCart(this.state.user.id);
          commit('SET_CART', response.data);
        } catch (error) {
          console.error('Failed to fetch cart:', error);
        }
      }
    },
    async addToCart({ commit }, product) {
      commit('ADD_TO_CART', product);
      // Optionally save/update cart on server side here
    },
    async removeFromCart({ commit }, productId) {
      commit('REMOVE_FROM_CART', productId);
      // Optionally update cart on server side here
    },
    logout({ commit }) {
      commit('CLEAR_AUTH');
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    getUser: state => state.user,
    userRole: state => state.user?.role,
    cartItemCount: state => state.cart.reduce((count, item) => count + item.quantity, 0)
  }
});
