<script setup lang="ts">
import CloseIcon from '~/assets/icons/svg/close.svg'
import LogoIcon from '~/assets/icons/svg/brain.svg'

const props = defineProps({
  showCloseButton: {
    type: Boolean,
    default: true,
  },
  type: {
    type: String,
    default: 'primary',
    validator: (val: string) => ['primary', 'secondary'].includes(val),
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
      :class="`modal__inner--${props.size} modal--${props.type}`"
    >
      <div
        v-if="props.showCloseButton"
        class="close"
        @click="$emit('close')"
      >
        <CloseIcon />
      </div>
      <div class="modal__header" :class="`modal__header--${props.type}`">
        <template v-if="props.type === 'primary'">
          <LogoIcon size="64" />
          <h1 v-if="$slots.header">
            <slot name="header" />
          </h1>
        </template>
        <template v-else-if="props.type === 'secondary'">
          <template v-if="props.size === 'md'">
            <h2 v-if="$slots.header">
              <slot name="header" />
            </h2>
          </template>
          <template v-else>
            <h5 v-if="$slots.header">
              <slot name="header" />
            </h5>
          </template>
        </template>
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

<style lang="postcss" scoped>
.modal {
  display: flex;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(51, 51, 51, 0.1);
  z-index: 1000;
  backdrop-filter: blur(10px);
  overflow: auto;
  padding-block: 56px;
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
      padding: 80px;
    }
    &.modal__inner--md {
      max-width: 663px;
      padding: 60px;
      & .close {
        top: 100px;
        right: 80px;
      }
    }
    &.modal--secondary {
      & .close {
        top: 105px;
        right: 80px;
      }
    }
    & .close {
      cursor: pointer;
      position: absolute;
      right: 100px;

      &:hover {
        &:deep() svg path {
          fill: var(--color-primary-500);
        }
      }
      &:deep() svg {
        margin: 5px auto 0;
        display: block;
        transform: scale(2);
        & path {
          transition: 0.3s;
        }
      }
    }
    & .modal__header {
      padding-right: 40px;
      &.modal__header--primary {
        margin-bottom: 40px;
      }
      &.modal__header--secondary {
        margin-bottom: 40px;
      }
      & svg {
        display: block;
        margin-bottom: 40px;
      }
    }
    & .modal__footer {
      margin-top: 44px;
    }
  }
}

.dark .modal .modal__inner {
  background-color: var(--color-primary-600);

  & .close {
    &:hover {
      &:deep() svg path {
        fill: var(--color-primary-200);
      }
    }
  }
}
</style>
