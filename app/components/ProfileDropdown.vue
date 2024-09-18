<script lang="ts" setup>
// IMPORTS
import ProfileIcon from '~/assets/icons/svg/account.svg'
import LocaleIcon from '~/assets/icons/svg/locale.svg'
import Accounting from '~/assets/icons/svg/tablet.svg'
import Info from '~/assets/icons/svg/info.svg'
import { toggleBodyOverflow } from '~/utils/useBodyOverflow'

// STATE
const prompts = ['New best practice..', 'How to add...', 'Stock status']

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

watch(isModalVisible, (newVal) => {
  toggleBodyOverflow(newVal)
})
</script>

<template>
  <ClientOnly>
    <el-dropdown trigger="hover" :popper-options="popperOptions">
      <el-button class="profile-toggle-button" size="small">
        <ProfileIcon size="36" />
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <div
            class="profile-dropdown-container"
            :class="{ hidden: isModalVisible }"
            :style="{ display: !isModalVisible ? 'block' : 'none' }"
          >
            <div class="user-details">
              <p class="user-title">
                User
              </p>
              <div class="user">
                <p>
                  Marica Pekarica
                </p>
                <span class="user-avatar" @click="openModal">Change Avatar <ProfileIcon size="25" /></span>
              </div>
            </div>
            <div class="default-prompts">
              <p>Default prompts</p>
              <div class="prompts-container">
                <span
                  v-for="(prompt, index) in prompts"
                  :key="index"
                  class="prompt"
                >{{ prompt }}</span>
              </div>
            </div>
            <div class="sources">
              <p>Sources</p>
              <div class="sources-container">
                <span class="source"><LocaleIcon /> Web</span>
                <span class="source"><Accounting /> Accounting</span>
                <span class="source"><Info /> Information</span>
              </div>
            </div>
          </div>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
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
.profile-toggle-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-primary-800);
  &:hover {
    background: var(--color-primary-100);
  }
}

.profile-dropdown-container {
  display: flex;
  flex-direction: column;
  padding: 1rem;
  color: var(--color-primary-800);

  h6 {
    margin-bottom: 0.9375rem;
    opacity: 0.7;
  }

  .user-details {
    display: flex;
    flex-direction: column;
    border-bottom: 0.0625rem solid var(--color-primary-400);
    padding-block: 0.625rem 1rem;
    color: var(--color-primary-100);
    margin-bottom: 0.9375rem;

    .user-avatar {
      display: flex;
      column-gap: 0.5rem;
      align-items: center;
      color: var(--color-primary-800);
      font-weight: 500;
      cursor: pointer;

      &:hover {
        color: var(--color-primary-500);
        transition: 0.2s ease-in;

        svg {
          color: var(--color-primary-500);
          transition: 0.2s ease-in;
        }
      }
    }

    .user-title {
      margin-bottom: 1rem;
      padding-left: 0.625rem;
      font-weight: bold;
      color: var(--color-primary-800);
    }

    .user {
      padding-left: 0.625rem;
      display: flex;
      justify-content: space-between;
      align-items: center;

      & p:first-of-type {
        color: var(--color-primary-800);
        font-weight: 500;
      }
    }
  }

  .default-prompts,
  .sources {
    border-bottom: 0.0625rem solid var(--color-primary-400);
    margin-bottom: 0.9375rem;
    padding-block: 0.625rem 1.25rem;

    & p:first-of-type {
      margin-bottom: 0.9375rem;
      font-weight: bold;
      color: var(--color-primary-800);
    }

    p {
      padding-left: 0.625rem;
    }

    .prompts-container,
    .sources-container {
      display: flex;
      flex-wrap: wrap;
      gap: 0.625rem 0.9375rem;
      padding-left: 0.625rem;
    }

    .prompt,
    .source {
      display: flex;
      align-items: center;
      gap: 0.375rem;
      width: max-content;
      padding: 0.5rem 0.625rem;
      border: 0.0625rem solid var(--color-primary-100);
      border-radius: 0.625rem;
      cursor: pointer;
      font-size: 1rem;
      background-color: var(--color-primary-300);
      color: var(--color-primary-800);
      font-weight: 500;

      &:hover {
        color: var(--color-primary-500);
        transition: 0.2s ease-in;

        svg {
          color: var(--color-primary-500);
          transition: 0.2s ease-in;
        }
      }

      svg {
        color: var(--color-gray-600);
      }
    }
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

  .user-details {
    .user-avatar {
      color: var(--color-primary-100);

      &:hover {
        color: var(--color-primary-200);

        svg {
          color: var(--color-primary-200);
        }
      }
    }

    & p:first-of-type {
      color: var(--color-primary-100);
    }

    .user {
      & p:first-of-type {
        color: var(--color-primary-100);
      }
    }
  }

  .default-prompts,
  .sources {
    & p:first-of-type {
      color: var(--color-primary-100);
    }

    .prompt,
    .source {
      background-color: inherit;
      color: var(--color-primary-0);

      &:hover {
        color: var(--color-primary-200);

        svg {
          color: var(--color-primary-200);
        }
      }

      svg {
        color: var(--color-primary-0);
      }
    }
  }
}
</style>
