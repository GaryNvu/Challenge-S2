<template>
  <div class="grid-wrap">
    <div
      class="product-item"
      v-for="product in products"
      :key="product.id"
      :to="`/products/${product.id}`"
    >
      <img :src="product.image" />
      <h3 class="product-name">{{ product.name }}</h3>
      <p class="product-price">{{ product.price }}</p>
      <router-link :to="'/products/' + product.id">
        <button>View Detail</button>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProductsList",
  props: ["products"],
};
</script>
