<template>
  <div class="container mx-auto px-4">
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
    >
      <div v-for="p in products" :key="p.id" class="mb-4">
        <br />
        <ProductCard :product="p" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ProductCard from "~/components/ProductCard.vue";

//fetch the products
const { data: products } = await useFetch("https://fakestoreapi.com/products");
</script>

<style scoped></style>
