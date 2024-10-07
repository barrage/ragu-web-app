<script lang="ts" setup>
import DefaultComposables from './DefaultComposables.vue'
import DefaultUtilsShowcase from './DefaultUtilsShowcase.vue'
import DefaulyApi from './DefaultApi.vue'
import StateManagement from './StateManagement.vue'
import Testing from './Testing.vue'

const activeTab = ref('vueUse') // Default tab

const tabs = [
  { name: 'Composables', value: 'vueUse' },
  { name: 'Utils', value: 'defaultUtils' },
  { name: 'API', value: 'api' },
  { name: 'State Management', value: 'stateManagement' },
  { name: 'Testing', value: 'testing' },
]

const currentComponent = computed(() => {
  switch (activeTab.value) {
    case 'vueUse':
      return DefaultComposables
    case 'defaultUtils':
      return DefaultUtilsShowcase
    case 'api':
      return DefaulyApi
    case 'stateManagement':
      return StateManagement
    case 'testing':
      return Testing

    default:
      return DefaultComposables
  }
})
</script>

<template>
  <div>
    <section>
      <div class="tabs">
        <button
          v-for="tab in tabs"
          :key="tab.value"
          :class="{ active: activeTab === tab.value }"
          class="tab-button"
          @click="activeTab = tab.value"
        >
          {{ tab.name }}
        </button>
      </div>

      <div class="content">
        <component :is="currentComponent" :key="activeTab" />
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.tabs {
  display: flex;
  border-bottom: 2px solid var(--color-green-500);
  margin: 20px 0px 20px;

  .tab-button {
    background: none;
    border: none;
    padding: 10px 20px;
    margin-right: 10px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    color: var(--color-gray-600);
    transition:
      background-color 0.3s,
      color 0.3s;

    &.active {
      color: var(--color-green-500);
      border-bottom: 2px solid var(--color-green-500);
    }

    &:hover {
    }
  }
}
.dark {
  & .tabs {
    border-bottom: 2px solid #1dd27e;
  }
  & .tab-button {
    color: var(--color-gray-200);
    &.active {
      color: #1dd27e;
      border-bottom: 2px solid #1dd27e;
    }
  }
}

.content {
  padding: 20px;
  position: relative;
  overflow: hidden;
  min-height: 50vh;
}
</style>
