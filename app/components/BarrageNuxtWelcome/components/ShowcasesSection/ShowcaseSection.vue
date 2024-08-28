<script lang="ts" setup>
import ComposablesShowcase from './LogicExample/LogicShowcase.vue'
import ComponentLibraryShowcase from './ComponentLibrary/ComponentLibraryShowcase.vue'
import GlobalStylesShowcase from './GlobalStyles/GlobalStylesShowcase.vue'
import LayoutsShowcase from './LayoutsExample/LayoutsShowcase.vue'

const activeMainTab = ref('global-styles')

const mainTabs = [
  { name: 'Global styles', value: 'global-styles' },
  { name: 'Layouts', value: 'layouts' },
  { name: 'Logic', value: 'composables' },
  { name: 'Component Library', value: 'component-library' },

]

const currentComponent = computed(() => {
  switch (activeMainTab.value) {
    case 'global-styles':
      return GlobalStylesShowcase
    case 'composables':
      return ComposablesShowcase
    case 'layouts':
      return LayoutsShowcase
    case 'component-library':
      return ComponentLibraryShowcase
    default:
      return GlobalStylesShowcase
  }
})
</script>

<template>
  <section class="showcases-section">
    <h4>Showcases</h4>
    <section>
      <div class="tabs">
        <button
          v-for="tab in mainTabs"
          :key="tab.value"
          :class="{ active: activeMainTab === tab.value }"
          class="tab-button"
          @click="activeMainTab = tab.value"
        >
          <h6>
            {{ tab.name }}
          </h6>
        </button>
      </div>

      <div class="content">
        <component :is="currentComponent" :key="activeMainTab" />
      </div>
    </section>
  </section>
</template>

<style lang="scss" scoped>
.showcases-section {
  display: flex;
  flex-direction: column;
  gap: 22px;
}
.tabs {
  display: flex;
  overflow: scroll;

  .tab-button {
    flex: 1 0 calc(25%);
    background: none;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 1rem;
    font-weight: bold;
    border: 1px solid var(--color-gray-300);

    transition: all 0.3s;
    & h6 {
      color: var(--color-gray-500);
    }
    &.active {
      border-top: 3px solid #1dd27e;
      border-bottom: 0px;
      border-bottom-right-radius: -10px;
      background: var(--color-gray-50);
      & h6 {
        color: var(--color-gray-700);
        font-weight: 600;
      }
    }

    &:hover {
      background: var(--color-gray-50);
      &:not(.active) {
        border-top: 2px solid var(--color-green-200);
      }
    }
  }
}

.dark {
  .tab-button {
    border: 1px solid var(--color-gray-700);
    & h6 {
      color: var(--color-gray-300);
    }
    &:hover {
      &:not(.active) {
        border-top: 2px solid var(--color-green-800);
      }
    }
    &.active {
      background: var(--color-gray-800);
      & h6 {
        color: var(--color-gray-100);
      }
    }

    &:hover {
      background: var(--color-gray-800);

      & .widget-link {
        color: var(--color-green-300);
        border-color: var(--color-green-300);
      }
    }
  }

  & .content {
    background: var(--color-gray-800);
    border: 1px solid var(--color-gray-700);
    border-top: 0px;
  }
}

.content {
  padding: 20px;
  border: 1px solid var(--color-gray-300);
  border-top: 0px;
  position: relative;
  overflow: hidden;
  background: var(--color-gray-50);
}
</style>
