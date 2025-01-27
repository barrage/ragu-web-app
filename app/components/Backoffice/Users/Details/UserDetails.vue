<script lang="ts" setup>
import type { TabsPaneContext } from 'element-plus'
import type { User } from '~/types/users'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'
import WhatsAppIcon from '~/assets/icons/svg/whatsapp-chat-multiple.svg'

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

const activeTab = ref('details')

const handleTabClick = (tab: TabsPaneContext, event: Event) => {
  console.warn(tab, event)
}
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

    <el-tabs
      v-model="activeTab"
      class="user-details-tabs"
      data-testid="bo-user-details-tabs"
      @tab-click="handleTabClick"
    >
      <el-tab-pane :label="t('details')" name="details">
        <template #label>
          <div class="custom-tab-label-wrapper">
            <PersonInfoIcon size="22px" />
            <span>{{ $t('details') }}</span>
          </div>
        </template>
        <template v-if="activeTab === 'details'">
          <UserDetailsInformationsSection :user="user" />
        </template>
      </el-tab-pane>
      <el-tab-pane :label="t('chat.admin.title')" name="userChats">
        <template #label>
          <div class="custom-tab-label-wrapper">
            <ChatIcon size="22px" />
            <span>{{ $t('chat.admin.title') }}</span>
          </div>
        </template>
        <template v-if="activeTab === 'userChats'" />
        <UserChats :user="user" />
      </el-tab-pane>
      <el-tab-pane
        v-if="isWhatsAppActive"
        label="WhatsApp"
        name="whatsAppNumbers"
      >
        <template #label>
          <div class="custom-tab-label-wrapper">
            <WhatsAppIcon size="22px" />
            <span> WhatsApp</span>
          </div>
        </template>
        <template v-if="activeTab === 'whatsAppNumbers'">
          <UserWhatsAppNumbersSection :user="user" />
        </template>
      </el-tab-pane>
    </el-tabs>
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
