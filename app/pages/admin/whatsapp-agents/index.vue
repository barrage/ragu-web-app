<script lang="ts" setup>
import WhatsAppAgentsIcon from '~/assets/icons/svg/whatsapp-agents.svg'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'
import type { SortingValues } from '~/types/sort'
import type { Pagination } from '~/types/pagination'

definePageMeta({
  layout: 'admin-layout',
})

// CONSTANTS & STATES

const { $api } = useNuxtApp()
const { t } = useI18n()
const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: 0,
  disabled: false,
})
const sort = ref<SortingValues>({
  direction: 'desc',
  sortProperty: { name: 'Status', value: 'active' },
})

// API CALLS

const { error, execute, data: agents } = await useAsyncData(() => $api.whatsApp.BoGetAllWhatsAppAgents(pagination.value.currentPage, pagination.value.pageSize, sort.value.sortProperty.value, sort.value?.direction), { immediate: true, lazy: true })
errorHandler(error)

// WATCHERS

watch(() => agents.value?.total, (newTotal) => {
  if (newTotal) { pagination.value.total = newTotal || 0 }
})

// FUNCTIONS

onMounted(() => {
  pagination.value.total = agents.value?.total || 0
})

async function handlePageChange(page: number) {
  pagination.value.currentPage = page
  await execute()
}

async function handleSortChange(sortingValues: SortingValues) {
  sort.value.direction = sortingValues.direction
  sort.value.sortProperty = sortingValues.sortProperty
  await execute()
}
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('whatsapp_agents.title')"
          :description="t('whatsapp_agents.description')"
        >
          <template #icon>
            <WhatsAppAgentsIcon size="52" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <WhatsAppAgentsQuickActionsContainer for-whatsapp />
      </template>
    </AdminPageHeadingTemplate>
    <template v-if="agents?.items.length">
      <WhatsAppAgentsListActions @sort-change="handleSortChange" />
      <WhatsAppAgentsList
        :agents="agents?.items"
        :pagination="pagination"
        @page-change="handlePageChange"
        @refresh-agents="execute"
      />
    </template>
    <EmptyState
      v-else
      :title="t('whatsapp_agents.empty_title_agents')"
      :description="t('whatsapp_agents.empty_description_agents')"
    >
      <template #icon>
        <AccountWarningIcon size="44px" />
      </template>
      <template #cta>
        <LlmLink to="/admin/whatsapp-agents/create" type="button">
          <AddPersonIcon size="24px" /> {{ $t('whatsapp_agents.buttons.create') }}
        </LlmLink>
      </template>
    </EmptyState>
  </AdminPageContainer>
</template>

<style scoped lang="scss" />
