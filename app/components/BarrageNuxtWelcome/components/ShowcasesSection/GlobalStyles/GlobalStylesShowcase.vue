<script lang="ts" setup>
import GridShowcaseSection from './GridShowcaseSection.vue'
import ColorsSection from './ColorsSection.vue'
import TypographySection from './TypographySection.vue'
import SpacingsSection from './SpacingsSection.vue'
import BorderSection from './BorderSection.vue'
import MediaShowcase from './MediaShowcase.vue'

const activeTab = ref('colors') // Default tab

const tabs = [
  { name: 'Colors', value: 'colors' },
  { name: 'Grid', value: 'grid' },
  { name: 'Typography', value: 'typography' },
  { name: 'Spacings', value: 'spacings' },
  { name: 'Border', value: 'border' },
  { name: 'Media', value: 'media' },
]

// Helper function to get the current component based on activeTab
const currentComponent = computed(() => {
  switch (activeTab.value) {
    case 'colors':
      return ColorsSection
    case 'typography':
      return TypographySection
    case 'spacings':
      return SpacingsSection
    case 'border':
      return BorderSection
    case 'media':
      return MediaShowcase
    default:
      return GridShowcaseSection
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
        <transition name="slide-fade">
          <component :is="currentComponent" :key="activeTab" />
        </transition>
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
