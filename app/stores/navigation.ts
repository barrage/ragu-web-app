export const useNavigationStore = defineStore('navigation', () => {
  // STATE
  const isSidebarCollapsed = ref<boolean>(false)

  // ACTIONS
  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }

  return {
    isSidebarCollapsed,
    toggleSidebar,

  }
})
