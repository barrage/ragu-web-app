<script lang="ts" setup>
import PanelIcon from '~/assets/icons/svg/panel.svg'
import DashboardIcon from '~/assets/icons/svg/dashboard-icon.svg'
import QuestionIcon from '~/assets/icons/svg/question.svg'
import TeamIcon from '~/assets/icons/svg/team.svg'
import ChatsIcon from '~/assets/icons/svg/chat-multiple.svg'
import AgentsIcon from '~/assets/icons/svg/agents.svg'
import DocumentIcon from '~/assets/icons/svg/document.svg'
import CollectionIcon from '~/assets/icons/svg/folder-multiple.svg'

interface MenuItem {
  label: string
  link: string
  icon: string
}
const navigationStore = useNavigationStore()
interface MenuCategory {
  title: string
  category: 'menu' | 'options'
  items: MenuItem[]
}

const route = useRoute()
const { t } = useI18n()
const menuList = computed<MenuCategory[]>(() => ([
  {
    title: '',
    category: 'menu',
    items: [
      {
        label: t('dashboard.title'),
        link: '/admin',
        icon: DashboardIcon,
      },
      {
        label: t('users.title'),
        link: '/admin/users',
        icon: TeamIcon,
      },
      {
        label: t('chat.admin.title'),
        link: '/admin/chats',
        icon: ChatsIcon,
      },
      {
        label: t('agents.title'),
        link: '/admin/agents',
        icon: AgentsIcon,
      },
      {
        label: t('documents.title'),
        link: '/admin/documents',
        icon: DocumentIcon,
      },
      {
        label: t('collections.title'),
        link: '/admin/collections',
        icon: CollectionIcon,
      },
    ],
  },
]))

const selectedFeature = ref<{ label: string, category: 'menu' | 'options' } | null>(null)

const selectFeature = (feature: MenuItem, category: 'menu' | 'options') => {
  selectedFeature.value = { ...feature, category }
}
</script>

<template>
  <aside>
    <nav class="navigation-container">
      <div class="sidebar-head-title">
        <p v-if="!navigationStore.isAdminSidebarCollapsed" class="typing-effect">
          {{ t('adminPanel') }}
        </p>
        <el-button class="toggle-btn" @click="navigationStore.toggleAdminSidebar">
          <PanelIcon size="24px" />
        </el-button>
      </div>
      <div class="horizontal-divider" />

      <div class="feature-container scrollable-element">
        <div v-for="menuItem in menuList" :key="menuItem.category">
          <p v-if="menuItem.title" class="feature-group-title">
            {{ menuItem.title }}
          </p>
          <div class="feature-list">
            <LlmLink
              v-for="(item, index2) in menuItem.items"
              :key="index2"
              :to="item.link"
              class="feature-item"
              :class="{ selected: item.link === route.path }"
              @click="selectFeature(item, menuItem.category)"
            >
              <div class="item-content">
                <component :is="item.icon" size="20px" />
                <p v-if="!navigationStore.isAdminSidebarCollapsed" class="item-title">
                  {{ item.label }}
                </p>
              </div>
            </LlmLink>
          </div>
        </div>
      </div>

      <!-- Get Help Section -->
      <div class="get-help-section">
        <LlmLink
          to="/login"
          type="link"
          class="gel-help-content"
        >
          <span v-if="!navigationStore.isAdminSidebarCollapsed">{{ t('getHelp.title') }} </span> <QuestionIcon size="24px" />
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
.feature-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 0.5rem;
}

.sidebar-collapsed {
  & .toggle-btn {
    transform: scaleX(-1);
  }
}

.feature-item {
  display: flex;
  align-items: center;
  padding: 4px 10px;
  min-height: 40px;
  transition:
    background-color 0.2s ease-out,
    color 0.2s ease-out;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  opacity: 0.8;

  cursor: pointer;
  &.selected {
    background: var(--color-primary-300);
    color: var(--color-primary-900);
    opacity: 1;
    transition: opacity 0.5s ease-in-out;
  }

  &:hover {
    background: var(--color-primary-300);
    color: var(--color-primary-900);
  }
}

.item-content {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  position: relative;
}

.item-title {
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  font-size: var(--font-size-desktop-2);
  color: var(--color-primary-800);
  transition: color 0.3s ease;
}

.typing-effect {
  white-space: nowrap;
  overflow: hidden;
  border-right: 2px solid black;
  display: inline-block;
  max-width: max-content;
  color: var(--color-primary-800);
  font-weight: bold;
  animation:
    typing 1.5s steps(30, end) forwards,
    blink 0.75s step-end infinite;
}

.sidebar-head-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacing-fluid-4-xs);
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

.feature-container {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  overflow-y: auto;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding-bottom: 1rem;
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
    text-wrap: nowrap;
  }

  &:hover {
    background: var(--color-primary-300);
    cursor: pointer;
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
  .feature-item {
    color: var(--color-primary-100);

    &:hover {
      background: var(--color-primary-700);
      color: var(--color-primary-0);
    }
    &.selected {
      background: var(--color-primary-700);
      color: var(--color-primary-0);
      .chat-title::after {
        background: linear-gradient(
          to left,
          var(--color-primary-700),
          transparent
        );
      }
    }
  }

  .feature-group-title {
    color: var(--color-primary-200);
  }
  .item-title::after {
    background: linear-gradient(to left, var(--color-primary-800), transparent);
  }

  .item-title {
    color: var(--color-primary-100);
  }

  .typing-effect {
    color: var(--color-primary-200);
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

.feature-group-title {
  color: var(--color-primary-800);
  font-weight: 700;
  font-size: var(--font-size-desktop-1);
  padding: 12px 0px 8px 0px;
}
.dark {
  & .feature-group-title {
    color: var(--color-primary-200);
  }
}
</style>
