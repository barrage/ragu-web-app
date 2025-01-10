<script setup lang="ts">
import { computed, ref } from 'vue'
import { useMouse, useWindowSize } from '@vueuse/core'
import RaguLogo from '~/assets/icons/svg/Ragu_logo_dark.svg'
import BarrageLogo from '~/assets/icons/svg/barrage-logo.svg'

const config = useRuntimeConfig()
const appVersion = config.public.appVersion

// CONSTANTS & STATES

const { x, y } = useMouse()
const { width, height } = useWindowSize()
const dx = computed(() => Math.abs(x.value - width.value / 2))
const dy = computed(() => Math.abs(y.value - height.value / 2))
const distance = computed(() =>
  Math.sqrt(dx.value * dx.value + dy.value * dy.value),
)
const size = computed(() => Math.max(300 - distance.value / 3, 150))
const opacity = computed(() => Math.min(Math.max(size.value / 300, 0.7), 1))
const clampedX = computed(() =>
  Math.max(size.value / 2, Math.min(x.value, width.value - size.value / 2)),
)
const clampedY = computed(() =>
  Math.max(size.value / 2, Math.min(y.value, height.value - size.value / 2)),
)
const isAnimatingOut = ref(false)
const themeStore = useThemeStore()
const { isDarkMode } = storeToRefs(themeStore)

// FUNCTIONS

function handleAnimatingOut() {
  isAnimatingOut.value = true
}
</script>

<template>
  <main :class="{ 'animate-main-exit': isAnimatingOut }">
    <header
      class="header"
      :class="{ 'animate-header-container-exit': isAnimatingOut }"
    >
      <BarrageLogo
        class="header-logo"
        width="110px"
        height="48px"
      />
      <div class="header-right">
        <ThemeSelector login-layout />
        <div class="vertical-divider" />
        <LightDarkModeSelector login-layout />
        <div class="vertical-divider" />
        <LocalizationSelector login-layout />
      </div>
    </header>
    <div
      class="container"
      :class="{ 'animate-left-container-exit': isAnimatingOut }"
    >
      <NuxtPage
        @redirection="(value) => handleAnimatingOut(value)"
      />
    </div>
    <div
      class="container container--image"
      :class="{ 'animate-right-container-exit': isAnimatingOut }"
    >
      <div
        class="right-dynamic-circle"
        :style="{
          opacity,
          left: `${clampedX}px`,
          top: `${clampedY}px`,
          width: `${size}px`,
          height: `${size}px`,
        }"
      />

      <div class="logo-wrapper">
        <RaguLogo
          :key="isDarkMode"
          size="220px"
          class="logo"
        />
        <div class="app-version-container">
          v{{ appVersion }}
        </div>
      </div>
    </div>
  </main>
</template>

<style lang="scss" scoped>
main {
  grid-area: main;
  padding: 0.75rem;
  background: transparent;
  background: radial-gradient(
    circle,
    var(--color-lightmode-0) 0%,
    var(--color-primary-subtle) 100%
  );
  overflow: hidden;
  height: 100vh;
  animation: fade-in 2s ease forwards;
  background: linear-gradient(
    var(--color-lightmode-0),
    var(--color-primary-200)
  );

  &.animate-main-exit {
    animation: fade-out 1s ease forwards;
  }

  .header {
    padding-top: 0.5rem;
    padding-inline: 2rem;
    position: sticky;
    z-index: 2;
    transform: translateX(0) rotate(10deg);
    animation: move-up 2s ease forwards;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .header-logo {
      color: var(--color-primary-600);
    }

    .animate-header-container-exit {
      animation: move-up-reverse 1s ease forwards;
    }

    .header-right {
      display: flex;
      align-items: center;
      column-gap: 0.75rem;
    }
    .vertical-divider {
      width: 1px;
      height: 1.75rem;
      background: var(--color-primary-600);
      @include viewport-m {
        background: var(--color-primary-300);
      }
    }
  }

  .container {
    font-size: medium;
    width: 100%;
    height: 100vh;
    display: block;
    z-index: 0;
    transform: translateX(0);
    animation: move-left 2s ease forwards;

    &--image {
      display: none;

      @include viewport-m {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        clip-path: polygon(35% 0%, 100% 0%, 100% 100%, 40% 100%);
        background: radial-gradient(
          circle,
          var(--color-darkmode-300) 0%,
          var(--color-primary-900) 100%
        );
        z-index: 1;
        transform: translateX(0);
        animation: move-right 2s ease forwards;
      }

      .logo-wrapper {
        margin-left: 40%;
        z-index: 2;

        .logo {
          color: var(--color-primary-300);
        }
      }

      &.animate-right-container-exit {
        animation: move-right-reverse 1s ease forwards;
      }
    }

    &.animate-left-container-exit {
      animation: move-left-reverse 1s ease forwards;
    }
  }
}

.right-dynamic-circle {
  position: absolute;
  background-color: var(--color-primary-800);
  border-radius: 50%;
  pointer-events: none;
  filter: blur(30px);
  transform: translate(-50%, -50%);
  z-index: 1;
}

.app-version-container {
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0px 22px 22px 0px;
  font-size: var(--font-size-fluid-3);
  color: var(--color-primary-0);
}

.dark {
  .app-version-container {
    color: var(--color-primary-900);
  }
  main {
    background: radial-gradient(
      circle,
      var(--color-darkmode-300) 0%,
      var(--color-primary-900) 100%
    );

    .header {
      .header-logo {
        color: var(--color-primary-300);
      }
    }

    .vertical-divider {
      background: var(--color-primary-300);
      @include viewport-m {
        background: var(--color-primary-600);
      }
    }

    .container {
      &--image {
        background: linear-gradient(
          var(--color-lightmode-0),
          var(--color-primary-400)
        );

        .logo-wrapper {
          .logo {
            color: var(--color-primary-600);
          }
        }
      }
    }
  }

  .right-dynamic-circle {
    background-color: var(--color-primary-100);
  }
}
</style>
