export default defineNuxtRouteMiddleware((to) => {
  const { $firebaseAuth } = useNuxtApp();

  if (to.path.startsWith("/admin") && to.path !== "/admin/login") {
    // Check if user is authenticated
    if (!$firebaseAuth?.currentUser) {
      return navigateTo("/admin/login");
    }
  }

  // If on login page and already authenticated, redirect to dashboard
  if (to.path === "/admin/login" && $firebaseAuth?.currentUser) {
    return navigateTo("/admin/dashboard");
  }
});
