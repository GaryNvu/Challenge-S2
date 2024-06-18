<template>
  <div class="not-found-container"></div>
</template>

<script>
export default {
  name: "PageNotFound",
};
</script>

<style scoped>
.not-found-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
  background: url("/src/assets/bg404.png");
  background-size: 100% 100%;
  background-attachment: fixed;
}

h1 {
  font-size: 3em;
  margin-bottom: 0.5em;
}

p {
  font-size: 1.5em;
}
</style>
