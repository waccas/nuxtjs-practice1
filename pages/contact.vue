<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-4 text-gray-800">Contact Us</h2>
    <form @submit.prevent="submitForm">
      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-bold mb-2"
          >Name</label
        >
        <input
          type="text"
          id="name"
          v-model="name"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-bold mb-2"
          >Email</label
        >
        <input
          type="email"
          id="email"
          v-model="email"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>
      <div class="mb-4">
        <label for="message" class="block text-gray-700 font-bold mb-2"
          >Message</label
        >
        <textarea
          id="message"
          v-model="message"
          rows="4"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
      </div>
      <button
        type="submit"
        class="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
      >
        Send Message
      </button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      message: "",
    };
  },
  methods: {
    submitForm() {
      // Handle form submission logic here
      console.log("Form submitted:", {
        name: this.name,
        email: this.email,
        message: this.message,
      });
      // Reset form fields
      this.name = "";
      this.email = "";
      this.message = "";
    },
  },
};
</script>
