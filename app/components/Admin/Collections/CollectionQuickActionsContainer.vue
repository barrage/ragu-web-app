<script lang="ts" setup>
import AddCollectionIcon from '~/assets/icons/svg/folder-add.svg'

const { t } = useI18n()
const localePath = useLocalePath()
</script>

<template>
  <div class="collection-quick-actions-container">
    <ElButton
      type="primary"
      class="create-button"
      @click="navigateTo({ path: localePath('/admin/collections/create') })"
    >
      <AddCollectionIcon /> {{ t('collections.buttons.create') }}
    </ElButton>
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
