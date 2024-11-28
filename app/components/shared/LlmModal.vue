<script setup lang="ts">
import CloseIcon from '~/assets/icons/svg/close.svg'
import LogoIcon from '~/assets/icons/svg/brain.svg'

const props = defineProps({
  showCloseButton: {
    type: Boolean,
    default: true,
  },

  size: {
    type: String,
    default: 'lg',
    validator: (val: string) => ['md', 'lg'].includes(val),
  },
})
defineEmits(['close'])
</script>

<template>
  <div class="modal">
    <div
      class="modal__inner"
      :class="`modal__inner--${props.size}`"
    >
      <div class="modal__header ">
        <div class="modal__header--main">
          <div class="logo-header">
            <LogoIcon size="44px" />
            <h5>
              <slot name="header" />
            </h5>
          </div>
          <div
            v-if="props.showCloseButton"
            class="close"
            @click="$emit('close')"
          >
            <CloseIcon size="28px" />
          </div>
        </div>
      </div>
      <div v-if="$slots.content" class="modal__content">
        <slot name="content" />
      </div>
      <div v-if="$slots.footer" class="modal__footer">
        <slot name="footer" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(51, 51, 51, 0.1);
  backdrop-filter: blur(10px);
  overflow: auto;
  z-index: 100;

  & .modal__inner {
    position: relative;
    box-sizing: border-box;
    width: fit-content;
    width: 100%;
    margin: auto;
    background-color: var(--color-primary-100);
    box-shadow: 0px 4px 16px rgba(51, 51, 51, 0.1);
    border-radius: 16px;

    &.modal__inner--lg {
      max-width: 824px;
    }
    &.modal__inner--md {
      max-width: 663px;

      & .close {
        top: 46px;
      }
    }

    & .close {
      cursor: pointer;
      object-fit: cover;
      color: var(--color-primary-800);

      &:hover {
        &:deep() svg path {
          fill: var(--color-primary-500);
        }
      }
    }
    & .modal__header {
      & .modal__header--main {
        display: flex;
        align-items: center;
        justify-content: space-between;

        border-bottom: 0.0625rem solid var(--color-primary-400);
        padding: 1.5rem;

        .logo-header {
          color: var(--color-primary-800);
          display: flex;
          align-items: center;
          column-gap: 0.9375rem;

          h5 {
            color: var(--color-primary-800);
          }
        }
      }
    }
  }
  & .modal__footer {
    padding: 1.5rem;
    margin-top: 44px;
  }
  & .modal__content {
    padding: 1.5rem;
  }
}

.dark .modal .modal__inner {
  background-color: var(--color-primary-600);

  & .modal__header {
    .modal__header--main {
      .logo-header {
        color: var(--color-primary-100);

        h5 {
          color: var(--color-primary-100);
        }
      }
    }
  }

  & .close {
    color: var(--color-primary-100);
    &:hover {
      &:deep() svg path {
        fill: var(--color-primary-200);
      }
    }
  }
}
</style>
