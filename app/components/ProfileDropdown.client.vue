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

const user = ref({
  name: 'Ime',
  surname: 'Prezime',
  email: 'imeprezime@gmail.com',
})

const switchPanel = () => {
  if (oAuthStore.selectedRole === 'user') {
    router.push('/admin')
    oAuthStore.selectedRole = 'admin'
  }
  else {
    router.push('/')
    oAuthStore.selectedRole = 'user'
  }
}
</script>

<template>
  <el-dropdown trigger="hover" :popper-options="popperOptions">
    <el-button class="profile-toggle-button" size="small">
      <ProfileIcon size="36" />
    </el-button>
    <template #dropdown>
      <el-dropdown-menu class="dropdown-menu">
        <div class="user-profile-item">
          <ProfileIcon size="42" />
          <div class="username-mail-wrapper">
            <p class="username">
              {{ `${user.name} ${user.surname}` }}
            </p>
            <span class="user-mail">{{ user.email }}</span>
          </div>
        </div>
        <div class="horizontal-divider" />
        <el-dropdown-item @click="switchPanel">
          <div class="dropdown-item">
            <AdminIcon /> <p>  {{ oAuthStore.selectedRole === 'user' ? $t('profileDropdown.switchToAdmin') : $t('profileDropdown.switchToUser') }}</p>
          </div>
        </el-dropdown-item>
        <div class="horizontal-divider" />
        <el-dropdown-item @click="openProfileModal">
          <div class="dropdown-item">
            <ProfileIcon /> <p> {{ $t('profileDropdown.profile') }}</p>
          </div>
        </el-dropdown-item>
        <el-dropdown-item>
          <div class="dropdown-item">
            <SettingsIcon /> <p>{{ $t('profileDropdown.settings') }}</p>
          </div>
        </el-dropdown-item>
        <div class="horizontal-divider" />
        <el-dropdown-item @click="openAgentsModal">
          <div class="dropdown-item">
            <ChatAgentIcon />  <p>{{ $t('profileDropdown.agents') }}</p>
          </div>
        </el-dropdown-item>
        <el-dropdown-item disabled>
          <div class="dropdown-item">
            <SupportIcon /> <p>{{ $t('profileDropdown.support') }}</p>
          </div>
        </el-dropdown-item>
        <div class="horizontal-divider" />
        <el-dropdown-item @click=" openSignOutModal">
          <div class="dropdown-item">
            <LogoutIcon /> <p>{{ $t('profileDropdown.signOut') }}</p>
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
      <h5>{{ $t('profileDropdown.agents') }}</h5>
    </template>
    <p>Browse all chat agents ready to assist you</p>
    <ChatAgentsOverview />
  </ElDialog>

  <ElDialog
    v-model="isSignOutModalVisible"
    align-center
    class="barrage-dialog--small"
    :close-icon="CloseCircleIcon"
  >
    <template #header>
      <h5>{{ $t('profileDropdown.signOut') }}</h5>
    </template>
    <p>Are you sure you want to proceed with signing out?</p>
    <template #footer>
      <el-button @click="isSignOutModalVisible = false">
        Cancel
      </el-button>
      <el-button
        type="primary"
        @click="router.push('/login')"
      >
        {{ $t('profileDropdown.signOut') }}
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
      <h5>Profile Settings</h5>
    </template>
    <ProfileOverview />
  </ElDialog>

  <!-- <LlmModal
    v-if="isAgentsModalVisible"
    size="md"
    @close="closeModal"
  >
    <template #header>
      Change Avatar
    </template>
    <template #content>
      <p>You can upload your avatar here </p>
      <el-upload
        class="upload-container"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        multiple
      >
        <el-button class="theme-switch-button " size="small">
          Click to upload
        </el-button>
      </el-upload>
    </template>
  </LlmModal> -->
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

.horizontal-divider {
  width: 100%;
  height: 1px;
  margin: 4px 0px;
  background: var(--color-primary-300);
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
  & .horizontal-divider {
    background: var(--color-primary-700);
  }
}
</style>
