<script lang="ts" setup>
import FilterIcon from '~/assets/icons/svg/filter.svg'

const documentStore = useDocumentsStore()
</script>

<template>
  <div class="documents-actions-container">
    <div class="documents-actions-wrapper">
      <SearchInput placeholder="Search user" />
      <h6> <b>{{ documentStore?.documentResponse?.items?.length || 0 }}</b> documents</h6>
    </div>
    <el-button>
      <FilterIcon />
      Filter
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.documents-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  margin-bottom: 1.5rem;

  & h6 {
    color: var(--color-primary-800);
  }
  & .documents-actions-wrapper {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
}
.dark {
  .documents-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
