<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

definePageMeta({
  layout: 'admin-layout',
})

// CONSTATNS & STATES

const { $api } = useNuxtApp()
const whatsAppStore = useWhatsAppStore()
const route = useRoute()
const selectedAgentId = ref(route.params.agentId as string)

// API CALLS

const { execute: getAgentData, error, data: agent } = await useAsyncData(() => $api.whatsApp.BoGetSingleWhatsAppAgent(selectedAgentId?.value), { lazy: true })
errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <LlmLink
      to="/admin/whatsapp-agents"
      type="link"
    >
      <ArrowLeftIcon /> {{ $t('whatsapp_agents.title') }}
    </LlmLink>
    <WhatsAppAgentDetails
      v-if="!whatsAppStore.editMode"
      :single-agent="agent"
      @refresh-agent="getAgentData"
    />
    <WhatsAppAgentEdit
      v-else
      :single-agent="agent"
      @refresh-agent="getAgentData"
    />
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.back-link {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
