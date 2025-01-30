<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'
import type { User } from '~/types/users'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'
import WhatsAppIcon from '~/assets/icons/svg/whatsapp-chat-multiple.svg'
import type { TabOption } from '~/types/tab'

defineProps<{
  user: User | null
}>()

const emits = defineEmits<{
  (event: 'userDeleted'): void
  (event: 'userEdited'): void
  (event: 'userDeactivated'): void
  (event: 'userActivated'): void
}>()

const { t } = useI18n()
const { isWhatsAppActive } = storeToRefs(useWhatsAppStore())

const tabOptions = computed((): TabOption[] => {
  return [
    {
      show: true,
      name: 'details',
      label: t('details'),
      icon: PersonInfoIcon,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/Users/Details/UserDetailsInformationsSection.vue'),
      ),
    },
    {
      show: true,
      name: 'userChats',
      label: t('chat.admin.title'),
      icon: ChatIcon,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/Users/Details/UserChats.vue'),
      ),
    },
    {
      show: isWhatsAppActive.value,
      name: 'whatsAppNumbers',
      label: 'WhatsApp',
      icon: WhatsAppIcon,
      component: defineAsyncComponent(() =>
        import('~/components/Backoffice/Users/Details/UserWhatsAppNumbersSection.vue'),
      ),
    },
  ]
})
const { activeTab } = useTabQuery(
  'details',
  tabOptions.value
    .filter(tab => tab.show)
    .map(tab => tab.name),
)
</script>

<template>
  <div class="user-details-wrapper">
    <UserDetailsHeroSection
      :user="user"
      @user-deleted="(emits('userDeleted'))"
      @user-edited="(emits('userEdited'))"
      @user-activated="(emits('userDeactivated'))"
      @user-deactivated="(emits('userActivated'))"
    />

    <ElTabs
      v-model="activeTab"
      class="user-details-tabs"
      data-testid="bo-user-details-tabs"
    >
      <template v-for="tab in tabOptions" :key="tab.name">
        <ElTabPane
          v-if="tab.show"
          :label="tab.label"
          :name="tab.name"
        >
          <template #label>
            <div class="custom-tab-label-wrapper">
              <component :is="tab.icon" size="22px" />
              <span>{{ tab.label }}</span>
            </div>
          </template>
          <div>
            <component
              :is="tab.component"
              v-if="activeTab === tab.name"
              v-motion-slide-bottom
              :user="user"
              :duration="400"
            />
          </div>
        </ElTabPane>
      </template>
    </ElTabs>
  </div>
</template>

<style lang="scss" scoped>
.users-list-container {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.user-details-tabs {
  margin-top: var(--spacing-fluid-xs);

  & .custom-tab-label-wrapper {
    display: flex;
    align-items: center;
    gap: var(--spacing-fluid-5-xs);
  }
}
</style>
