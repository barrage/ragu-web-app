<script setup lang="ts">
import LoadingIcon from '~/assets/icons/svg/loading.svg'

interface Slots {
  default?: () => string | Component
}

interface Props {
  orientation?: 'vertical' | 'horizontal'
}

const props = withDefaults(defineProps<Props>(), {
  orientation: 'horizontal',
})
const slots = defineSlots<Slots>()
</script>

<template>
  <div
    class="loader"
    :class="{ [`is-${props.orientation}`]: props.orientation }"
  >
    <div class="loader-icon-container">
      <LoadingIcon class="icon" original />
    </div>

    <template v-if="slots.default">
      <div class="loader-default-slot-container">
        <slot name="default" />
      </div>
    </template>
  </div>
</template>

<style scoped lang="scss">
:root {
  --loader-icon-color: var(--color-blue-600);
  --loader-text-color: var(--color-gray-500);
  --loader-icon-size: 10rem;
  --loader-outer-circle-color: var(--color-primary-100);
  --loader-inner-circle-color: var(--color-gray-100);
}

.loader {
  display: flex;
  align-items: center;
  gap: var(--spacing-fluid-s);

  &.is {
    &-horizontal {
      flex-direction: row;
    }

    &-vertical {
      flex-direction: column;
    }
  }

  &-icon-container {
    @keyframes loader-rotate {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }
  }

  &-default-slot-container {
    * {
      font-weight: var(--font-weight-semibold);
      color: var(--loader-text-color);
    }
  }

  .icon {
    --icon-width: var(--loader-icon-size);
    --icon-height: var(--loader-icon-size);
    animation: loader-rotate 2s linear infinite;

    path {
      &:nth-child(1) {
        fill: var(--color-primary-100);
      }

      &:nth-child(2) {
        fill: var(--color-primary-200);
      }
    }
  }
}

html.dark {
  .loader {
    .icon {
      path {
        &:nth-child(1) {
          --loader-inner-circle-color: var(--color-gray-800);
        }
      }
    }
  }
}
</style>
