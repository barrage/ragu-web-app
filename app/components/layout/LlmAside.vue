<script lang="ts" setup>
// IMPORTS
import PanelIcon from '~/assets/icons/svg/panel.svg'
import QuestionIcon from '~/assets/icons/svg/question.svg'

// CONSTANTS
const navigationStore = useNavigationStore()
const { isSidebarCollapsed } = storeToRefs(navigationStore)
</script>

<template>
  <aside>
    <nav class="navigation-container">
      <div class="sidebar-head-section">
        <p v-if="!isSidebarCollapsed" class="typing-effect sidebar-title">
          {{ $t('chatDock') }}
        </p>
        <ElTooltip
          :content="$t('chat.toggle_sidebar')"
          :show-after="1500"
          :hide-after="0"
          :disabled="!isSidebarCollapsed"
          :enterable="false"
          placement="right"
        >
          <ElButton class="toggle-btn" @click="navigationStore.toggleSidebar">
            <PanelIcon size="24px" />
          </ElButton>
        </ElTooltip>
      </div>

      <div class="horizontal-divider" />

      <ChatsDisplay />
      <div class="get-help-section">
        <ElTooltip
          :content="$t('getHelp.title')"
          :show-after="1500"
          :hide-after="0"
          :disabled="!isSidebarCollapsed"
          :enterable="false"
          placement="right"
        >
          <LlmLink
            to="/login"
            type="link"
            class="gel-help-content"
          >
            <span v-if="!isSidebarCollapsed">{{ $t('getHelp.title') }}</span> <QuestionIcon size="24px" />
          </LlmLink>
        </ElTooltip>
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
  border: 0.0625rem solid var(--color-primary-300);
  border-radius: 0.75rem;
  margin: 1.25rem 1rem 1rem 1rem;
  box-shadow: 0 0.25rem 0.5rem var(--color-primary-300);
  color: var(--color-primary-900);

  .sidebar-title {
    color: var(--color-primary-900);
  }

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
    cursor: pointer;
    padding: 4px 10px;
    margin-left: auto;
    border-radius: 8px;
    color: var(--color-primary-900);
    transition: all 0.3s ease-in;

    &:hover {
      background: var(--color-primary-300);
    }
  }
}

.sidebar-collapsed {
  & .toggle-btn {
    transform: scaleX(-1);
  }
}
.dark {
  aside {
    background-color: var(--color-primary-800);
    border: 1px solid var(--color-primary-700);
    box-shadow: 0 4px 8px var(--color-primary-700);
    color: var(--color-primary-100);

    .sidebar-title {
      color: var(--color-primary-100);
    }
  }
  .toggle-btn {
    color: var(--color-primary-100);
    &:hover {
      background: var(--color-primary-700);
    }
  }
}

.history {
  margin-top: 1.25rem;
  font-size: var(--font-size-fluid-2);
}
.sidebar-head-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacing-fluid-4-xs);
}

.dark {
  .get-help-section {
    &:hover {
      background: var(--color-primary-700);
    }
    &::before {
      background: linear-gradient(
        to bottom,
        transparent,
        var(--color-primary-800)
      );
    }
  }
}

.get-help-section {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  border-radius: 8px;
  position: relative;

  &::before {
    content: '';
    height: 3rem;
    width: 100%;
    position: absolute;
    top: -3rem;
    background: linear-gradient(
      to bottom,
      transparent,
      var(--color-primary-200)
    );
    pointer-events: none;
  }

  & .gel-help-content {
    display: flex;
    align-items: center;
    gap: 8px;
    justify-content: center;
    height: 2.5rem;
    text-wrap: wrap;
  }

  &:hover {
    background: var(--color-primary-300);
    cursor: pointer;
  }
}
</style>
