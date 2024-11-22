<script lang="ts" setup>
import AgentsIcon from '~/assets/icons/svg/agents.svg'
import { useAgentStore } from '~/stores/agents'
import type { Pagination } from '~/types/pagination'
import type { SortingValues } from '~/types/sort'

const agentStore = useAgentStore()

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

const sort = ref<SortingValues>({
  direction: 'desc',
  sortProperty: { name: 'Status', value: 'active' },
})

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: agentStore.agentsResponse?.total || 0,
  disabled: false,
})

const { error, execute } = await useAsyncData(() => agentStore.GET_AllAgents(pagination.value.currentPage, pagination.value.pageSize, sort.value.sortProperty.value, sort.value?.direction))

const handlePageChange = async (page: number) => {
  pagination.value.currentPage = page

  await execute()
}
const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.direction = sortingValues.direction
  sort.value.sortProperty = sortingValues.sortProperty
  await execute()
}
errorHandler(error)

watch(
  () => agentStore.agentsResponse?.total,
  () => {
    pagination.value.total = agentStore.agentsResponse?.total || 0
  },
  { immediate: true },
)
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
    <AgentsList
      :agents="agentStore.agentsResponse?.items"
      :pagination="pagination"
      @page-change="handlePageChange"
      @agent-activated="(handlePageChange(1))"
      @agent-deactivated="(handlePageChange(1))"
    />
  </AdminPageContainer>
</template>

<style scoped lang="scss" />
