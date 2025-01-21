<script lang="ts" setup>
import ProfileDropdownSettingsNumberManagement from '~/components/shared/ProfileDropdown/ProfileDropdownSettingsNumberManagement.vue'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'

// MODELS
const isModalVisible = defineModel<boolean>()

// CONSTANTS & STATES
const { isWhatsAppActive } = storeToRefs(useWhatsAppStore())
</script>

<template>
  <ElDialog
    v-model="isModalVisible"
    align-center
    class="barrage-dialog--large"
    destroy-on-close
     :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
    :close-on-click-modal="false"
  >
    <template #header>
      <h5>{{ $t('settings.title') }}</h5>
    </template>
    <p>{{ $t('settings.description') }}</p>

    <ProfileDropdownSettingsNumberManagement v-if="isWhatsAppActive" />
  </ElDialog>
</template>

<style lang="scss" scoped>
.action {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: var(--spacing-fluid-m);
}
</style>
