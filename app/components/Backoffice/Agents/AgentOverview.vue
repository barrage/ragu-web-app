<script lang="ts" setup>
import PersonKeyIcon from '~/assets/icons/svg/person-key.svg'
import PersonClockIcon from '~/assets/icons/svg/clock.svg'
import LocaleIcon from '~/assets/icons/svg/locale.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import type { Agent } from '~/types/agent'

const props = defineProps<{
  agent: Agent | null | undefined
}>()

const emits = defineEmits<{
  (e: 'changePicture'): void
  (e: 'deletePicture'): void
}>()

// CONSTANTS
const { t } = useI18n()
const { $api } = useNuxtApp()

const { execute: deleteAgentPicture, error, status: deleteAgentPictureStatus } = await useAsyncData(
  () => $api.agent.DeleteAgentAvatar(props.agent?.agent?.id),
  { immediate: false },
)

const isDeleteModalOpen = ref(false)
const isUploadModalVisible = defineModel<boolean>()

const closeDeleteModal = () => {
  isDeleteModalOpen.value = false
}

const openUploadModal = () => {
  isUploadModalVisible.value = true
}

const refreshCurrentAgent = async () => {
  isUploadModalVisible.value = false
  emits('changePicture')
}

const handleChangePicture = () => {
  openUploadModal()
}

const handleDeletePicture = () => {
  isDeleteModalOpen.value = true
}

const handleRemovePicture = async () => {
  await deleteAgentPicture()
  if (error.value) {
    ElNotification({
      title: t('profile.notifications.import.error_title'),
      message: t('profile.notifications.import.error_description'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
  else {
    ElNotification({
      title: t('profile.notifications.import.success_title'),
      message: t('profile.notifications.import.success_delete_description'),
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })

    emits('deletePicture')
  }

  await refreshCurrentAgent()
  closeDeleteModal()
}
</script>

<template>
  <div class="agent-overview-container">
    <div class="agent-top">
      <div class="agent-picture-container">
        <div class="agent-avatar-wrapper">
          <LlmAvatar
            :avatar="agent?.agent?.avatar"
            :alt="t('agents.agent_avatar')"
            size="large"
            fit="cover"
            default-image="agent"
          />
        </div>
      </div>
      <el-button
        class="edit-picture-button"
        type="primary"
        @click="handleChangePicture"
      >
        <EditIcon size="16px" />
        {{ t('profile.change_picture.title') }}
      </el-button>
      <el-button
        v-if="agent?.agent?.avatar"
        class="remove-picture-button"
        size="small"
        @click="handleDeletePicture"
      >
        <DeleteIcon size="16px" />
        {{ t('profile.change_picture.delete_title') }}
      </el-button>
    </div>

    <div class="agent-title">
      <p>{{ agent?.agent?.name }}</p>
      <div class="agent-status-wrapper">
        <el-tag :type="agent?.agent?.active ? 'success' : 'danger'" size="small">
          <span class="status-dot" />
          {{ agent?.agent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status') }}
        </el-tag>
      </div>
    </div>

    <div class="agent-informations-section">
      <LabelDescriptionItem
        :label="t('agents.labels.llmProvider')"
        :description="agent?.configuration?.llmProvider"
        horizontal
      >
        <template #customLabel>
          <div class="agent-details-custom-label">
            <PersonKeyIcon size="18px" />
            <span>{{ t('agents.labels.llmProvider') }}:</span>
          </div>
        </template>
      </LabelDescriptionItem>

      <LabelDescriptionItem
        :label="t('agents.labels.model')"
        :description="agent?.configuration?.model"
        horizontal
      >
        <template #customLabel>
          <div class="agent-details-custom-label">
            <PersonInfoIcon size="18px" />
            <span>{{ t('agents.labels.model') }}:</span>
          </div>
        </template>
      </LabelDescriptionItem>

      <LabelDescriptionItem
        :label="t('agents.labels.language')"
        :description="agent?.agent?.language"
        horizontal
      >
        <template #customLabel>
          <div class="agent-details-custom-label">
            <LocaleIcon size="18px" />
            <span>{{ t('agents.labels.language') }}:</span>
          </div>
        </template>
      </LabelDescriptionItem>

      <LabelDescriptionItem
        :label="t('agents.labels.created_at')"
        :description="agent?.agent?.createdAt ? formatDate(agent.agent.createdAt, 'MMMM DD, YYYY') : '-'"
        horizontal
      >
        <template #customLabel>
          <div class="agent-details-custom-label">
            <PersonClockIcon size="18px" />
            <span>{{ t('agents.labels.created_at') }}:</span>
          </div>
        </template>
      </LabelDescriptionItem>
    </div>
  </div>

  <ConformationModal
    :is-visible="isDeleteModalOpen"
    :title="t('profile.delete_picture.title')"
    :message="t('profile.delete_picture.description')"
    :confirm-button-text="t('settings.delete')"
    confirm-button-type="danger"
    :confirm-button-loading="deleteAgentPictureStatus === 'pending'"
    :cancel-button-text="t('settings.cancel')"
    @confirm="handleRemovePicture"
    @cancel="closeDeleteModal"
  />

  <ChangePictureModal
    v-model="isUploadModalVisible"
    upload-type="agents"
    :agent-id="agent?.agent?.id"
    @profile-picture-uploaded="refreshCurrentAgent"
  />
</template>

<style lang="scss" scoped>
.agent-avatar-wrapper {
  display: flex;
  margin-right: 1rem;
}

.agent-overview-container {
  padding: 1rem;
}

.agent-top {
  display: flex;
  align-items: center;
  gap: 22px;
  margin-bottom: 10px;
}

.agent-picture-container {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.edit-picture-button {
  margin-left: auto;
}

.edit-picture-button,
.remove-picture-button {
  display: flex;
  align-items: center;
  gap: 0.25rem;
}

.agent-title {
  margin-bottom: 22px;
  p {
    font-weight: var(--font-weight-semibold);
    margin-bottom: 0.25rem;
  }
}

.agent-status-wrapper {
  display: flex;
}

.agent-informations-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  padding-block: 2rem;
  gap: 1.5rem;
  border-top: 1px solid var(--color-primary-300);
  border-bottom: 1px solid var(--color-primary-300);

  :deep(.description) {
    font-size: var(--font-size-fluid-2);
  }
}

.agent-details-custom-label {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--color-primary-900);
  font-size: var(--font-size-fluid-3);

  svg {
    flex-shrink: 0;
  }
}

.status-dot {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  margin-right: 6px;
  background-color: currentColor;
}

.barrage-button {
  padding-block: 0;

  svg {
    flex-shrink: 0;
  }
}

.dark {
  .agent-details-custom-label {
    color: var(--color-primary-100);
  }
}
</style>
