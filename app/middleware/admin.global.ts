export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  await authStore.initializeAuth();

  if (authStore.isAuthenticated && to.path === "/login") {
    return navigateTo("/");
  }

  if (to.path.startsWith("/admin") && !authStore.isAdmin) {
    return navigateTo("/");
  }
});
