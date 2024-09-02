<script lang="ts" setup>
import ProfileIcon from '~/assets/icons/svg/account.svg'
import LocaleIcon from '~/assets/icons/svg/locale.svg'
import Accounting from '~/assets/icons/svg/tablet.svg'
import Info from '~/assets/icons/svg/info.svg'

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
</script>

<template>
  <ClientOnly>
    <el-dropdown trigger="hover" :popper-options="popperOptions">
      <el-button class="profile-toggle-button" size="small">
        <ProfileIcon size="36" />
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <div class="profile-dropdown-container" />
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.profile-dropdown-container {
  min-width: 300px;
  min-height: 300px;
}

.profile-toggle-button {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--color-primary-800);
  &:hover {
    background: var(--color-primary-100);
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
