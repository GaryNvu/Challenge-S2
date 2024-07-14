import { createStore } from 'vuex';
import api from '../../api';

export default createStore({
  state: {
    user: null,
    token: localStorage.getItem('token') || null
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, token) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    clearAuth(state) {
        state.user = null;
        state.token = '';
        localStorage.removeItem('token');
    },
  },
  actions: {
    setUser({ commit }, user) {
      commit('SET_USER', user);
    },
    setToken({ commit }, token) {
      commit('SET_TOKEN', token);
    },
    logout({ commit }) {
        commit('clearAuth');
    },
    async fetchUser({ commit }) {
      if (this.state.token) {
        try {
          const response = await api.get('/api/user/me'); // Remplacez par votre endpoint pour obtenir l'utilisateur connecté
          commit('SET_USER', response.data);
        } catch (error) {
          console.error('Failed to fetch user:', error);
          commit('SET_TOKEN', null);
          commit('SET_USER', null);
        }
      }
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    getUser: state => state.user,
  }
});
