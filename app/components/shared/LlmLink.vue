<script lang="ts" setup>
// Types
interface PrefetchOn {
  interaction?: boolean
  visibility?: boolean
}
type Target = '_self' | '_blank' | '_parent' | '_top'
type Type =
  'link'
  | 'button'
  | 'buttonPrimary'
  | 'buttonSuccess'
  | 'buttonDanger'
  | 'buttonWarning'
  | 'buttonInfo'
  | 'plainButton'
  | 'plainButtonPrimary'
  | 'plainButtonSuccess'
  | 'plainButtonDanger'
  | 'plainButtonWarning'
  | 'plainButtonInfo'
  | undefined

// Props
const props = withDefaults(defineProps<{
  to: string
  external?: boolean // Forces the link to be rendered as an a tag instead of a Vue Router RouterLink
  prefetch?: boolean // When enabled will prefetch middleware, layouts and payloads (when using payloadExtraction) of links in the viewport
  prefetchOn?: PrefetchOn // Allows custom control of when to prefetch links. This prop is only used when prefetch is enabled (default)
  target?: Target
  type?: Type
}>(), {
  to: '',
  external: false,
  prefetch: true,
  prefetchOn: () => ({ interaction: true, visibility: true }),
  target: '_self',
  type: undefined,
})

// States
const classes = computed(() => {
  let tempClasses = ''

  if (props.type) {
    // Setting link as button type
    if (props.type.toLowerCase().includes('button')) {
      tempClasses += 'barrage-button '
      if (props.type.includes('plain')) { tempClasses += 'is-plain ' }
      if (props.type === 'buttonPrimary') { tempClasses += 'barrage-button--primary ' }
      else if (props.type.includes('Success')) { tempClasses += 'barrage-button--success ' }
      else if (props.type.includes('Danger')) { tempClasses += 'barrage-button--danger ' }
      else if (props.type.includes('Warning')) { tempClasses += 'barrage-button--warning ' }
      else if (props.type.includes('Info')) { tempClasses += 'barrage-button--info ' }
    }
    // Setting link as link text
    else if (props.type === 'link') { tempClasses += 'link ' }
  }

  return tempClasses
})
</script>

<template>
  <NuxtLink
    :to="to"
    :external="external"
    :prefetch="true"
    :prefetch-on="prefetchOn"
    :target="target"
    :class="classes"
  >
    <div class="llm-link--template">
      <slot />
    </div>
  </NuxtLink>
</template>

<style lang="scss" scoped>
.llm-link {
  &--template {
    display: flex;
    align-items: center;
    gap: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}

.link {
  display: inline-block;
  text-decoration: none;
  transition: 0.3s;
  color: var(--color-primary-900);

  &:hover {
    color: var(--color-primary-600);
  }
  &:active {
    color: var(--color-primary-400);
  }
}

html.dark {
  .link {
    color: var(--color-primary-100);
    &:hover {
      color: var(--color-primary-400);
    }
    &:active {
      color: var(--color-primary-600);
    }
  }
}
</style>
