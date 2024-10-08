export default defineNuxtRouteMiddleware(async (to) => {
  const authStore = useAuthStore()

  const publicRoutes = ['/login', '/auth/google']

  if (!publicRoutes.includes(to.path) && import.meta.client) {
    if (!authStore.isAuthenticated && !authStore.iscurrentUserLoading) {
      console.log('User not authenticated, redirecting to login')

      return navigateTo('/login')
    }
  }
})
