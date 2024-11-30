export default defineNuxtRouteMiddleware((to, from) => {
  const { $firebaseAuth } = useNuxtApp();

  // Check if user is not authenticated
  if (!$firebaseAuth.currentUser && to.path.startsWith("/admin")) {
    return navigateTo("/admin/login");
  }
});
