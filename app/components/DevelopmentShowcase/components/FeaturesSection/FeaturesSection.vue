<script lang="ts" setup>
import GlobalStyleIcon from '~/assets/icons/svg/global-style.svg'
import LogicIcon from '~/assets/icons/svg/logic.svg'
import LayoutIcon from '~/assets/icons/svg/layout.svg'
import ComponentLibraryIcon from '~/assets/icons/svg/component-library.svg'

const featuresList = shallowRef([
  {
    name: 'Global Styles',
    description: 'Centralizes typography, fonts, spacings, grids, and borders for a cohesive design system.',
    icon: GlobalStyleIcon,
  },
  {
    name: 'Layouts',
    description: 'Offers default, dashboard, and auth layouts to quickly scaffold different types of pages.',
    icon: LayoutIcon,
  },
  {
    name: 'Initial Logic',
    description: 'Includes state management, API integrations, and utility functions for common tasks.',
    icon: LogicIcon,
  },
  {
    name: 'Component Library',
    description: 'Provides customized buttons, form inputs, modals, and navigation components for consistent UI elements.',
    icon: ComponentLibraryIcon,
  },
])
</script>

<template>
  <section class="nuxt-boilerplate-features-section">
    <h5>Features</h5>
    <div class="features-section-cards">
      <div
        v-for="feature in featuresList"
        :key="feature.name"
        class="boilerplate-widget"
      >
        <p class="widget-title">
          <component :is="feature.icon" />
          {{ feature.name }}
        </p>
        <p class="widget-description">
          {{ feature.description }}
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.nuxt-boilerplate-features-section {
  display: flex;
  flex-direction: column;
  gap: 22px;
  & h5 {
    font-weight: 500;
  }
}
.features-section-cards {
  display: flex;
  flex-wrap: wrap;
  gap: 22px;
}

.boilerplate-widget {
  display: flex;
  flex-direction: column;
  gap: 12px;
  border-radius: var(--radius-3);
  padding: var(--spacing-fluid-xs);
  border: 1px solid var(--color-gray-300);
  background: var(--color-lightmode-300);
  flex: 1 0 calc(25% - 22px);
  transition: all 0.2s ease-in;

  & .widget-title {
    font-size: var(--font-size-fluid-3);
    font-weight: 500;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease-in-out;
  }

  & .widget-description {
    font-size: var(--font-size-fluid-2);
    color: var(--color-gray-600);
    transition: all 0.2s ease-in;
  }

  &:hover {
    background: var(--color-lightmode-200);

    & .widget-title {
      color: var(--color-green-900);
    }
    & .widget-description {
      color: var(--color-gray-800);
    }
  }
}

.dark {
  & .widget-title {
    color: var(--color-gray-50);
  }

  & .widget-description {
    color: var(--color-gray-500);
  }
  & .boilerplate-widget {
    border: 1px solid var(--color-gray-700);
    background: var(--color-darkmode-700);

    &:hover {
      background: var(--color-darkmode-800);

      & .widget-title {
        color: var(--color-green-300);
      }
      & .widget-description {
        color: var(--color-gray-200);
      }
    }
  }
}
</style>
