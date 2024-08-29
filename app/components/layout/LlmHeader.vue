<script lang="ts" setup>
// IMPORTS
import BarrageLogo from '~/assets/icons/svg/barrage-logo.svg'
import Details from '~/assets/icons/svg/more.svg'
import Close from '~/assets/icons/svg/close.svg'
import Web from '~/assets/icons/svg/globe.svg'
import Accounting from '~/assets/icons/svg/tablet.svg'
import Info from '~/assets/icons/svg/info.svg'

// CONSTANTS
const { setLocale, locales, locale } = useI18n()

// STATE
const isDrawerOpen = ref(false)
const isLocaleDropdownOpen = ref(false)
const prompts = ['New best practice..', 'How to add...', 'Stock status']

// COMPUTEDS
const availableLocales = computed(() => {
  return locales.value.filter(i => i.code !== locale.value)
})

const currentLanguageName = computed(() => {
  const current = locales.value.find(i => i.code === locale.value)
  return current ? current.name : locale.value
})

// HELPERS
const toggleDrawer = () => {
  isDrawerOpen.value = !isDrawerOpen.value
}

const toggleLocaleDropdown = () => {
  isLocaleDropdownOpen.value = !isLocaleDropdownOpen.value
}

const setCurrentLocale = async (localeCode: string) => {
  setLocale(localeCode)
  isLocaleDropdownOpen.value = false
}
</script>

<template>
  <header>
    <BarrageLogo
      width="80px"
      height="70px"
      color="black"
    />
    <ThemeSelector />

    <div class="header-right">
      <div class="localization-switcher">
        <button class="locale-btn" @click="toggleLocaleDropdown">
          <svg class="dropdown-icon">
            <Web width="20px" height="20px" />
          </svg>
          {{ currentLanguageName }}
        </button>
        <ul v-if="isLocaleDropdownOpen" class="locale-list">
          <li
            v-for="locale in availableLocales"
            :key="locale.code"
            @click="setCurrentLocale(locale.code)"
          >
            {{ locale.name }}
          </li>
        </ul>
      </div>

      <button class="details" @click="toggleDrawer">
        <Details v-if="!isDrawerOpen" />
        <Close v-else />
        <span>{{ $t("details") }}</span>
      </button>
    </div>

    <div class="drawer" :class="{ open: isDrawerOpen }">
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
            <span class="source"><Web /> Web</span>
            <span class="source"><Accounting /> Accounting</span>
            <span class="source"><Info /> Information</span>
          </div>
        </div>
      </div>
    </div>
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
  padding: 0.75rem;
  border-bottom: 0.0625rem solid var(--color-gray-200);
  background-color: white;

  .header-right {
    display: flex;
    column-gap: 0.75rem;
  }

  .details {
    display: flex;
    gap: 0.5rem;
    padding: 0.625rem 0.5rem;
    border-radius: 0.625rem;
    border: none;
    color: var(--color-gray-700);
    font-size: 0.875rem;
    cursor: pointer;
    &:hover {
      color: var(--color-gray-500);
      transition: 0.2s ease-in;
    }
  }

  .localization-switcher {
    position: relative;
    display: flex;
    align-items: center;

    &:hover {
      color: var(--color-gray-500);
      transition: 0.2s ease-in;
    }

    .locale-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.625rem 0.5rem;
      border-radius: 0.625rem;
      border: none;
      color: var(--color-gray-700);
      font-size: 0.875rem;
      cursor: pointer;

      &:hover {
        color: var(--color-gray-500);
        transition: 0.2s ease-in;
      }

      .dropdown-icon {
        width: 1.25rem;
        height: 1.25rem;
        fill: currentColor;
      }
    }

    .locale-list {
      position: absolute;
      top: 50px;
      left: 0;
      background: white;
      border: 0.0625rem solid var(--color-gray-300);
      border-radius: 0.625rem;
      box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.1);
      list-style: none;
      padding: 0;
      margin: 0;
      width: 100%;
      z-index: 2;

      li {
        padding: 0.5rem;
        cursor: pointer;
        font-size: 0.875rem;
        color: var(--color-gray-700);

        &:hover {
          color: var(--color-gray-500);
          transition: 0.2s ease-in;
          background-color: var(--color-gray-100);
        }
      }
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

.dark {
  header {
    background-color: var(--color-primary-800);
    border-bottom: 1px solid var(--color-primary-800);
  }
}
</style>
