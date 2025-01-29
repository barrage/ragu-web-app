<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'

definePageMeta({
  layout: 'admin-layout',
})
const { t } = useI18n()
useHead({
  title: computed(() => t('whatsapp_agents.details_title')),
})

const { $api } = useNuxtApp()
const route = useRoute()
const selectedAgentId = ref(route.params.agentId as string)

const { execute: getWhatsAppAgentData, error: whatsAppAgentError, status: whatsAppAgentStatus, data: whatsAppAgentData } = await useAsyncData(() => $api.whatsApp.BoGetSingleWhatsAppAgent(selectedAgentId.value), { lazy: true })
errorHandler(whatsAppAgentError)
</script>

<template>
  <AdminPageContainer>
    <LlmLink to="/admin/whatsapp-agents" type="link">
      <ArrowLeftIcon size="20px" /> {{ $t('whatsapp_agents.title') }}
    </LlmLink>

    <div v-if="whatsAppAgentStatus === 'pending'" class="whatsapp-agent-details-loader">
      <MeetUpLoader />
    </div>

    <WhatsAppAgentDetails
      v-else-if="whatsAppAgentStatus === 'success'"
      :whats-app-agent="whatsAppAgentData"
      @refresh-whats-app-agent="getWhatsAppAgentData"
    />

    <EmptyState
      v-else
      :title="$t('whatsapp_agents.empty_state_title_details')"
      :description="$t('whatsapp_agents.empty_state_desc_details')"
    >
      <template #icon>
        <AccountWarningIcon size="44px" />
      </template>
    </EmptyState>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.whatsapp-agent-details-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-fluid-3-xl);
}
</style>
