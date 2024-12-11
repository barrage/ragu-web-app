<script lang="ts" setup>
type LlmTooltipOrientation = 'top' | 'left' | 'right' | 'bottom'
type LlmTooltipAlignment = 'start' | 'end'
type LlmTooltipPlacement = LlmTooltipOrientation | `${LlmTooltipOrientation}-${LlmTooltipAlignment}`
type LlmTooltipTrigger = 'hover' | 'click' | 'focus' | 'contextmenu'

defineProps<{
  content?: string | undefined
  enterable?: boolean
  placement?: LlmTooltipPlacement
  disabled?: boolean
  delayed?: boolean
  hideAfter?: number
  visible?: boolean
  offset?: number
  trigger?: LlmTooltipTrigger
}>()
</script>

<template>
  <ElTooltip
    :content="content"
    :enterable="enterable || false"
    :placement="placement || 'top'"
    :disabled="disabled || false"
    :show-after="delayed ? 1500 : 100"
    :hide-after="hideAfter || 0"
    :visible="visible || undefined"
    :offset="offset || 12"
    :trigger="trigger || ['hover', 'focus']"
  >
    <template #content>
      <slot name="content" />
    </template>
    <slot />
  </ElTooltip>
</template>
