<script lang="ts" setup>
// IMPORTS
import ProfileIcon from '~/assets/icons/svg/account.svg'
import LogoutIcon from '~/assets/icons/svg/logout.svg'
import ChatAgentIcon from '~/assets/icons/svg/chat-agent.svg'
import SupportIcon from '~/assets/icons/svg/support.svg'
import SettingsIcon from '~/assets/icons/svg/settings.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
// STATE

const isModalVisible = ref(false)

const openModal = () => {
  isModalVisible.value = true
}

const closeModal = () => {
  isModalVisible.value = false
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

const router = useRouter()
</script>

<template>
  <ClientOnly>
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
          <el-dropdown-item @click="openModal">
            <div class="dropdown-item">
              <ProfileIcon /> <p>View Profile</p>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="dropdown-item">
              <SettingsIcon /> <p>Settings</p>
            </div>
          </el-dropdown-item>
          <div class="horizontal-divider" />
          <el-dropdown-item>
            <div class="dropdown-item">
              <ChatAgentIcon />  <p>Agents</p>
            </div>
          </el-dropdown-item>
          <el-dropdown-item>
            <div class="dropdown-item">
              <SupportIcon /> <p>Support</p>
            </div>
          </el-dropdown-item>
          <div class="horizontal-divider" />
          <el-dropdown-item @click="router.push('/login')">
            <div class="dropdown-item">
              <LogoutIcon /> <p>Sign out</p>
            </div>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <!--  <LlmModal
      v-if="isModalVisible"
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
  </ClientOnly>
  <ClientOnly>
    <ElDialog
      v-model="isModalVisible"
      align-center
      class="barrage-dialog--large"
      :close-icon="CloseCircleIcon"
    >
      <template #header>
        header
      </template>

      content

      <template #footer>
        footer
      </template>
    </ElDialog>
  </ClientOnly>
  <LlmModal
    v-if="isModalVisible"
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
  </LlmModal>
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
