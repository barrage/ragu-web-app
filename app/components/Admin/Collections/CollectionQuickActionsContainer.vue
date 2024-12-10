<script lang="ts" setup>
import AddCollectionIcon from '~/assets/icons/svg/folder-add.svg'

// CONSTANTS
const { t } = useI18n()
</script>

<template>
  <div class="collection-quick-actions-container">
    <LlmLink
      type="buttonPrimary"
      to="/admin/collections/create"
    >
      <AddCollectionIcon size="20px" /> {{ t('collections.buttons.create') }}
    </LlmLink>
  </div>
</template>

<style lang="scss" scoped>
.collection-quick-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5rem;
}
.dark {
  .collection-quick-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
