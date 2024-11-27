// pages/contact.vue
<template>
  <div class="container mx-auto px-4 py-8">
    <h1 class="text-3xl font-bold mb-6">Contact Us</h1>
    <form @submit.prevent="submitForm" class="max-w-lg mx-auto">
      <div class="mb-4">
        <label for="name" class="block mb-2">Name</label>
        <input
          v-model="form.name"
          type="text"
          id="name"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <div class="mb-4">
        <label for="email" class="block mb-2">Email</label>
        <input
          v-model="form.email"
          type="email"
          id="email"
          required
          class="w-full p-2 border rounded"
        />
      </div>

      <div class="mb-4">
        <label for="message" class="block mb-2">Message</label>
        <textarea
          v-model="form.message"
          id="message"
          required
          rows="5"
          class="w-full p-2 border rounded"
        ></textarea>
      </div>

      <button
        type="submit"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Send Message
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

const form = ref({
  name: "",
  email: "",
  message: "",
});

const submitForm = async () => {
  try {
    // Replace with your actual form submission logic
    const response = await $fetch("/api/contact", {
      method: "POST",
      body: form.value,
    });

    // Reset form after successful submission
    form.value = { name: "", email: "", message: "" };

    // Optional: Show success message
    alert("Message sent successfully!");
  } catch (error) {
    // Handle error
    console.error("Form submission error:", error);
    alert("Failed to send message. Please try again.");
  }
};
</script>
