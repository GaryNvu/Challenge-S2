<template>
  <div class="card mb-4">
    <div class="card-body">
      <div class="row">
        <div class="col-4 d-flex">
          <h5 class="me-2">Sort By</h5>
          <el-input style="max-height: 35px; max-width: 15rem" />
        </div>
        <div class="col-4 d-flex">
          <h5 class="me-3">Show</h5>
          <el-input style="max-height: 35px; max-width: 10rem" />
        </div>
        <div class="col-4 d-flex justify-content-around">
          <h5>Pages</h5>
          <i class="fa-solid fa-chevron-left mt-1"></i>
          <h5 class="bg-primary rounded-circle px-2 text-white">1</h5>
          <h5>2</h5>
          <h5>3</h5>
          <i class="fa-solid fa-chevron-right mt-1"></i>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div
      class="col-3 mb-4"
      v-for="product in products"
      :key="product.id"
      :to="`/products/${product.id}`"
    >
      <div class="card">
        <img class="card-img-top" :src="product.imageUrl" :alt="product.name" />
        <div class="card-body">
          <h5 class="card-title">{{ product.name }}</h5>
          <p class="card-text">{{ product.price }}</p>
        </div>
        <div class="d-flex justify-content-between m-3">
          <el-input-number v-model="product.amount" :min="0" size="small" />
          <button class="btn btn-primary btn-sm">add</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { products } from "../temp-data";

export default {
  name: "ProductsList",
  props: ["products"],
};
</script>

<style scoped></style>
