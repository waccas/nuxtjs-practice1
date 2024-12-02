<template>
  <div>
    <!-- Hero Slideshow Section -->
    <section class="relative h-[70vh]">
      <div class="swiper h-full">
        <div class="swiper-wrapper">
          <!-- Slide 1 -->
          <div class="swiper-slide bg-cover bg-center bg-slate-600" style="">
            <div
              class="container mx-auto flex items-center justify-center h-full text-center text-white"
            >
              <div>
                <h1 class="text-4xl font-bold mb-4">Welcome to Our Website</h1>
                <p class="text-xl mb-6">
                  Discover our products at amazing prices!
                </p>
                <button
                  class="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600"
                >
                  <NuxtLink to="/products">Shop Now</NuxtLink>
                </button>
              </div>
            </div>
          </div>

          <!-- Add more slides as needed -->
        </div>

        <!-- Swiper Navigation -->
        <div class="swiper-pagination"></div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="container mx-auto px-4 py-16 grid md:grid-cols-3 gap-8">
      <div class="text-center">
        <div class="mb-4">
          <svg
            class="w-16 h-16 mx-auto text-blue-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">Feature One</h3>
        <p>Description of the first feature goes here.</p>
      </div>

      <div class="text-center">
        <div class="mb-4">
          <svg
            class="w-16 h-16 mx-auto text-blue-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">Feature Two</h3>
        <p>Description of the second feature goes here.</p>
      </div>

      <div class="text-center">
        <div class="mb-4">
          <svg
            class="w-16 h-16 mx-auto text-blue-500"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
            />
          </svg>
        </div>
        <h3 class="text-xl font-bold mb-2">Feature Three</h3>
        <p>Description of the third feature goes here.</p>
      </div>
    </section>

    <!-- Call to Action Section -->
    <section class="bg-blue-500 text-white py-16 text-center">
      <h2 class="text-3xl font-bold mb-4">Ready to Get Started?</h2>
      <p class="text-xl mb-8">Join thousands of satisfied customers today!</p>
      <button
        class="bg-white text-blue-500 px-10 py-4 rounded-lg hover:bg-gray-100"
      >
        Sign Up Now
      </button>
    </section>
  </div>
</template>

<script setup>
import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

onMounted(() => {
  new Swiper(".swiper", {
    modules: [Navigation, Pagination, Autoplay],
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    pagination: {
      el: ".swiper-pagination",
    },
    autoplay: {
      delay: 5000,
    },
    loop: true,
  });
});
</script>

<style>
@import "swiper/css";
@import "swiper/css/navigation";
@import "swiper/css/pagination";
</style>
