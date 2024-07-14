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
};
</script>

<style scoped>
  .content {
    display: flex;
  }
</style>
