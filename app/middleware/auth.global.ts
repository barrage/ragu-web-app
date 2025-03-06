export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();
  const publicRouteNames = ["login", "auth-callback"];

  if (!publicRouteNames.includes(String(to.name)) && import.meta.client) {
    if (!authStore.isAuthenticated && !authStore.iscurrentUserLoading) {
      console.warn("User not authenticated, redirecting to login");

      return navigateTo("/login");
    }
  }
});
