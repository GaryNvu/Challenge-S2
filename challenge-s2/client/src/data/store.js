import { createStore } from 'vuex';
import api from '../../api';
import Cookies from 'js-cookie';

export default createStore({
  state: {
    user: null,
    token: Cookies.get('token') || null,
  },
  mutations: {
    SET_USER(state, user) {
      state.user = user;
    },
    SET_TOKEN(state, { token, expiration }) {
      if (token) {
        state.token = token;
        Cookies.set('token', token, { expires: expiration });
      } else {
        console.log(token);
      }
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      Cookies.remove('token');
    },
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
      } catch (error) {
        console.error('Login failed:', error);
        commit('clearAuth');
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
    logout({ commit }) {
      commit('clearAuth');
    }
  },
  getters: {
    isAuthenticated: state => !!state.user,
    getUser: state => state.user,
    userRole: state => state.user?.role
  }
});
