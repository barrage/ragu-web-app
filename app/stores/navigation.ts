export const useNavigationStore = defineStore('navigation', () => {
  // STATE
  const isSidebarCollapsed = ref<boolean>(false)
  const isAdminSidebarCollapsed = ref<boolean>(false)

  // ACTIONS
  const toggleSidebar = () => {
    isSidebarCollapsed.value = !isSidebarCollapsed.value
  }
  const toggleAdminSidebar = () => {
    isAdminSidebarCollapsed.value = !isAdminSidebarCollapsed.value
  }

  return {
    isSidebarCollapsed,
    isAdminSidebarCollapsed,
    toggleAdminSidebar,
    toggleSidebar,

  }
})
