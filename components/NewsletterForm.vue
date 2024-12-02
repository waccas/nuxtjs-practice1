<template>
  <div class="bg-gray-100 py-8">
    <div class="container mx-auto px-4">
      <div class="max-w-md mx-auto">
        <h3 class="text-2xl font-bold text-center mb-4">
          Subscribe to Our Newsletter
        </h3>
        <form @submit.prevent="subscribeNewsletter" class="flex flex-col gap-2">
          <input
            v-model="newsletterEmail"
            type="email"
            placeholder="Enter your email"
            class="px-4 py-2 border rounded-lg"
            :class="{ 'border-red-500': error }"
          />
          <p v-if="error" class="text-red-500 text-sm">{{ error }}</p>
          <p v-if="success" class="text-green-500 text-sm">{{ success }}</p>
          <button
            type="submit"
            :disabled="isLoading"
            class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {{ isLoading ? "Subscribing..." : "Subscribe" }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import {
  ref as dbRef,
  push,
  get,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";

const { $firebaseDatabase: db } = useNuxtApp();

const newsletterEmail = ref("");
const error = ref("");
const success = ref("");
const isLoading = ref(false);

const subscribeNewsletter = async () => {
  error.value = "";
  success.value = "";

  try {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(newsletterEmail.value)) {
      error.value = "Please enter a valid email address";
      return;
    }

    isLoading.value = true;

    const emailsRef = dbRef(db, "newsletter-subscribers");
    const emailQuery = query(
      emailsRef,
      orderByChild("email"),
      equalTo(newsletterEmail.value)
    );

    const snapshot = await get(emailQuery);
    if (snapshot.exists()) {
      error.value = "This email is already subscribed";
      return;
    }

    await push(emailsRef, {
      email: newsletterEmail.value,
      subscribedAt: new Date().toISOString(),
    });

    success.value = "Thank you for subscribing!";
    newsletterEmail.value = "";
  } catch (err) {
    console.error("Subscription error:", err);
    error.value = "Something went wrong. Please try again.";
  } finally {
    isLoading.value = false;
  }
};
</script>
