<script lang="ts" setup>
import ButtonSection from './ButtonSection.vue'
import ElementPlusSection from './ElementPlusSection.vue'

const activeTab = ref('elPlus') // Default tab

const tabs = [
  { name: 'Element plus', value: 'elPlus' },
  { name: 'Button', value: 'button' },

]

const currentComponent = computed(() => {
  switch (activeTab.value) {
    case 'button':
      return ButtonSection
    case 'elPlus':
      return ElementPlusSection
    default:
      return ElementPlusSection
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
