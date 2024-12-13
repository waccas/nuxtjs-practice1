<template>
  <div class="flex flex-col min-h-screen">
    <!-- Header -->
    <header class="bg-white shadow-md">
      <div
        class="container mx-auto px-4 py-4 flex justify-between items-center"
      >
        <!-- Logo -->
        <div class="flex items-center">
          <NuxtLink to="/">
            <img src="/assets/img/logo.png" alt="Logo" class="h-14 w-auto"
          /></NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <nav class="hidden md:flex space-x-6">
          <NuxtLink to="/" class="text-gray-800 hover:text-blue-600"
            >Home</NuxtLink
          >
          <NuxtLink to="/about" class="text-gray-800 hover:text-blue-600"
            >About</NuxtLink
          >
          <NuxtLink to="/products" class="text-gray-800 hover:text-blue-600"
            >Products</NuxtLink
          >
          <NuxtLink to="/contact" class="text-gray-800 hover:text-blue-600"
            >Contact</NuxtLink
          >
          <NuxtLink to="/blog/" class="text-gray-800 hover:text-blue-600"
            >Our Blog</NuxtLink
          >
        </nav>

        <!-- Mobile Menu Toggle -->
        <button @click="toggleMobileMenu" class="md:hidden focus:outline-none">
          <svg
            class="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </button>
      </div>

      <!-- Mobile Menu Dropdown -->
      <div
        v-if="mobileMenuOpen"
        class="md:hidden absolute z-20 w-full bg-white shadow-lg"
      >
        <nav class="flex flex-col p-4 space-y-4">
          <NuxtLink
            to="/"
            @click="toggleMobileMenu"
            class="text-gray-800 hover:text-blue-600"
          >
            Home
          </NuxtLink>
          <NuxtLink
            to="/about"
            @click="toggleMobileMenu"
            class="text-gray-800 hover:text-blue-600"
          >
            About
          </NuxtLink>
          <NuxtLink
            to="/products"
            @click="toggleMobileMenu"
            class="text-gray-800 hover:text-blue-600"
          >
            Products
          </NuxtLink>
          <NuxtLink
            to="/contact"
            @click="toggleMobileMenu"
            class="text-gray-800 hover:text-blue-600"
          >
            Contact
          </NuxtLink>
        </nav>
      </div>
    </header>

    <!-- Main Content -->
    <main class="flex-grow">
      <slot />
    </main>

    <!-- Your existing header and content -->

    <NewsletterForm />

    <footer>
      <!-- ... footer content ... -->
    </footer>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white py-12">
      <div class="container mx-auto px-4 grid md:grid-cols-4 gap-8">
        <!-- Column 1: About -->
        <div>
          <h3 class="font-bold mb-4">About Us</h3>
          <p>Brief description about your company or website.</p>
        </div>

        <!-- Column 2: Quick Links -->
        <div>
          <h3 class="font-bold mb-4">Quick Links</h3>
          <ul>
            <li>
              <NuxtLink to="/" class="hover:text-blue-400">Home</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/about" class="hover:text-blue-400">About</NuxtLink>
            </li>
            <li>
              <NuxtLink to="/admin/login" class="hover:text-blue-400"
                >Admin Login</NuxtLink
              >
            </li>
            <li>
              <NuxtLink to="/blog/" class="hover:text-blue-400"
                >Our blog</NuxtLink
              >
            </li>
          </ul>
        </div>

        <!-- Column 3: Contact Info -->
        <div>
          <h3 class="font-bold mb-4">Contact</h3>
          <p>Email: contact@example.com</p>
          <p>Phone: +1 (123) 456-7890</p>
        </div>

        <!-- Column 4: Social Media -->
        <div>
          <h3 class="font-bold mb-4">Follow Us</h3>
          <div class="flex space-x-4">
            <a href="#" class="hover:text-blue-400">Facebook</a>
            <a href="#" class="hover:text-blue-400">Twitter</a>
            <a href="#" class="hover:text-blue-400">Instagram</a>
          </div>
        </div>
      </div>

      <!-- Copyright -->
      <div class="text-center mt-8 border-t border-gray-700 pt-4">
        © 2024 Your Company. All Rights Reserved.
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from "vue";
import NewsletterForm from "~/components/NewsletterForm.vue";

const mobileMenuOpen = ref(false);
const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>
