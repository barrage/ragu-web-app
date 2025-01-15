<script lang="ts" setup>
import WhatsAppAgentsIcon from '~/assets/icons/svg/whatsapp-agents.svg'

const { t } = useI18n()

useHead({
  title: computed(() => t('whatsapp_agents.title')),
})

definePageMeta({
  layout: 'admin-layout',
})
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
            <WhatsAppAgentsIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <WhatsAppAgentsQuickActionsContainer />
      </template>
    </AdminPageHeadingTemplate>
    <AsyncWhatsAppAgentListTemplate />
  </AdminPageContainer>
</template>

<style scoped lang="scss" />
