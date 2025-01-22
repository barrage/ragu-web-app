<script lang="ts" setup>
// IMPORTS
import PanelIcon from '~/assets/icons/svg/panel.svg'
import QuestionIcon from '~/assets/icons/svg/question.svg'

// CONSTANTS
const navigationStore = useNavigationStore()
const { isSidebarCollapsed } = storeToRefs(navigationStore)
const route = useRoute()
</script>

<template>
  <aside v-motion-slide-left :delay="400">
    <nav class="navigation-container">
      <div class="sidebar-head-section">
        <p v-if="!isSidebarCollapsed" class="typing-effect sidebar-title">
          {{ $t('chatDock') }}
        </p>
        <ElButton class="toggle-btn" @click="navigationStore.toggleSidebar">
          <PanelIcon size="24px" />
        </ElButton>
      </div>

      <div class="horizontal-divider" />

      <ChatsDisplay />

      <LlmTooltip
        :disabled="!isSidebarCollapsed"
        placement="right"
        :content="$t('getHelp.title')"
      >
        <LlmLink
          v-motion-fade-visible-once
          :delay="300"
          to="/help"
          type="link"
          class="menu-item get-help-section"
          :class="{ 'selected': '/help' === route.path, 'collapsed-link': isSidebarCollapsed }"
        >
          <div class="menu-content">
            <QuestionIcon class="sidebar-icon" size="24px" />
            <span v-if="!isSidebarCollapsed" class="get-help-title">{{ $t('getHelp.title') }}</span>
          </div>
        </LlmLink>
      </LlmTooltip>
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

  .horizontal-divider {
    background-color: var(--color-primary-300);
  }

  .navigation-container {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.75rem;
    height: 100%;
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

.menu-item {
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 4px;
  font-size: var(--font-size-desktop-2);
  color: var(--color-primary-800);
  transition:
    background-color 0.2s ease-out,
    color 0.2s ease-out;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  scroll-snap-align: start;
  margin-right: 3px;

  &.selected {
    background: var(--color-primary-300);
    color: var(--color-primary-900);
  }

  &:hover {
    background: var(--color-primary-300);
    color: var(--color-primary-900);
  }

  &:hover .icon-container {
    opacity: 1;
    transform: translateX(6px);
  }
}

.menu-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  gap: 8px;

  .get-help-title {
    white-space: nowrap;
  }

  .sidebar-icon {
    min-width: 24px;
    min-height: 24px;
  }
}

.collapsed-link {
  display: flex;
  justify-content: center;
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
  pointer-events: none;

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

  &:hover {
    background: var(--color-primary-300);
    cursor: pointer;
  }
}

.sidebar-head-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacing-fluid-4-xs);
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

  .menu-item {
    color: var(--color-primary-100);

    &:hover {
      background: var(--color-primary-700);
      color: var(--color-primary-0);
    }
    &.selected {
      background: var(--color-primary-700);
      color: var(--color-primary-0);
    }
  }

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
</style>
