<template>
  <div class="card max-w-full mx-auto px-4 py-6">
    <div class="flex flex-col md:flex-row md:gap-10">
      <div
        class="w-full md:w-1/2 flex justify-center items-center mb-6 md:mb-0"
      >
        <img
          :src="product.image"
          alt="product image"
          class="max-w-full h-auto object-contain md:max-w-[400px]"
        />
      </div>
      <div class="w-full md:w-1/2">
        <h2 class="text-2xl md:text-3xl font-bold mb-4">{{ product.title }}</h2>
        <p class="text-xl text-gray-700 mb-4">Price £{{ product.price }}</p>
        <h3 class="font-bold border-b-2 mb-4 pb-2">Product description:</h3>
        <p class="text-base text-gray-600">{{ product.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const { product } = defineProps(["product"]);
</script>

<style scoped>
/* Additional responsive adjustments can be added here if needed */
</style>
