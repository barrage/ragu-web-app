export function useTabQuery(defaultTab: string, validTabNames?: string[]) {
  const activeTab = ref<string>()
  const route = useRoute()
  if (!route.query.tab || !validTabNames?.includes(route.query.tab as string)) {
    activeTab.value = defaultTab
    replaceQuery(defaultTab)
  }
  else {
    activeTab.value = (route.query.tab as string) || defaultTab
    replaceQuery(defaultTab)
  }

  watch(activeTab, (newTab) => { if (newTab) { replaceQuery(newTab) } })

  // To validate tab name with router tab value
  if (validTabNames?.length) {
    watch(() => route.query.tab, (newTab) => {
      if (newTab !== undefined && !validTabNames.includes(newTab as string)) {
        activeTab.value = 'details'
      }
    })
  }

  return { activeTab }
}

function replaceQuery(defaultTab: string) {
  const route = useRoute()
  const router = useRouter()
  router.replace({ query: { ...route.query, tab: defaultTab } })
}
