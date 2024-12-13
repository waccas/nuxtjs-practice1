<!-- components/ArticleCard.vue -->
<template>
  <NuxtLink
    :to="'/blog/' + slug"
    v-editable="article"
    class="w-full h-full bg-[#f7f6fd] rounded-[5px] text-center overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
  >
    <div class="aspect-[4/3] overflow-hidden">
      <img
        v-if="article.image?.filename"
        :src="article.image.filename + '/m/800x600/filters:quality(75)'"
        :alt="article.image.alt"
        class="w-full h-full object-cover pointer-events-none"
      />
    </div>
    <div class="p-4 flex-1">
      <h3 class="text-xl text-[#1d243d] font-bold mb-3">
        {{ article.title }}
      </h3>
      <div class="line-clamp-4 text-gray-600">
        {{ article.teaser }}
      </div>
    </div>
  </NuxtLink>
</template>

<script setup>
defineProps({ article: Object, slug: String });
</script>

<style>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
