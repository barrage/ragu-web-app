<script lang="ts" setup>
import AgentsIcon from '~/assets/icons/svg/agents.svg'
import { useAgentStore } from '~/stores/agents'
import type { SortingValues } from '~/types/sort'

const agentStore = useAgentStore()

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

const currentPage = ref(1)
const itemsPerPage = ref(10)
const sort = ref<SortingValues>({
  direction: 'desc',
  sortProperty: { name: 'Status', value: 'active' },
})

const { error, execute } = await useAsyncData(() => agentStore.GET_AllAgents(currentPage.value, itemsPerPage.value, sort.value.sortProperty.value, sort.value?.direction))

const handlePageChange = async (page: number) => {
  currentPage.value = page
  await execute()
}
const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.direction = sortingValues.direction
  sort.value.sortProperty = sortingValues.sortProperty
  await execute()
}
errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('agents.titles.mainTitle')"
          :description="t('agents.titles.description')"
        >
          <template #icon>
            <AgentsIcon size="58px" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <AgentsQuickActionsContainer />
      </template>
    </AdminPageHeadingTemplate>
    <AgentsListActions @sort-change="handleSortChange" />
    <AgentsList :agents="agentStore.agentsResponse?.items" @page-change="handlePageChange" />
  </AdminPageContainer>
</template>

<style scoped lang="scss" />
