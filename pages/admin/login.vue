<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div class="w-full max-w-md bg-white shadow-md rounded-lg p-8">
      <h2 class="text-2xl font-bold text-center mb-6">Admin Login</h2>

      <form @submit.prevent="login" class="space-y-4">
        <div>
          <label htmlFor="email" class="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            v-model="email"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label htmlFor="password" class="block text-gray-700 mb-2"
            >Password</label
          >
          <input
            type="password"
            v-model="password"
            required
            class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50"
        >
          {{ isLoading ? "Logging in..." : "Login" }}
        </button>

        <p v-if="error" class="text-red-500 text-center mt-4">
          {{ error }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const error = ref("");
const isLoading = ref(false);
const router = useRouter();

const login = async () => {
  error.value = "";
  isLoading.value = true;

  try {
    const { $firebaseAuth } = useNuxtApp();

    // Attempt to sign in
    await signInWithEmailAndPassword(
      $firebaseAuth,
      email.value,
      password.value
    );

    // Redirect to admin dashboard on success
    router.push("/admin/dashboard");
  } catch (err) {
    // Handle login errors
    error.value = "Invalid login credentials";
    console.error(err);
  } finally {
    isLoading.value = false;
  }
};

definePageMeta({
  middleware: ["auth"],
});
</script>
