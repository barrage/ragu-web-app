<script lang="ts" setup>
import type { UploadProps, UploadUserFile } from 'element-plus'
import UploadIcon from '~/assets/icons/svg/upload-icon.svg'
import NoteIcon from '~/assets/icons/svg/notes.svg'
import DownloadIcon from '~/assets/icons/svg/download.svg'
import { StatusType } from '~/types/statusTypes'
import EmptyState from '~/components/shared/EmptyState.vue'
import PersonQuestionMarkIcon from '~/assets/icons/svg/person-question-mark.svg'
import type { FailedImportUser, ImportUsersResult } from '~/types/users'

const { t } = useI18n()
const { $api } = useNuxtApp()

const fileList = ref<UploadUserFile[]>([])
const userList = ref<ImportUsersResult | null>(null)
const isUploadLoading = ref(false)

const successStatusType = computed(() => StatusType.Success)
const failureStatusType = computed(() => StatusType.Danger)

const noteItems = computed(() => [
  t('users.import.note_file_format'),
  t('users.import.note_headers'),
  `${t('users.import.note_data_types')}Admin, User.`,
  t('users.import.note_file_size'),
  t('users.import.note_download_template'),
])

const beforeUploadCheck: UploadProps['beforeUpload'] = (rawFile) => {
  isUploadLoading.value = true
  const allowedTypes = ['text/csv']

  if (!allowedTypes.includes(rawFile.type)) {
    ElNotification({
      title: t('users.notifications.import.error_file_type_title'),
      message: t('users.notifications.import.error_file_type_description'),
      type: 'error',
      customClass: 'error',
      duration: 3500,
    })
    isUploadLoading.value = false
    fileList.value = []
    return false
  }
  else if (rawFile.size / 1024 / 1024 > 5) {
    ElNotification({
      title: t('users.notifications.import.error_file_size_title'),
      message: t('users.notifications.import.error_file_size_description'),
      type: 'error',
      customClass: 'error',
      duration: 3500,
    })
    isUploadLoading.value = false
    fileList.value = []
    return false
  }
  return true
}

