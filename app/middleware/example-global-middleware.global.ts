export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/middleware-test-global') {
    return navigateTo('/')
  }
})
