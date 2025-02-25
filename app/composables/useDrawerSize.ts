import { useWindowSize } from '@vueuse/core'

export const useDrawerSize = () => {
  const { width } = useWindowSize()

  const drawerSize = computed(() => {
    if (width.value <= 575) {
      return '100%'
    }
    if (width.value <= 768) {
      return '400px'
    }
    return '500px'
  })

  return {
    drawerSize,
  }
}
