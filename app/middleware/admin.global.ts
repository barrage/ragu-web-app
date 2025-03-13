export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore();

  // Skip initialization for auth/callback route
  // since we know there is no user yet
  if (to.name !== "auth-callback") {
    await authStore.initializeAuth();
  }

  if (authStore.isAuthenticated && to.path === "/login") {
    return navigateTo("/");
  }

  if (to.path.startsWith("/admin") && !authStore.isAdmin) {
    return navigateTo("/");
  }
});
