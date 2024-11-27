<template>
  <div>
    <productDetails :product="product" />
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const uri = "https://fakestoreapi.com/products/" + id;
//fetch the products
const { data: product } = await useFetch(uri); //  await useFetch(uri, { key: id });

//definePageMeta({ layout: "products" });
</script>

<style scoped></style>
