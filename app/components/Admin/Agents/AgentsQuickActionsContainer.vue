<script lang="ts" setup>
import AddIcon from '~/assets/icons/svg/add.svg'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="agents-quick-actions-container">
    <ElButton
      type="primary"
      class="create-button"
      @click="navigateTo({ path: localePath('/admin/agents/create') })"
    >
      <AddIcon /> {{ t('agents.buttons.create') }}
    </ElButton>
  </div>
</template>

<style lang="scss" scoped>
.agents-quick-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5rem;
}
.dark {
  .agents-quick-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
