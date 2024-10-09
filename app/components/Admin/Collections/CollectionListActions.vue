<script lang="ts" setup>
import FilterIcon from '~/assets/icons/svg/filter.svg'

const collectiontore = useCollectionsStore()
</script>

<template>
  <div class="collection-actions-container">
    <div class="collection-actions-wrapper">
      <SearchInput placeholder="Search user" />
      <h6> <b>{{ collectiontore?.collectionResponse?.items?.length || 0 }}</b> collection</h6>
    </div>
    <el-button>
      <FilterIcon />
      Filter
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
