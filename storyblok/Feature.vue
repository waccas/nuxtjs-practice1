<template>
  <div
    v-editable="blok"
    class="w-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden"
  >
    <div v-if="blok.image && blok.image.filename">
      <img
        :src="blok.image.filename"
        :alt="blok.image.alt"
        class="w-full h-48 xl:h-72 object-cover"
      />
    </div>
    <div
      v-else
      class="w-full h-48 xl:h-72 flex items-center justify-center bg-gray-200"
    >
      <p class="text-gray-500">Image coming soon...</p>
    </div>
    <div class="px-12 py-6">
      <h3 class="text-2xl text-[#1d243d] font-bold">
        {{ blok.name }}
      </h3>
    </div>
  </div>
</template>

<script setup>
defineProps({ blok: Object });
</script>
