<template>
  <div class="app">
    <Header @toggle-menu="toggleMenu" />
    <div class="d-flex">
      <Sidebar :is_expanded="is_expanded" />
      <main :class="is_expanded ? 'col-10' : 'col-11'">
        <router-view></router-view>
      </main>
    </div>
    <Footer/>
  </div>
</template>

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
      const token = store.state.token || localStorage.getItem('token'); // Récupérer le token du store ou des localStorage
      if (token) {
        try {
          await store.dispatch('setToken', token); // Mettre à jour le token dans le store Vuex
          await store.dispatch('fetchUser'); // Charger les informations de l'utilisateur
        } catch (error) {
          console.error('Failed to authenticate user:', error);
          // Gérer les erreurs d'authentification ici, par exemple rediriger vers la page de connexion
        }
      }
    });
  }
};
</script>

<style scoped>
  .content {
    display: flex;
  }
</style>
