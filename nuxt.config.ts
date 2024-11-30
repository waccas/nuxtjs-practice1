// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Other configurations...
  routeRules: {
    "/admin/**": { ssr: false }, // Disable server-side rendering for admin pages
  },

  modules: ["@nuxtjs/tailwindcss"],

  // Add Firebase configuration directly
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
    },
  },

  compatibilityDate: "2024-11-29",
});