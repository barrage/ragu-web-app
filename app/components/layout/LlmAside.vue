<script lang="ts" setup>
// IMPORTS
import CaretLeft from '~/assets/icons/svg/caret-left.svg'
import CaretRight from '~/assets/icons/svg/caret-right.svg'
import Layout from '~/assets/icons/svg/layout.svg'
import Add from '~/assets/icons/svg/add.svg'

// CONSTANTS
const navigationStore = useNavigationStore()
</script>

<template>
  <aside>
    <nav class="navigation-container">
      <div v-if="!navigationStore.isSidebarCollapsed" class="chat">
        <span>New Chat</span>
        <span>Chat History</span>
      </div>
      <div v-else class="chat-icons chat">
        <Add />
        <Layout />
      </div>

      <button class="toggle-btn" @click="navigationStore.toggleSidebar">
        <CaretLeft v-if="!navigationStore.isSidebarCollapsed" />
        <CaretRight v-if="navigationStore.isSidebarCollapsed " />
      </button>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  grid-area: aside;
  transition: width 0.3s ease;
  overflow: hidden;
  background-color: var(--color-primary-200);

  .navigation-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    position: relative;
    padding: 0.75rem;
    height: 100%;
  }

  .chat {
    display: flex;
    flex-direction: column;
    row-gap: 1.25rem;
    margin-top: 5rem;
  }

  .chat-icons {
    align-items: center;
  }

  .toggle-btn {
    position: absolute;
    width: max-content;
    background-color: var(--color-primary-500);
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.8rem;
    right: -0.8125rem;
    top: 0.625rem;
  }
}
.dark {
  aside {
    background-color: var(--color-primary-800);
  }
}
</style>
