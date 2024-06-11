<template>
  <div class="app">
    <Header @toggle-menu="toggleMenu" />
    <div class="content">
      <Sidebar :is_expanded="is_expanded" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue';

export default {
  name: "App",
  components: {
    Header,
    Sidebar,
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
