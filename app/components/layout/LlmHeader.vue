<script lang="ts" setup>
// IMPORTS
import BarrageLogo from '~/assets/icons/svg/barrage-logo.svg'
/* import AccountIcon from '~/assets/icons/svg/account.svg'
import Close from '~/assets/icons/svg/close.svg'
import LocaleIcon from '~/assets/icons/svg/locale.svg'
import Accounting from '~/assets/icons/svg/tablet.svg'
import Info from '~/assets/icons/svg/info.svg' */

// CONSTANTS

// STATE
/* const isDrawerOpen = ref(false)
const prompts = ['New best practice..', 'How to add...', 'Stock status'] */

// HELPERS
/* const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
} */
</script>

<template>
  <header>
    <BarrageLogo
      width="110px"
      height="40px"
    />

    <div class="header-right">
      <ThemeSelector />
      <div class="vertical-divider" />
      <LightDarkModeSelector />
      <div class="vertical-divider" />
      <LocalizationSelector />
      <div class="vertical-divider" />
      <ProfileDropdown />
      <!--  <el-button
        class="details"
        size="small"
        @click="toggleDrawer"
      >
        <AccountIcon v-if="!isDrawerOpen" size="36" />
        <Close v-else size="36" />
      </el-button> -->
    </div>

    <!--  <div class="drawer" :class="{ open: isDrawerOpen }">
      <div class="header-container">
        <h6>Profile details</h6>
        <button class="close-btn" @click="toggleDrawer">
          <Close />
        </button>
      </div>

      <div class="drawer-content">
        <div class="user-details">
          <p>Marica Pekarica</p>
        </div>
        <div class="default-prompts">
          <p>Default prompts</p>
          <div class="prompts-container">
            <span
              v-for="(prompt, index) in prompts"
              :key="index"
              class="prompt"
            >{{ $t(prompt) }}</span>
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
    </div> -->
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 1rem;
  /*   border-bottom: 1px solid var(--color-primary-300); */
  background-color: transparent;

  .header-right {
    display: flex;
    align-items: center;
    column-gap: 0.75rem;
  }

  .details {
    display: flex;
    gap: 0.5rem;
    padding: 0.625rem 0.5rem;
    border-radius: 0.625rem;
    border: none;
    color: var(--color-primary-700);
    background: transparent;
    transition: 0.2s ease-in;
    font-size: 0.875rem;
    cursor: pointer;
    &:hover {
      color: var(--color-primary-500);
    }
  }

  .drawer {
    position: fixed;
    top: 8.4375rem;
    right: 0;
    width: clamp(17.5rem, 14.1626rem + 14.2395vw, 31.25rem);
    height: auto;
    background-color: #fff;
    border-radius: 0.625rem;
    box-shadow: -0.125rem 0 0.3125rem rgba(0, 0, 0, 0.2);
    transform: translateX(100%);
    transition: transform 0.5s ease;
    overflow: hidden;

    background-color: var(--color-gray-100);

    &.open {
      transform: translateX(-2%);
    }

    .header-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-inline: 1rem;
      padding-block: 1rem 0;
    }

    .close-btn {
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: var(--color-gray-600);
    }

    .drawer-content {
      display: flex;
      flex-direction: column;
      padding: 1rem;

      h6 {
        margin-bottom: 0.9375rem;
        opacity: 0.7;
      }

      .user-details,
      .default-prompts,
      .sources {
        border-bottom: 0.0625rem solid var(--color-gray-300);
        margin-bottom: 0.9375rem;
        padding-block: 0.625rem 1.25rem;

        & p:first-of-type {
          margin-bottom: 0.9375rem;
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
          padding: 0.625rem;
          border: 0.0625rem solid var(--color-gray-200);
          border-radius: 0.625rem;
          cursor: pointer;
          font-size: 1rem;
          background-color: white;

          &:hover {
            color: var(--color-gray-500);
            transition: 0.2s ease-in;

            svg {
              color: var(--color-gray-500);
              transition: 0.2s ease-in;
            }
          }

          svg {
            color: blue;
          }
        }
      }
    }
  }
}
.vertical-divider {
  width: 1px;

  height: 32px;
  background: var(--color-primary-100);
}

.dark {
  header {
    /*   background-color: var(--color-primary-900); */
    /*  border-bottom: 1px solid var(--color-primary-600); */
    & .vertical-divider {
      background: var(--color-primary-800);
    }
  }
  & .details {
    color: var(--color-primary-200);

    &:hover {
      color: var(--color-primary-100);
    }
  }
}
</style>
