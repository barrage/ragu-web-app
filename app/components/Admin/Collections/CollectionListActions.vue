<script lang="ts" setup>
import FilterIcon from '~/assets/icons/svg/filter.svg'

// CONSTANTS
const collectiontore = useCollectionsStore()
const { t } = useI18n()
</script>

<template>
  <div class="collection-actions-container">
    <div class="collection-actions-wrapper">
      <SearchInput :placeholder="t('collections.placeholders.search')" />
      <h6> <b>{{ collectiontore?.collectionResponse?.items?.length || 0 }}</b> {{ t('collections.title') }}</h6>
    </div>
    <el-button>
      <FilterIcon />
      {{ t('collections.buttons.filter') }}
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.collection-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  margin-bottom: 1.5rem;

  & h6 {
    color: var(--color-primary-800);
  }
  & .collection-actions-wrapper {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
}
.dark {
  .collection-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
