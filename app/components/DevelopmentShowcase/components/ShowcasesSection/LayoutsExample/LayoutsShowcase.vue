<script lang="ts" setup>
import { ref } from 'vue'

type TabValue = 'default' | 'header-main' | 'header-main-footer' | 'header-aside-main' | 'aside-main' | 'header-aside-main-footer'

const activeTab = ref<TabValue>('header-main')

const tabs = [
  { name: 'Default', value: 'default' as TabValue },
  { name: 'Header Main', value: 'header-main' as TabValue },
  { name: 'Header Main Footer', value: 'header-main-footer' as TabValue },
  { name: 'Aside Main', value: 'aside-main' as TabValue },
  { name: 'Header Aside Main', value: 'header-aside-main' as TabValue },
  { name: 'Header Aside Main Footer', value: 'header-aside-main-footer' as TabValue },
]

const changeTab = (value: TabValue) => {
  activeTab.value = value
}

const changeLayout = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
  setPageLayout(activeTab.value)
}
</script>

<template>
  <section>
    <div class="tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        :class="{ active: activeTab === tab.value }"
        class="tab-button"
        @click="changeTab(tab.value)"
      >
        {{ tab.name }}
      </button>
    </div>

    <div class="content">
      <div v-if="activeTab === 'default'" class="example-default">
        <h6>Main</h6>
      </div>
      <div v-if="activeTab === 'header-main'" class="example-header-main">
        <header class="example-header">
          Header
        </header>
        <main class="example-main">
          Main
        </main>
      </div>
      <div v-if="activeTab === 'header-main-footer'" class="example-header-main-footer">
        <header class="example-header">
          Header
        </header>
        <main class="example-main">
          Main
        </main>
        <footer class="example-footer">
          Footer
        </footer>
      </div>
      <div v-if="activeTab === 'aside-main'" class="example-aside-main">
        <aside class="example-aside">
          Aside
        </aside>
        <main class="example-main">
          Main
        </main>
      </div>
      <div v-if="activeTab === 'header-aside-main'" class="example-header-aside-main">
        <header class="example-header">
          Header
        </header>
        <div class="content-row">
          <aside class="example-aside">
            Aside
          </aside>
          <main class="example-main">
            Main
          </main>
        </div>
      </div>
      <div v-if="activeTab === 'header-aside-main-footer'" class="example-header-aside-main-footer">
        <header class="example-header">
          Header
        </header>
        <div class="content-row">
          <aside class="example-aside">
            Aside
          </aside>
          <main class="example-main">
            Main
          </main>
        </div>
        <footer class="example-footer">
          Footer
        </footer>
      </div>

      <el-button class="change-layout-button" @click="changeLayout">
        Select
      </el-button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.tabs {
  display: flex;
  border-bottom: 2px solid var(--color-green-500);
  margin: 20px 0px 20px;
  overflow-x: auto;

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
  display: flex;
  flex-direction: column;
  gap: 32px;
}

.example-default {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  background-color: var(--color-gray-50);
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
}

.example-header-main,
.example-header-main-footer,
.example-aside-main,
.example-header-aside-main,
.example-header-aside-main-footer {
  border: 1px solid var(--color-gray-300);
  border-radius: 8px;
  overflow: hidden;
}

.example-aside-main {
  display: flex;
}

.example-header {
  background-color: var(--color-gray-100);
  padding: 10px;
  text-align: center;
}

.example-footer {
  background-color: var(--color-gray-100);
  padding: 10px;
  text-align: center;
}

.example-main {
  background-color: var(--color-gray-50);
  padding: 20px;
  flex: 1;
  min-height: 200px;
}

.example-aside {
  background-color: var(--color-gray-200);
  padding: 20px;
  flex: 0 0 200px;
}

.content-row {
  display: flex;
}

.dark {
  & .change-layout-button {
    color: var(--color-gray-300);
    &:hover {
      background: var(--color-gray-700);
      color: var(--color-gray-100);
    }
  }
  .example-header {
    background: var(--color-gray-800);
  }
  .example-main {
    background: var(--color-gray-500);
  }
  .example-aside {
    background: var(--color-gray-700);
  }
  .example-footer {
    background: var(--color-gray-600);
  }
  .example-default {
    background: var(--color-gray-500);
  }
}
</style>
