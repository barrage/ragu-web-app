<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import CopyIcon from '~/assets/icons/svg/copy.svg'

const props = defineProps<{
  label: string | undefined
  description: string | undefined
  reversed?: boolean
  canCopy?: boolean
}>()

const { copy } = useClipboard()

const copyItem = () => {
  if (props.canCopy && props.description) {
    copy(props.description)
    ElNotification({
      title: 'Copied',
      message: `Copied to clipboard`,
      type: 'info',
      customClass: 'info',
      duration: 2500,
    })
  }
}
</script>

<template>
  <div
    class="label-description-item-container"
    :class="{ reversed }"
  >
    <span class="label">
      {{ props.label }}
    </span>
    <span
      class="description"
      :class="{ canCopy }"
      @click="copyItem"
    >
      {{ props.description }}  <CopyIcon v-if="canCopy" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.label-description-item-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.reversed {
    flex-direction: column-reverse;
  }

  & .label {
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    color: var(--color-primary-700);
  }
  & .description {
    font-size: var(--font-size-fluid-3);
    line-height: normal;
    color: var(--color-primary-800);
    display: flex;
    gap: 0.5rem;
    align-items: center;
    &.canCopy {
      &:hover {
        cursor: pointer;
        opacity: 0.8;
      }
    }
  }
}

.dark {
  & .label {
    color: var(--color-primary-100);
  }
  & .description {
    color: var(--color-primary-0);
  }
}
</style>
