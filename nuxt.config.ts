// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Other configurations...
  routeRules: {
    "/admin/**": { ssr: false }, // Disable server-side rendering for admin pages
  },

  // Required modules
  modules: [
    "@nuxtjs/tailwindcss",
    ["@storyblok/nuxt", { accessToken: process.env.STORYBLOK_TOKEN }],
  ],

  // Add Firebase configuration directly
  runtimeConfig: {
    public: {
      firebaseApiKey: process.env.FIREBASE_API_KEY,
      firebaseAuthDomain: process.env.FIREBASE_AUTH_DOMAIN,
      firebaseProjectId: process.env.FIREBASE_PROJECT_ID,
      firebaseDatabaseURL: process.env.FIREBASE_DATABASE_URL,
    },
  },
  build: {
    transpile: ["firebase"],
  },

  devtools: { enabled: true },

  // Remove middleware array and let Nuxt auto-load from middleware directory
  compatibilityDate: "2024-11-29",
});
