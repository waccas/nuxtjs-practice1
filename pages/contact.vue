<template>
  <div>
    <!-- Full-page contact form component -->
    <ContactForm />
  </div>
</template>

<script>
// Import the ContactForm component
import ContactForm from "~/components/ContactForm.vue";

export default {
  // Page component that renders the contact form
  components: {
    ContactForm,
  },

  // Optional: Page metadata
  head() {
    return {
      title: "Contact Us",
      meta: [
        {
          hid: "description",
          name: "description",
          content: "Get in touch with us through our contact form",
        },
      ],
    };
  },
};
</script>
