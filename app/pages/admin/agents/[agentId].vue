<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

definePageMeta({
  layout: 'admin-layout',
})

// CONSTATNS
const { t } = useI18n()
const route = useRoute()
const agentStore = useAgentStore()

const selectedAgentId = ref(route.params.agentId as string)

// API CALLS
const { error, status } = await useAsyncData(() => agentStore.GET_SingleAgent(selectedAgentId.value))

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <NuxtLink to="/admin/agents" class="back-link">
      <ArrowLeftIcon /> {{ t('agents.title') }}
    </NuxtLink>

    <template v-if="status === 'pending'">
      <div class="agent-details-loader">
        <MeetUpLoader />
      </div>
    </template>

    <template v-else-if="status === 'success'">
      <AgentDetails v-if="!agentStore.editMode" :single-agent="agentStore.singleAgent" />
      <AgentEdit v-else :agent="agentStore.singleAgent" />
    </template>

    <template v-else>
      <AgentDetailsEmptyState />
    </template>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.back-link {
  display: flex;
  gap: 4px;
  align-items: center;
}

.agent-details-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-fluid-3-xl);
}
</style>
