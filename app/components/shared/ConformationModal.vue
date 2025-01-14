<script lang="ts" setup>
import InfoIcon from '~/assets/icons/svg/info.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'

// PROPS & EMITS
interface Props {
  isVisible?: boolean
  title?: string
  message?: string
  confirmButtonText?: string
  cancelButtonText?: string
}

const {
  isVisible = false,
  title = 'Unsaved Changes',
  message = 'You have unsaved changes. Are you sure you want to leave this page?',
  confirmButtonText = 'Leave',
  cancelButtonText = 'Cancel',
} = defineProps<Props>()

const emit = defineEmits<{
  (event: 'confirm'): void
  (event: 'cancel'): void
}>()
</script>

<template>
  <el-dialog
    :model-value="isVisible"
    :title="title"
    destroy-on-close
    :close-icon="CloseCircleIcon"
    align-center
    class="barrage-dialog--small"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="emit('cancel')"
  >
    <template #header>
      <div class="conformation-modal-header">
        <InfoIcon size="42px" />
        <h5> {{ title }}</h5>
      </div>
    </template>

    <div class="conformation-modal-body">
      <span class="conformation-description">
        {{ message }}
      </span>
    </div>

    <template #footer>
      <el-button @click="emit('cancel')">
        {{ cancelButtonText }}
      </el-button>
      <el-button
        type="primary"
        @click="emit('confirm')"
      >
        {{ confirmButtonText }}
      </el-button>
    </template>
  </el-dialog>
</template>

<style lang="scss" scoped>
.conformation-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.conformation-modal-body {
  display: flex;
  flex-direction: column;
  gap: 22px;
  margin-bottom: 12px;

  & .conformation-description {
    color: var(--color-primary-800);
    font-size: var(--font-size-fluid-3);
    line-height: normal;
  }
}
.dark {
  .conformation-description {
    color: var(--color-primary-100);
    font-size: var(--font-size-fluid-3);
    line-height: normal;
  }
}
</style>
