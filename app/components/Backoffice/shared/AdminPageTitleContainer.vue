<script lang="ts" setup>
import InfoIcon from '@/assets/icons/svg/info.svg'

const props = withDefaults(defineProps<{
  title: string | null | undefined
  description: string | null | undefined
  hasInfo?: boolean
}>(), {
  title: '',
  description: '',
  hasInfo: false,
})

const emit = defineEmits<{
  (e: 'infoclicked'): void
}>()
</script>

<template>
  <div class="admin-page-title-container">
    <div class="title-icon-wrapper">
      <div v-if="$slots.icon" class="title-icon">
        <slot name="icon" />
      </div>
      <h1 class="admin-page-title">
        {{ props.title }}
      </h1>
      <el-button
        v-if="hasInfo"
        class="info-button"
        @click="emit('infoclicked')"
      >
        <InfoIcon />
      </el-button>
    </div>

    <p class="admin-page-description typing-effect">
      {{ props.description }}
    </p>
  </div>
</template>

<style scoped lang="scss">
.admin-page-title-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  & .title-icon-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;

    & .title-icon {
      color: var(--color-primary-800);
      flex-shrink: 0;
    }

    & .admin-page-title {
      font-weight: 500;
      color: var(--color-primary-800);
      font-size: var(--font-size-fluid-7);
    }

    .info-button {
      background: transparent;
      border: none;
      cursor: pointer;
      color: var(--color-primary-500);
      margin-top: auto;
      &:hover {
        color: var(--color-primary-800);
      }
    }
  }

  & .admin-page-description {
    color: var(--color-primary-700);
  }
}

.dark {
  & .admin-page-title-container {
    & .title-icon {
      color: var(--color-primary-0);
    }

    & .admin-page-title {
      color: var(--color-primary-0);
    }
    & .admin-page-description {
      color: var(--color-primary-200);
    }
    & .info-button {
      color: var(--color-primary-300);

      &:hover {
        color: var(--color-primary-0);
      }
    }
  }
}
</style>
