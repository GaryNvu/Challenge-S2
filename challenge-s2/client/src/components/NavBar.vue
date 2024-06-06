<template>
  <div class="nav-bar">
    <router-link to="/products" class="products-link">
      <div class="logo-wrap">
        <img :src="logo" style="height: 100%; border-radius: 20px" />
      </div>
    </router-link>
    <router-link to="/cart" class="cart-link">
      <button>Shopping Cart</button>
    </router-link>
  </div>
</template>

<script>
import logo from "../assets/Cardeck.svg";
export default {
  name: "NavBar",
  data() {
    return {
      logo,
    };
  },
};
</script>