const upload = async () => {
  const file = fileList.value[0]?.raw
  if (!file || !(file instanceof File)) {
    console.error('No valid file selected for upload.')
    return
  }

  isUploadLoading.value = true
  const { execute: uploadCsv, error, data } = await useAsyncData(() => $api.user.ImportUsersFromCsv(file), { immediate: false })

  await uploadCsv()

  if (error.value) {
    ElNotification({
      title: t('users.notifications.import.error_title'),
      message: t('users.notifications.import.error_description'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
  else {
    ElNotification({
      title: t('users.notifications.import.success_title'),
      message: t('users.notifications.import.success_description'),
      type: 'info',
      customClass: 'info',
      duration: 5500,
    })
  }
  userList.value = data.value

  fileList.value = []

  isUploadLoading.value = false
}

const handleUploadSuccess: UploadProps['onSuccess'] = () => {
  upload()
}

const generateUserImportTemplate = (): string => {
  const headers = ['FullName', 'FirstName', 'LastName', 'Email', 'Role']
  const sampleUsers = [
    ['Test User', 'Test', 'User', 'test@user.net', 'user'],
    ['Test Admin', 'Test', 'Admin', 'test@admin.net', 'admin'],
  ]

  const csvContent = [
    headers.join(','),
    ...sampleUsers.map(user => user.join(',')),
  ].join('\n')

  return csvContent
}

const downloadTemplate = () => {
  const csvContent = generateUserImportTemplate()
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', 'user_import_template.csv')
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
const getErrorMessage = (failedUser: FailedImportUser) => {
  const { t } = useI18n()

  if (failedUser.type === 'validation') {
    const field = failedUser.message[0]
    return t(`users.import.errors.validation.${field}`, { field }) || t('users.import.errors.validation.default', { field })
  }
  else if (failedUser.type === 'missing_fields') {
    return t('users.import.errors.missing_fields')
  }
  return t('users.import.errors.unknown')
}
</script>

<template>
  <div>
    <Note
      :title="t('users.import.notes_title')"
      :items="noteItems"
      :icon="NoteIcon"
    />

    <ElButton
      type="primary"
      size="small"
      @click="downloadTemplate"
    >
      <DownloadIcon size="24px" />
      {{ t('users.import.download_template') }}
    </ElButton>
    <el-upload
      v-model:file-list="fileList"
      drag
      action=""
      :show-file-list="false"
      :on-success="handleUploadSuccess"
      :before-upload="beforeUploadCheck"
      accept=".csv"
    >
      <div class="upload-file-container">
        <template v-if="!isUploadLoading">
          <UploadIcon size="55px" />
          <div class="el-upload__text">
            {{ t('users.import.drop_file') }}  <em class="fake-link">{{ t('users.import.click_to_upload') }}</em>
          </div>
        </template>
        <LlmLoader v-else />
      </div>
    </el-upload>

    <div class="template-download" />

    <div v-if="userList && (userList.successful.length || userList.failed.length)" class="grid">
      <div class="user-general-info-card">
        <div class="card-title">
          <h6>{{ t('users.import.card_title') }}</h6>
          <el-tag :type="successStatusType" size="small">
            <span class="status-dot" />  {{ t('users.import.sucess') }}
          </el-tag>
        </div>
        <div v-if="userList?.successful && userList?.successful?.length > 0" class="user-informations">
          <div
            v-for="(user, index) in userList?.successful"
            :key="index"
            class="user-info-item"
          >
            <LabelDescriptionItem
              :label="t('users.user_card.username')"
              size="small"
              :description="user.fullName"
            />
            <LabelDescriptionItem
              :label="t('users.user_card.email')"
              size="small"
              :description="user.email"
            />
            <LabelDescriptionItem
              :label="t('users.user_card.role')"
              size="small"
              :description="user.role"
            />

            <LabelDescriptionItem
              label="Status"
              size="small"
              :description="`${user.skipped ? t('users.import.new_user') : t('users.import.already_exists')}`"
            />
          </div>
        </div>
        <EmptyState
          v-else
          :title="t('users.import.success_empty_state.title')"
          :description="t('users.import.success_empty_state.description')"
        >
          <template #icon>
            <PersonQuestionMarkIcon size="44px" />
          </template>
        </EmptyState>
      </div>
      <div class="user-general-info-card">
        <div class="card-title">
          <h6>{{ t('users.import.faild_card_title') }}</h6>
          <el-tag :type="failureStatusType" size="small">
            <span class="status-dot" />  {{ t('users.import.failed') }}
          </el-tag>
        </div>
        <div v-if="userList?.failed && userList?.failed?.length > 0" class="user-informations">
          <div
            v-for="(failedUser, index) in userList?.failed"
            :key="index"
            class="user-info-item"
          >
            <LabelDescriptionItem
              :label="t('users.import.line')"
              size="small"
              :description="`${t('users.import.line_description')} ${failedUser.line.toString()}`"
            />
            <LabelDescriptionItem
              :label="t('users.import.reason')"
              size="small"
              :description="failedUser.type ? t('users.import.reason_description') : '-'"
            />
            <LabelDescriptionItem
              :label="t('users.import.error_message')"
              size="small"
              :description="getErrorMessage(failedUser)"
            />
          </div>
        </div>
        <EmptyState
          v-else
          :title="t('users.import.failed_empty_state.title')"
          :description="t('users.import.failed_empty_state.description')"
        >
          <template #icon>
            <PersonQuestionMarkIcon size="44px" />
          </template>
        </EmptyState>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.upload-file-container {
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 22px;
  &:hover {
    cursor: pointer;
  }

  & .fake-link {
    color: var(--color-blue-300);
  }
}

:deep(.barrage-dialog__close) {
  svg {
    width: 20px;
    height: 20px;
  }
}

.user-general-info-card {
  grid-column: 1/-1;
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
  border-radius: 8px;
  padding: 1rem;
}

.card-title {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 32px;
}

.user-informations {
  display: flex;
  flex-direction: column;
  gap: 32px;
  margin-top: 1rem;
}
.user-profile-item {
  grid-column: span 2;
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  text-overflow: ellipsis;
  flex: 0 0 calc(30% - 22px);
  color: var(--color-primary-900);

  svg {
    flex-shrink: 0;
  }

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

.user-info-item {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 16px;
}

.user-skipped-note {
  font-size: var(--font-size-fluid-2);
  line-height: normal;
}

.user-general-info-card {
  h6 {
    color: var(--color-primary-700);
  }
}

.details-empty-state {
  min-height: auto;
  margin-top: 32px;
}

.dark {
  .user-general-info-card {
    border: 0.5px solid var(--color-primary-700);
    background: var(--color-primary-900);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-800);

    .card-title {
      h6 {
        color: var(--color-primary-100);
      }
    }
  }

  .documents-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
