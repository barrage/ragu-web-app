<script lang="ts" setup>
import PanelIcon from '~/assets/icons/svg/panel.svg'
import DashboardIcon from '~/assets/icons/svg/dashboard-icon.svg'
import QuestionIcon from '~/assets/icons/svg/question.svg'
import TeamIcon from '~/assets/icons/svg/team.svg'
import ChatsIcon from '~/assets/icons/svg/chat-multiple.svg'
import AgentsIcon from '~/assets/icons/svg/agents.svg'
import WhatsAppAgentsIcon from '~/assets/icons/svg/whatsapp-agents.svg'
import DocumentIcon from '~/assets/icons/svg/document.svg'
import CollectionIcon from '~/assets/icons/svg/folder-multiple.svg'
import WhatsAppIcon from '~/assets/icons/svg/whatsapp-chat-multiple.svg'

interface MenuItem {
  label: string
  link: string
  icon: string
}
interface MenuList {
  name: string
  show: boolean
  list: MenuItem[]
}
const navigationStore = useNavigationStore()
const { isAdminSidebarCollapsed } = storeToRefs(navigationStore)
const { isWhatsAppActive } = storeToRefs(useWhatsAppStore())
const route = useRoute()
const { t } = useI18n()

const menuLists = computed<MenuList[]>(() => {
  return [
    {
      name: 'main',
      show: true,
      list: [
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
    {
      name: 'whatsApp',
      show: isWhatsAppActive.value,
      list: [
        {
          label: t('whatsapp_chat.admin.title'),
          link: '/admin/whatsapp-chats',
          icon: WhatsAppIcon,
        },
        {
          label: t('whatsapp_agents.title'),
          link: '/admin/whatsapp-agents',
          icon: WhatsAppAgentsIcon,
        },
      ],
    },
  ]
})
</script>

<template>
  <aside v-motion-slide-left :delay="400">
    <nav
      class="navigation-container"
      :class="{ 'collapsed-sidebar': isAdminSidebarCollapsed }"
    >
      <div class="sidebar-head-section">
        <p v-if="!isAdminSidebarCollapsed" class="typing-effect sidebar-title">
          {{ $t('adminPanel') }}
        </p>
        <ElButton class="toggle-btn" @click="navigationStore.toggleAdminSidebar">
          <PanelIcon size="24px" />
        </ElButton>
      </div>

      <div class="horizontal-divider" />

      <div class="scrollable-container">
        <div
          v-for="(list, listIndex) in menuLists"
          :key="list.name"
          class="menu-list"
        >
          <template v-if="list.show">
            <div v-if="listIndex" class="horizontal-divider list" />
            <LlmTooltip
              v-for="item in list.list"
              :key="item.link"
              :content="item.label"
              :disabled="!isAdminSidebarCollapsed"
              placement="right"
            >
              <LlmLink
                v-motion-fade-visible-once
                :delay="300"
                :to="item.link"
                type="link"
                class="menu-item"
                :class="{ 'selected': item.link === route.path, 'collapsed-link': isAdminSidebarCollapsed }"
              >
                <div class="menu-content">
                  <span>
                    <component :is="item.icon" size="24px" />
                  </span>
                  <span v-if="!isAdminSidebarCollapsed" class="no-wrap">{{ item.label }}</span>
                </div>
              </LlmLink>
            </LlmTooltip>
          </template>
        </div>
      </div>

      <LlmTooltip
        :disabled="!isAdminSidebarCollapsed"
        placement="right"
        :content="$t('getHelp.title')"
      >
        <LlmLink
          v-motion-fade-visible-once
          :delay="300"
          to="help"
          type="link"
          class="menu-item get-help-section"
          :class="{ 'selected': '/help' === route.path, 'collapsed-link': isAdminSidebarCollapsed }"
        >
          <div class="menu-content">
            <span>
              <QuestionIcon size="24px" />
            </span>
            <span v-if="!isAdminSidebarCollapsed" class="no-wrap">{{ $t('getHelp.title') }}</span>
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
    &.list {
      margin-top: 12px;
    }
  }

  .navigation-container {
    display: flex;
    flex-direction: column;
    position: relative;
    padding: 0.75rem;
    height: 100%;

    .no-wrap {
      white-space: nowrap;
    }
  }
}

.sidebar-head-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: var(--spacing-fluid-4-xs);
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

.sidebar-collapsed {
  & .toggle-btn {
    transform: scaleX(-1);
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

  &:hover {
    background: var(--color-primary-300);
    cursor: pointer;
  }
}

.scrollable-container {
  display: flex;
  flex-direction: column;
  max-height: 100%;
  margin-top: 1rem;
  margin-bottom: 0.5rem;
  padding-bottom: 1rem;
  scroll-behavior: smooth;
  scroll-snap-type: y mandatory;
  -webkit-overflow-scrolling: touch;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: var(--color-primary-500) var(--color-primary-200);

  &.collapsed-sidebar {
    &::-webkit-scrollbar {
      width: 1px;
    }
  }
}

.menu-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.menu-item {
  display: flex;
  align-items: center;
  min-height: 40px;
  padding: 4px;
  padding-inline-start: 8px;
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
}
.menu-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  position: relative;
  gap: 8px;
}

.collapsed-link {
  display: flex;
  justify-content: center;
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
}
</style>
