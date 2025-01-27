<script lang="ts" setup>
import { h } from 'vue'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { Agent } from '~/types/agent'

interface Emits {
  (e: 'changePicture'): void
  (e: 'deletePicture'): void
}

defineProps<{
  agent: Agent | null | undefined
}>()
const emits = defineEmits<Emits>()
const { t } = useI18n()

const isOpen = defineModel<boolean>()
const handleChangePicture = () => {
  emits('changePicture')
}

const handleDeletePicture = () => {
  emits('deletePicture')
}

const closeModal = () => {
  isOpen.value = false
}
</script>

<template>
  <ElDialog
    v-model="isOpen"
    align-center
    class="barrage-dialog--medium"
    :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
    @close="closeModal"
  >
    <template #header>
      <h5>{{ t('agents.titles.details') }}</h5>
    </template>

    <AgentOverview
      :agent="agent"
      @change-picture="handleChangePicture"
      @delete-picture="handleDeletePicture"
    />
  </ElDialog>
</template>
