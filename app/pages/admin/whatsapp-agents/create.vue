<script lang="ts" setup>
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

definePageMeta({
  layout: 'admin-layout',
})
const { t } = useI18n()
useHead({
  title: computed(() => t('whatsapp_agents.create.title')),
})

const router = useRouter()

const handleCreated = (id: string) => {
  router.push(`/admin/whatsapp-agents/${id}`)
}
</script>

<template>
  <AdminPageContainer>
    <LlmLink to="/admin/whatsapp-agents" type="link">
      <ArrowLeftIcon size="20px" /> {{ t('whatsapp_agents.title') }}
    </LlmLink>
    <section class="create-whatsapp-agent-section">
      <div class="create-whatsapp-agent-title-wrapper">
        <AddPersonIcon size="48px" />
        <h1 class="create-whatsapp-agent-section-title">
          {{ t('whatsapp_agents.create.title') }}
        </h1>
      </div>

      <CreateWhatsAppAgentForm @created="handleCreated" />
    </section>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.create-whatsapp-agent-section {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-fluid-l);

  & .create-whatsapp-agent-title-wrapper {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & .create-whatsapp-agent-section-title {
    font-size: var(--font-size-fluid-7);
    line-height: normal;
  }
}
</style>
