<template>
  <div class="container mx-auto px-4 py-8">
    <form
      @submit.prevent="submitForm"
      class="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md"
    >
      <h2 class="text-2xl font-bold mb-6 text-center text-gray-800">
        Contact Us
      </h2>

      <div class="mb-4">
        <label for="name" class="block text-gray-700 font-bold mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="name"
          v-model.trim="formData.name"
          @blur="validateField('name')"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your full name"
        />
        <p v-if="errors.name" class="text-red-500 text-sm mt-1">
          {{ errors.name }}
        </p>
      </div>

      <div class="mb-4">
        <label for="email" class="block text-gray-700 font-bold mb-2">
          Email Address
        </label>
        <input
          type="email"
          id="email"
          v-model.trim="formData.email"
          @blur="validateField('email')"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your email address"
        />
        <p v-if="errors.email" class="text-red-500 text-sm mt-1">
          {{ errors.email }}
        </p>
      </div>

      <div class="mb-6">
        <label for="message" class="block text-gray-700 font-bold mb-2">
          Your Message
        </label>
        <textarea
          id="message"
          v-model.trim="formData.message"
          @blur="validateField('message')"
          rows="4"
          class="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Write your message here"
        ></textarea>
        <p v-if="errors.message" class="text-red-500 text-sm mt-1">
          {{ errors.message }}
        </p>
      </div>

      <button
        type="submit"
        :disabled="isSubmitting || !isFormValid"
        class="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {{ isSubmitting ? "Sending..." : "Send Message" }}
      </button>

      <div v-if="submitStatus" class="mt-4 text-center">
        <p
          :class="{
            'text-green-600': submitStatus === 'success',
            'text-red-600': submitStatus === 'error',
          }"
        >
          {{ submitMessage }}
        </p>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref as dbRef, push } from "firebase/database";
import { ref, reactive, computed } from "vue";

const formData = reactive({
  name: "",
  email: "",
  message: "",
  submittedAt: null,
});

const errors = reactive({
  name: "",
  email: "",
  message: "",
});

const isSubmitting = ref(false);
const submitStatus = ref(null);
const submitMessage = ref("");

const isFormValid = computed(() => {
  return (
    !errors.name &&
    !errors.email &&
    !errors.message &&
    formData.name &&
    formData.email &&
    formData.message
  );
});

const validateField = (field) => {
  if (field === "name") {
    const nameValue = formData.name.trim();
    const nameRegex = /^[a-zA-Z\s]{2,30}$/;

    if (!nameValue) {
      errors.name = "Name is required";
    } else if (!nameRegex.test(nameValue)) {
      errors.name = "Name must be 2-30 characters and contain only letters";
    } else {
      errors.name = "";
    }
  } else if (field === "email") {
    const emailValue = formData.email.trim();
    // Updated regex for stricter email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    // Additional checks for common invalid patterns
    const invalidPatterns = [
      /@.*@/, // Multiple @ symbols
      /\s/, // Any whitespace
      /^[.-]/, // Starting with dot or dash
      /[.-]@/, // Dot or dash before @
      /@[.-]/, // Dot or dash after @
      /\.{2,}/, // Consecutive dots
    ];

    if (!emailValue) {
      errors.email = "Email is required";
    } else if (emailValue.length > 254) {
      errors.email = "Email must be less than 254 characters";
    } else if (emailValue.length < 5) {
      errors.email = "Email is too short";
    } else if (!emailRegex.test(emailValue)) {
      errors.email = "Please enter a valid email address";
    } else if (invalidPatterns.some((pattern) => pattern.test(emailValue))) {
      errors.email = "Please enter a valid email address";
    } else if (emailValue.split("@")[0].length < 2) {
      errors.email = "Username part must be at least 2 characters";
    } else {
      const domainParts = emailValue.split("@")[1].split(".");
      const domainName = domainParts[0];
      const tld = domainParts[1];

      if (domainName.length < 2) {
        errors.email = "Domain name must be at least 2 characters";
      } else if (tld.length < 2) {
        errors.email = "Top-level domain must be at least 2 characters";
      } else {
        errors.email = "";
      }
    }
  } else if (field === "message") {
    const messageValue = formData.message.trim();

    if (!messageValue) {
      errors.message = "Message is required";
    } else if (messageValue.length < 10) {
      errors.message = "Message must be at least 10 characters";
    } else {
      errors.message = "";
    }
  }
};

const submitForm = async () => {
  if (isSubmitting.value || !isFormValid.value) return;

  // Validate all fields before submission
  validateField("name");
  validateField("email");
  validateField("message");

  if (!isFormValid.value) return;

  isSubmitting.value = true;
  submitStatus.value = null;

  try {
    const { $firebaseDatabase } = useNuxtApp();
    formData.submittedAt = new Date().toISOString();
    const contactsRef = dbRef($firebaseDatabase, "contacts");
    await push(contactsRef, formData);
    submitStatus.value = "success";
    submitMessage.value = "Message sent successfully!";
    resetForm();
  } catch (error) {
    console.error("Submission error:", error);
    submitStatus.value = "error";
    submitMessage.value = "Failed to send message. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};

const resetForm = () => {
  Object.assign(formData, {
    name: "",
    email: "",
    message: "",
    submittedAt: null,
  });
  Object.assign(errors, {
    name: "",
    email: "",
    message: "",
  });
};
</script>
