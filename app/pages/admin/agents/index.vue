<script lang="ts" setup>
import AgentsIcon from '~/assets/icons/svg/agents.svg'
import AddAgentIcon from '~/assets/icons/svg/person-add.svg'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import { useAgentStore } from '~/stores/agents'
import type { Pagination } from '~/types/pagination'
import type { SortingValues } from '~/types/sort'

const agentStore = useAgentStore()

const { t } = useI18n()

useHead({
  title: computed(() => t('agents.title')),
})

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
    <template v-if="agentStore.agentsResponse?.total">
      <AgentsListActions @sort-change="handleSortChange" />
      <AgentsList
        :agents="agentStore.agentsResponse.items"
        :pagination="pagination"
        @page-change="handlePageChange"
        @agent-activated="(handlePageChange(1))"
        @agent-deactivated="(handlePageChange(1))"
      />
    </template>
    <EmptyState
      v-else
      :title="$t('agents.empty_state_title_all')"
      :description="$t('agents.empty_state_desc_all')"
    >
      <template #icon>
        <AccountWarningIcon size="44px" />
      </template>
      <template #cta>
        <LlmLink to="/admin/agents/create" type="button">
          <AddAgentIcon size="24px" />  {{ t('agents.buttons.create') }}
        </LlmLink>
      </template>
    </EmptyState>
  </AdminPageContainer>
</template>

<style scoped lang="scss" />
