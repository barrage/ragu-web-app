<script lang="ts" setup>
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'

// PROPS

const props = withDefaults(defineProps<{
  collectionName: string | null
  size?: 'small' | 'medium' | 'large'
}>(), {
  size: 'small',
})

// CONSTANTS

const { t } = useI18n()

// COMPUTEDS

const collectionData = computed(() => {
  return {
    name: props.collectionName || t('users.user_card.unknown_name'),
  }
})

const iconSize = computed(() => {
  switch (props.size) {
    case 'medium':
      return '46px'
    case 'large':
      return '84px'
    default:
      return '40px'
  }
})

const textSize = computed(() => {
  switch (props.size) {
    case 'medium':
      return { name: 'var(--font-size-fluid-4)' }
    case 'large':
      return { name: 'var(--font-size-fluid-5)' }
    default:
      return { name: 'var(--font-size-fluid-3)' }
  }
})
</script>

<template>
  <div class="collection-profile-snipet-item">
    <CollectionIcon :size="iconSize" />
    <div class="name-wrapper">
      <p class="name" :style="{ fontSize: textSize.name }">
        {{ `${collectionData.name}` }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.collection-profile-snipet-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  text-overflow: ellipsis;
  color: var(--color-primary-900);
  flex-wrap: wrap;

  svg {
    flex-shrink: 0;
  }

  & .name-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    & .name {
      margin: 0;
      line-height: normal;
      font-weight: var(--font-weight-semibold);
      color: var(--color-primary-900);
    }
  }
}

.dark {
  .collection-profile-snipet-item {
    color: var(--color-primary-0);
  }
  .name-wrapper {
    & .name {
      color: var(--color-primary-0);
    }
  }
}
</style>
