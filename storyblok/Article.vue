<template>
  <div v-editable="blok" class="px-4 py-8 flex flex-col items-center">
    <!-- <img
      v-if="blok.image?.filename"
      :src="blok.image.filename + '/m/1600x0'"
      :alt="blok.image.alt"
      class="w-full h-48 sm:h-64 md:h-80 lg:h-[450px] object-cover rounded-lg"
    /> -->
    <div class="container mx-auto mb-12">
      <h1
        class="text-3xl sm:text-4xl md:text-5xl lg:text-4xl text-[#2c2cda] font-bold mt-12 mb-4 text-center"
      >
        {{ blok.title }}
      </h1>
      <h2
        class="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-[#1d243d] font-bold mb-4 text-center"
      >
        {{ blok.subtitle }}
      </h2>
      <!-- YouTube Video -->
      <div v-if="youtubeEmbedUrl" class="video-container my-8">
        <iframe
          :src="youtubeEmbedUrl"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          class="rounded-lg shadow-lg"
        ></iframe>
      </div>
      <div
        v-html="resolvedRichText"
        class="prose prose-sm sm:prose lg:prose-lg xl:prose-xl"
      ></div>
    </div>

    <!-- Image Modal -->
    <div
      v-if="showModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75"
      @click="closeModal"
    >
      <div class="max-w-4xl w-full relative">
        <!-- Close Button -->
        <button
          @click="closeModal"
          class="absolute -top-4 -right-4 w-8 h-8 flex items-center justify-center bg-white rounded-full shadow-lg hover:bg-gray-100 transition-colors z-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        <img
          :src="selectedImage"
          class="w-full h-auto object-contain rounded-lg"
          @click.stop
        />
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({ blok: Object });

const youtubeEmbedUrl = computed(() => {
  if (!props.blok.youtube) return null;

  // Extract video ID from YouTube URL
  const regex =
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = props.blok.youtube.match(regex);

  if (match?.[1]) {
    return `https://www.youtube.com/embed/${match[1]}`;
  }
  return null;
});

const showModal = ref(false);
const selectedImage = ref("");

// Add click handlers to images after content is mounted
onMounted(() => {
  const images = document.querySelectorAll(".prose img");
  images.forEach((img) => {
    img.style.cursor = "pointer";
    img.addEventListener("click", () => {
      selectedImage.value = img.src;
      showModal.value = true;
    });
  });
});

const closeModal = () => {
  showModal.value = false;
  selectedImage.value = "";
};

const resolvedRichText = computed(() => renderRichText(props.blok.content));
</script>

<style>
.video-container {
  @apply relative w-full;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.video-container iframe {
  @apply absolute top-0 left-0 w-full h-full;
}

.prose img {
  @apply w-full max-w-[200px] h-[150px] object-cover rounded-lg;
  @apply float-start mr-4 mb-4 mt-2;
  @apply hover:shadow-lg transition-shadow;
  @apply first:mt-4;
}

/* Mobile styles */
@media (max-width: 640px) {
  .prose img {
    @apply float-none mx-auto;
    @apply mb-6;
    @apply max-w-[250px] h-[180px];
  }

  .prose p {
    @apply text-center clear-none text-base leading-relaxed mb-4 text-gray-700;
  }
}

.prose h1 {
  @apply text-3xl font-bold mb-6 text-gray-900;
}

.prose h2 {
  @apply text-2xl font-bold mb-4 text-gray-800;
}

.prose h3 {
  @apply text-xl font-bold mb-3 text-gray-800;
}

.prose p {
  @apply clear-none text-base leading-relaxed mb-4 text-gray-700;
}
.prose strong {
  @apply font-bold;
}
.prose a {
  @apply text-blue-600 hover:text-blue-800 underline;
}
.prose p:after {
  content: "";
  @apply block clear-both;
}
/* Responsive text sizes */
@media (max-width: 640px) {
  .prose p {
    @apply text-sm;
  }
  .prose h1 {
    @apply text-2xl;
  }
  .prose h2 {
    @apply text-xl;
  }
  .prose h3 {
    @apply text-lg;
  }
}

/* Keep existing image styles */
.prose img {
  @apply w-full max-w-[200px] h-[150px] object-cover rounded-lg;
  @apply float-start mr-4 mb-4 mt-2;
  @apply hover:shadow-lg transition-shadow;
  @apply first:mt-4;
}

@media (max-width: 640px) {
  .prose img {
    @apply float-none mx-auto;
    @apply mb-6;
    @apply max-w-[250px] h-[180px];
  }
}
</style>
