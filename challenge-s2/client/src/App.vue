<template>
  <div class="app">
    <Header @toggle-menu="toggleMenu" />
    <div class="mainContainer d-flex">
      <Sidebar :is_expanded="is_expanded" />
      <main>
        <router-view></router-view>
      </main>
    </div>
    <Footer/>
  </div>
</template>

<style>
  .mainContainer {
    margin: 0;
    width: 100%;
    flex-grow: 1;
    background-color: white;
  }

  main {
    width: 100%;
    background-color: white;
  }
</style>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue';
import Footer from './components/Footer.vue';

import { useStore } from 'vuex';
import { onMounted } from 'vue';

export default {
  name: "App",
  components: {
    Header,
    Sidebar,
    Footer,
  },
  data() {
    return {
      is_expanded: false,
    };
  },
  methods: {
    toggleMenu() {
      this.is_expanded = !this.is_expanded;
    },
  },
  setup() {
    const store = useStore();

    onMounted(async () => {
      const token = store.state.token || localStorage.getItem('token');
      if (token) {
        try {
          await store.dispatch('setToken', token);
          await store.dispatch('fetchUser'); 
          if (store.getters.isAuthenticated) {
            await store.dispatch('fetchCart');
          }
        } catch (error) {
          console.error('Failed to authenticate user:', error);
        }
      }
    });
  }
};
</script>
