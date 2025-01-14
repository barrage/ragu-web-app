<script lang="ts" setup>
import AgentsIcon from '~/assets/icons/svg/agents.svg'

const { t } = useI18n()

useHead({
  title: computed(() => t('agents.title')),
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
          :title="t('agents.titles.mainTitle')"
          :description="t('agents.titles.description')"
        >
          <template #icon>
            <AgentsIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <AgentsQuickActionsContainer />
      </template>
    </AdminPageHeadingTemplate>
    <AsyncAgentListTemplate />
  </AdminPageContainer>
</template>

<style scoped lang="scss" />
