<script lang="ts" setup>
// IMPORTS
import { Teleport } from 'vue'
import type { DropdownInstance } from 'element-plus'
import ProfileOverviewModal from '../ProfileOverviewModal.vue'
import { useDropdownKeyboard } from '~/utils/useDropdownKeyboard'
import AdminIcon from '~/assets/icons/svg/admin.svg'
import ProfileIcon from '~/assets/icons/svg/account.svg'
import LogoutIcon from '~/assets/icons/svg/logout.svg'
import SupportIcon from '~/assets/icons/svg/support.svg'
import SettingsIcon from '~/assets/icons/svg/settings.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'

// STATE
const router = useRouter()
const route = useRoute()
const oAuthStore = useAuthStore()
const { t } = useI18n()

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

const { execute, error, status: signoutStatus } = await useAsyncData(() => oAuthStore.POST_Logout(), {
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

// Settings

// Keyboard accessability
const dropdownRef = ref<DropdownInstance | null>(null)
const { toggleDropdown, handleDropdownVisibleChange } = useDropdownKeyboard(
  [switchRoute, openProfileModal, redirectToSettings, undefined, openSignOutModal],
  0,
  'dropdown-item',
  (selectedItem) => {
    if (selectedItem) {
      selectedItem()
    }

    const focusedElement = document.activeElement as HTMLElement
    if (focusedElement) {
      focusedElement.blur()
    }
    dropdownRef.value?.handleClose()
  },
)

function redirectToSettings() {
  handleDropdownVisibleChange(false)
  navigateTo('/admin/settings')
}

function switchRoute() {
  handleDropdownVisibleChange(false)
  navigateTo({ path: isAdminRoute.value ? '/' : '/admin' })
}
</script>

<template>
  <el-dropdown
    ref="dropdownRef"
    v-motion-slide-top
    :delay="1500"
    trigger="hover"
    :popper-options="popperOptions"
    @visible-change="handleDropdownVisibleChange"
  >
    <el-button
      class="profile-toggle-button"
      size="small"
      @keyup.enter="toggleDropdown"
      @keyup.space="toggleDropdown"
    >
      <LlmAvatar
        :avatar="oAuthStore.user?.avatar"
        :alt="t('agents.user_avatar')"
        fit="cover"
        default-image="user"
      />
    </el-button>
    <template #dropdown>
      <el-dropdown-menu class="dropdown-menu">
        <div class="user-profile-item">
          <LlmAvatar
            :avatar="oAuthStore.user?.avatar"
            :alt="t('agents.user_avatar')"
            fit="cover"
            default-image="user"
          />
          <div class="username-mail-wrapper">
            <p class="username">
              {{ user.fullname }}
            </p>
            <span class="user-mail">{{ user.email }}</span>
          </div>
        </div>
        <template v-if="oAuthStore.isAdmin">
          <div class="horizontal-divider" />
          <LlmLink
            external
            :to="route.path.includes('/admin') ? '/' : '/admin'"
            type="link"
          >
            <ElDropdownItem>
              <div
                class="dropdown-item"
                tabindex="0"
                @keyup.escape="dropdownRef?.handleClose"
              >
                <AdminIcon size="20px" /> <p>  {{ isAdminRoute ? t('profileDropdown.switchToUser') : t('profileDropdown.switchToAdmin') }}</p>
              </div>
            </ElDropdownItem>
          </LlmLink>
        </template>
        <div class="horizontal-divider" />
        <el-dropdown-item @click="openProfileModal">
          <div
            class="dropdown-item"
            tabindex="-1"
            @keyup.escape="dropdownRef?.handleClose"
          >
            <ProfileIcon size="20px" /> <p> {{ t('profileDropdown.profile') }}</p>
          </div>
        </el-dropdown-item>
        <template v-if="oAuthStore.isAdmin">
          <div class="horizontal-divider" />
          <LlmLink
            to="/admin/settings"
            type="link"
          >
            <el-dropdown-item>
              <div
                class="dropdown-item"
                tabindex="0"
                @keyup.escape="dropdownRef?.handleClose"
              >
                <SettingsIcon size="20px" /> <p>{{ t('profileDropdown.settings') }}</p>
              </div>
            </el-dropdown-item>
          </LlmLink>
        </template>
        <div class="horizontal-divider" />
        <el-dropdown-item disabled>
          <div
            class="dropdown-item"
            tabindex="0"
            @keyup.escape="dropdownRef?.handleClose"
          >
            <SupportIcon size="20px" /> <p>{{ t('profileDropdown.support') }}</p>
          </div>
        </el-dropdown-item>
        <div class="horizontal-divider" />
        <el-dropdown-item @click="openSignOutModal">
          <div
            class="dropdown-item"
            tabindex="0"
            @keyup.escape="dropdownRef?.handleClose"
          >
            <LogoutIcon size="20px" /> <p>{{ t('profileDropdown.signOut') }}</p>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <Teleport to="body">
    <ElDialog
      v-model="isSignOutModalVisible"
      align-center
      class="barrage-dialog--small"
      :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
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
          :loading="signoutStatus === 'pending'"
          @click="handleSignOut"
        >
          {{ t('profileDropdown.signOut') }}
        </el-button>
      </template>
    </ElDialog>
  </Teleport>
  <Teleport to="body">
    <ProfileOverviewModal
      v-model="isProfileModelVisible"
      :avatar="oAuthStore.user?.avatar"
      :user="oAuthStore.user"
      upload-type="users"
    />
  </Teleport>
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
  color: var(--color-primary-1000);

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
    font-weight: var(--font-weight-semibold);
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

.upload-container {
  display: flex;
  flex-direction: column;
  margin-block: 1.5rem;

  button {
    margin-block: 1rem;
  }
}
:deep(.link) {
  width: 100%;
}

.dark {
  & .profile-toggle-button {
    color: var(--color-primary-100);
    &:hover {
      color: var(--color-primary-200);
      background: var(--color-primary-600);
    }
  }

  & .dropdown-item {
    background-color: transparent;
    color: var(--color-primary-0);
  }
}
</style>
