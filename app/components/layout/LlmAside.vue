<script lang="ts" setup>
// IMPORTS
import PanelIcon from '~/assets/icons/svg/panel.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import QuestionIcon from '~/assets/icons/svg/question.svg'

// CONSTANTS
const navigationStore = useNavigationStore()
const route = useRoute()
</script>

<template>
  <aside>
    <nav class="navigation-container">
      <div class="sidebar-head-section">
        <p v-if="!navigationStore.isSidebarCollapsed" class="typing-effect">
          {{ $t('chatDock') }}
        </p>
        <ElTooltip
          content="Toggle sidebar"
          :show-after="700"
          :enterable="false"
          placement="right"
        >
          <el-button class="toggle-btn" @click="navigationStore.toggleSidebar">
            <PanelIcon size="24px" />
          </el-button>
        </ElTooltip>
      </div>
      <div class="horizontal-divider" />
      <ElTooltip
        content="Pokreni novi chat"
        :show-after="1500"
        :enterable="false"
        placement="right"
      >
        <LlmLink
          to="/"
          type="link"
          class="new-chat"
          :class="{ opened: !navigationStore.isSidebarCollapsed, selected: route.path === '/' }"
        >
          <BrainIcon size="24px" />  <span v-if="!navigationStore.isSidebarCollapsed">{{ $t('chat.newChat.title') }}</span> <AddIcon
            v-if="!navigationStore.isSidebarCollapsed"
            size="24px"
            class="add-icon"
          />
        </LlmLink>
      </ElTooltip>

      <ChatsDisplay v-if="!navigationStore.isSidebarCollapsed" />
      <div class="get-help-section">
        <LlmLink
          to="/login"
          type="link"
          class="gel-help-content"
        >
          <span v-if="!navigationStore.isSidebarCollapsed">{{ $t('getHelp.title') }}</span> <QuestionIcon size="24px" />
        </LlmLink>
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

  & .new-chat {
    margin-inline: auto;
    height: 3rem;
    transition: all 0.2s ease-out;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--color-primary-900);
    text-wrap: nowrap;
    width: 100%;
    margin-top: 1rem;
    padding-inline: 0.25rem;
    padding-top: 8px;
    padding-bottom: 8px;
    border-radius: 8px;
    background-color: transparent;
    font-size: var(--font-size-fluid-3);

    &.selected {
      background: var(--color-primary-300);
      color: var(--color-primary-900);
    }

    &:hover {
      background: var(--color-primary-300);
    }
    &.opened {
      justify-content: flex-start;

      &:hover {
        & .add-icon {
          opacity: 1;
          transform: translateX(-5px);
        }
      }
    }

    &:deep(.llm-link--template) {
      width: 100%;
    }
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
  }
  .toggle-btn {
    color: var(--color-primary-100);
    &:hover {
      background: var(--color-primary-700);
    }
  }
  .new-chat {
    color: var(--color-primary-100);
    &.selected {
      background: var(--color-primary-700);
      color: var(--color-primary-0);
    }
    &.opened {
      color: var(--color-primary-100);
    }

    &:hover {
      background: var(--color-primary-700);
    }
  }
  & .typing-effect {
    color: var(--color-primary-200);
  }
}

/* == */
.typing-effect {
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid black;
  display: inline-block;
  font-family: 'Roboto', sans-serif;
  max-width: max-content;
  color: var(--color-primary-800);
  font-weight: 600;
  animation:
    typing 1.5s steps(30, end) forwards,
    blink 0.75s step-end infinite;
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
.add-icon {
  opacity: 0;
  margin-left: auto;
  transition: all 0.3s ease;
  transform: translateX(5px);
}

@keyframes typing {
  from {
    width: 0;
  }
  to {
    width: 100%;
    border: none;
  }
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
