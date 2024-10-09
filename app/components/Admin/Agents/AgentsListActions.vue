<script lang="ts" setup>
import FilterIcon from '~/assets/icons/svg/filter.svg'

const agentStore = useAgentStore()
</script>

<template>
  <div class="agents-actions-container">
    <div class="agents-actions-wrapper">
      <SearchInput placeholder="Search user" />
      <h6> <b>{{ agentStore?.getMappedAgents?.length || 0 }}</b> agents</h6>
    </div>
    <el-button>
      <FilterIcon />
      Filter
    </el-button>
  </div>
</template>

<style lang="scss" scoped>
.agents-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-inline: 1rem;
  margin-bottom: 1.5rem;

  & h6 {
    color: var(--color-primary-800);
  }
  & .agents-actions-wrapper {
    display: flex;
    gap: 1.5rem;
    align-items: center;
  }
}
.dark {
  .agents-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
