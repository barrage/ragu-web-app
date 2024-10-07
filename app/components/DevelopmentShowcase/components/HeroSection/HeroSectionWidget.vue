<script lang="ts" setup>
import ArrowRight from '~/assets/icons/svg/arrow-right.svg'

interface HeroWidget {
  title: string
  description: string
  link: string
}

/* PROPS & EMITS */
withDefaults(
  defineProps<{
    heroWidget?: HeroWidget | null
  }>(),
  {
    heroWidget: null,
  },
)
</script>

<template>
  <a
    class="boilerplate-widget"
    :href="heroWidget?.link"
    target="_blank"
  >
    <p class="widget-title">
      {{ heroWidget?.title }}
    </p>
    <p class="widget-description">
      {{ heroWidget?.description }}
    </p>

    <div
      class="widget-link"
    > <ArrowRight /> </div>
  </a>
</template>

<style lang="scss" scoped>
.boilerplate-widget {
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid var(--color-gray-300);
  border-radius: var(--radius-3);
  padding: var(--spacing-fluid-xs);

  &:hover {
    background: var(--color-gray-50);
    cursor: pointer;

    & .widget-link {
      color: var(--color-green-300);
      border-color: var(--color-green-300);
    }
  }
}

.dark {
  & .boilerplate-widget {
    border: 1px solid var(--color-gray-700);

    &:hover {
      background: var(--color-gray-800);

      & .widget-link {
        color: var(--color-green-300);
        border-color: var(--color-green-300);
      }
    }
  }

  & .widget-title {
    color: var(--color-gray-50);
  }
  & .widget-description {
    color: var(--color-gray-400);
  }
}

.widget-title {
  font-size: var(--font-size-fluid-3);
  font-weight: var(--font-weight-medium);
  color: var(--color-gray-800);
}
.widget-description {
  font-size: var(--font-size-fluid-2);
  color: var(--color-gray-600);
}

.widget-link {
  display: flex;
  gap: 8px;
  margin-left: auto;
  font-size: var(--font-size-desktop-2);
  align-items: center;
  border: 1px solid var(--color-gray-600);
  border-radius: 50%;
  padding: 3px;
}
</style>
