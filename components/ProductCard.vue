<template>
  <div class="card text-center">
    <img :src="product.image" alt="product thumbnail" class="thumbnail" />
    <p class="font-bold text-gray-50 m-4 truncate">{{ product.title }}</p>
    <NuxtLink :to="`/products/${product.id}`">
      <p class="btn my-4">View Details</p>
    </NuxtLink>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
</script>
<style>
.thumbnail {
  max-height: 120px;
  max-width: 70%;
  margin: 0 auto;
}
</style>
