<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import CopyIcon from '~/assets/icons/svg/copy.svg'

interface Slots {
  customLabel?: () => string | Component
  customDescription?: () => string | Component
}

const props = defineProps<{
  label: string | undefined | number
  description: string | undefined | number
  reversed?: boolean
  horizontal?: boolean
  canCopy?: boolean
  centered?: boolean
  size?: 'small' | 'medium' | 'large'
  truncateDescription?: number
}>()

const slots = defineSlots<Slots>()

const { t } = useI18n()

const { copy } = useClipboard()

const descriptionValue = computed(() => {
  if (props.truncateDescription && typeof props.description === 'string') {
    return formatStringMaxLenght(props.description, props.truncateDescription)
  }
  return props.description
})

const copyItem = () => {
  if (props.canCopy && props.description) {
    const copyValue = props.description.toString()
    copy(copyValue)
    ElNotification({
      title: t('chat.copy_title'),
      message: t('chat.copy_message'),
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
    :class="{ reversed, horizontal, centered, small: props.size === 'small', large: props.size === 'large' }"
  >
    <template v-if="slots.customLabel">
      <slot name="customLabel" />
    </template>
    <span v-else class="label">
      {{ props.label }}
    </span>
    <template v-if="slots.customDescription">
      <slot name="customDescription" />
    </template>
    <span
      v-else
      class="description"
      :class="{ canCopy }"
      @click="copyItem"
    >
      {{ descriptionValue }}  <CopyIcon v-if="canCopy" size="20px" />
    </span>
  </div>
</template>

<style lang="scss" scoped>
.label-description-item-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  &.horizontal {
    flex-direction: row;
    align-items: center;
  }

  &.reversed {
    flex-direction: column-reverse;
  }

  &.centered {
    align-items: center;
  }
  &.small {
    & .label {
      font-size: var(--font-size-fluid-1);
      line-height: normal;
    }
    & .description {
      font-size: var(--font-size-fluid-2);
      line-height: normal;
    }
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
