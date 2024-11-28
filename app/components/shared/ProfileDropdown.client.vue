<script lang="ts" setup>
// IMPORTS
import AdminIcon from '~/assets/icons/svg/admin.svg'
import ProfileIcon from '~/assets/icons/svg/account.svg'
import LogoutIcon from '~/assets/icons/svg/logout.svg'
import ChatAgentIcon from '~/assets/icons/svg/chat-agent.svg'
import SupportIcon from '~/assets/icons/svg/support.svg'
import SettingsIcon from '~/assets/icons/svg/settings.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
// STATE
const router = useRouter()
const oAuthStore = useAuthStore()
const { t } = useI18n()

/* Agent */
const isAgentsModalVisible = ref(false)
const openAgentsModal = () => {
  isAgentsModalVisible.value = true
}
/* Sign OUT */
const isSignOutModalVisible = ref(false)
const openSignOutModal = () => {
  isSignOutModalVisible.value = true
}
// Profile
const isProfileModelVisible = ref(false)
const openProfileModal = () => {
  isProfileModelVisible.value = true
}

const { execute, error } = await useAsyncData(() => oAuthStore.POST_Logout(), {
  immediate: false,
})

// Helpers
async function handleSignOut() {
  await execute()
  isSignOutModalVisible.value = false

  if (error.value) {
    console.error('Logout failed:', error)
    ElNotification({
      title: t('logout.error_title'),
      message: t('logout.error_description'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
  else {
    router.push('/login')
  }
}

const popperOptions = {
  placement: 'bottom-end',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 6],
      },
    },
    {
      name: 'flip',
      options: {
        fallbackPlacements: ['top-start'],
      },
    },
  ],
}

const user = computed(() => {
  return {
    fullname: oAuthStore.user?.fullName,
    email: oAuthStore.user?.email,
  }
})

const isAdminRoute = computed(() => router.currentRoute.value.path.includes('/admin'))

const switchRole = () => {
  const currentPath = router.currentRoute.value.path
  if (currentPath.includes('/admin')) {
    router.push('/')
  }
  else {
    router.push('/admin')
  }
}
</script>

<template>
  <el-dropdown trigger="hover" :popper-options="popperOptions">
    <el-button class="profile-toggle-button" size="small">
      <ProfileIcon size="36px" />
    </el-button>
    <template #dropdown>
      <el-dropdown-menu class="dropdown-menu">
        <div class="user-profile-item">
          <ProfileIcon size="42px" />
          <div class="username-mail-wrapper">
            <p class="username">
              {{ user.fullname }}
            </p>
            <span class="user-mail">{{ user.email }}</span>
          </div>
        </div>
        <template v-if="oAuthStore.selectedRole === 'admin'">
          <div class="horizontal-divider" />
          <el-dropdown-item @click="switchRole">
            <div class="dropdown-item">
              <AdminIcon size="20px" /> <p>  {{ isAdminRoute ? t('profileDropdown.switchToUser') : t('profileDropdown.switchToAdmin') }}</p>
            </div>
          </el-dropdown-item>
        </template>

        <div class="horizontal-divider" />
        <el-dropdown-item @click="openProfileModal">
          <div class="dropdown-item">
            <ProfileIcon size="20px" /> <p> {{ t('profileDropdown.profile') }}</p>
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div class="dropdown-item">
            <SettingsIcon size="20px" /> <p>{{ t('profileDropdown.settings') }}</p>
          </div>
        </el-dropdown-item>
        <div class="horizontal-divider" />
        <el-dropdown-item @click="openAgentsModal">
          <div class="dropdown-item">
            <ChatAgentIcon size="20px" />  <p>{{ t('profileDropdown.agents') }}</p>
          </div>
        </el-dropdown-item>
        <el-dropdown-item disabled>
          <div class="dropdown-item">
            <SupportIcon size="20px" /> <p>{{ t('profileDropdown.support') }}</p>
          </div>
        </el-dropdown-item>
        <div class="horizontal-divider" />
        <el-dropdown-item @click=" openSignOutModal">
          <div class="dropdown-item">
            <LogoutIcon size="20px" /> <p>{{ t('profileDropdown.signOut') }}</p>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <ElDialog
    v-model="isAgentsModalVisible"
    align-center
    class="barrage-dialog--large"
    :close-icon="CloseCircleIcon"
  >
    <template #header>
      <h5>{{ t('profileDropdown.agents') }}</h5>
    </template>
    <p>{{ t('profileDropdown.browse_agents') }}</p>
    <ChatAgentsOverview />
  </ElDialog>

  <ElDialog
    v-model="isSignOutModalVisible"
    align-center
    class="barrage-dialog--small"
    :close-icon="CloseCircleIcon"
  >
    <template #header>
      <h5>{{ t('profileDropdown.signOut') }}</h5>
    </template>
    <p>{{ t('profileDropdown.signout_text') }}</p>
    <template #footer>
      <el-button @click="isSignOutModalVisible = false">
        {{ t('agents.buttons.cancel') }}
      </el-button>
      <el-button
        type="primary"
        @click="handleSignOut"
      >
        {{ t('profileDropdown.signOut') }}
      </el-button>
    </template>
  </ElDialog>
  <ElDialog
    v-model="isProfileModelVisible"
    align-center
    class="barrage-dialog--medium"
    :close-icon="CloseCircleIcon"
  >
    <template #header>
      <h5>{{ t('profileDropdown.profile_settings') }}</h5>
    </template>
    <ProfileOverview />
  </ElDialog>
</template>

<style lang="scss" scoped>
.dropdown-menu {
  padding: 8px 12px;

  &:deep(.barrage-dropdown-menu__item) {
    border-radius: 0.5rem;
    padding: 6px 8px;
  }
}

.dropdown-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;

  & p {
    font-size: var(--font-size-fluid-2);
  }
}

.user-profile-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 12px;
  margin-right: 1rem;
}

.username-mail-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .username {
    margin: 0;
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    font-weight: var(--font-weight-bold);
  }
  & .user-mail {
    margin: 0;
    line-height: normal;
    font-size: var(--font-size-fluid-1);
  }
}

/* ______ */
.profile-toggle-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-primary-800);
  &:hover {
    background: var(--color-primary-100);
  }
}

.hidden {
  display: none;
}

.upload-container {
  display: flex;
  flex-direction: column;
  margin-block: 1.5rem;

  button {
    margin-block: 1rem;
  }
}

.dark {
  & .profile-toggle-button {
    color: var(--color-primary-100);
    &:hover {
      color: var(--color-primary-200);
      background: var(--color-primary-600);
    }
  }
}
</style>
