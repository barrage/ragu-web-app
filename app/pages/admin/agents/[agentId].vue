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
const { error } = await useAsyncData(() => agentStore.GET_SingleAgent(selectedAgentId?.value))

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <NuxtLink
      v-if="!agentStore.editMode"
      to="/admin/agents"
      class="back-link"
    >
      <ArrowLeftIcon /> {{ t('agents.title') }}
    </NuxtLink>
    <AgentDetails v-if="!agentStore.editMode" :agent="agentStore.singleAgent" />
    <AgentEdit v-else :agent="agentStore.singleAgent" />
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.back-link {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
