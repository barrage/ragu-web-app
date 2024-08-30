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
      <button class="toggle-btn" @click="navigationStore.toggleSidebar">
        <Layout />
      </button>
      <div v-if="!navigationStore.isSidebarCollapsed" class="chat">
        <span>{{ $t('newChat') }}</span>
        <span>{{ $t('chatHistory') }}</span>
      </div>
      <div v-else class="chat-icons chat">
        <Add />
      </div>
    </nav>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  grid-area: aside;
  transition: width 0.3s ease;
  overflow: hidden;
  background-color: var(--color-primary-200);
  border: 1px solid var(--color-primary-300);
  border-radius: 12px;
  margin: 6px 16px 16px 16px;
  box-shadow: 0 4px 8px var(--color-primary-300);

  .navigation-container {
    display: flex;
    flex-direction: column;
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
    width: max-content;
    height: fit-content;
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    padding: 0.8rem;
    margin-inline: auto;
    border-radius: 8px;

    &:hover {
      background: var(--color-primary-300);
    }
  }
}
.dark {
  aside {
    background-color: var(--color-primary-800);
    border: 1px solid var(--color-primary-700);
    box-shadow: 0 4px 8px var(--color-primary-700);
  }
  .toggle-btn {
    &:hover {
      background: var(--color-primary-700);
    }
  }
}
.dark {
  aside {
    background-color: var(--color-primary-800);
  }
}
</style>
