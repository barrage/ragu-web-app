<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import AddIcon from '~/assets/icons/svg/add.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import InfoIcon from '~/assets/icons/svg/info.svg'
import WhatsAppLogoIcon from '~/assets/icons/svg/whatsapp-chat.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import { isValidPhoneNumber } from '~/utils/useValidation'
import type { WhatsAppNumber } from '~/types/whatsapp.ts'
import EmptyChatIcon from '~/assets/icons/svg/chat-warning.svg'

type Types = 'add' | 'edit' | 'delete'

// CONSTANTS & STATES

const { $api } = useNuxtApp()
const { t } = useI18n()
const dialog = ref<{
  isOpened: boolean
  selectedNumber: WhatsAppNumber | undefined
}>({
  isOpened: false,
  selectedNumber: undefined,
})
const isPhoneNumberValid = ref(true)
const isEditPhoneNumberValid = ref(true)
const editingPhoneNumber = ref<WhatsAppNumber | undefined>(undefined)

// FORM

const formRef = ref<FormInstance>()
const form = reactive<{
  phoneNumber: string
  editPhoneNumber: string
}>({
  phoneNumber: '',
  editPhoneNumber: '',
})
const rules = computed<FormRules>(() => ({
  phoneNumber: [
    {
      validator: (rule, value, callback) => {
        if (value.length) {
          if (!isValidPhoneNumber(value)) {
            isPhoneNumberValid.value = false
            callback(new Error(t('settings.rules.mobile.wrong_number')))
          }
          else {
            isPhoneNumberValid.value = true
            callback()
          }
        }
        else {
          isPhoneNumberValid.value = true
          callback()
        }
      },
      trigger: 'change',
    },
  ],
  editPhoneNumber: [
    {
      validator: (rule, value, callback) => {
        if (value.length) {
          if (!isValidPhoneNumber(value)) {
            isEditPhoneNumberValid.value = false
            callback(new Error(t('settings.rules.mobile.wrong_number')))
          }
          else {
            isEditPhoneNumberValid.value = true
            callback()
          }
        }
        else {
          isEditPhoneNumberValid.value = true
          callback()
        }
      },
      trigger: 'change',
    },
  ],
}))

// API CALLS

const { execute: getPhoneNumbers, error: getPhoneNumbersError, data: getPhoneNumbersData, status: getPhoneNumberState } = await useAsyncData(() => $api.whatsApp.UserGetWhatsAppNumbers(), { immediate: false })
const { execute: addNumber, error: addNumberError, status: addNumberStatus } = await useAsyncData(() => $api.whatsApp.UserPostWhatsAppNumber(String(form.phoneNumber)), { immediate: false })
const { execute: editNumber, error: editNumberError, status: editNumberStatus } = await useAsyncData(() => $api.whatsApp.UserPutWhatsAppNumber(String(form.editPhoneNumber), String(editingPhoneNumber.value?.id)), { immediate: false })
const { execute: deleteNumber, error: deleteNumberError, status: deleteNumberStatus } = await useAsyncData(() => $api.whatsApp.UserDeleteWhatsAppNumber(String(dialog.value.selectedNumber?.id)), { immediate: false })

errorHandler(getPhoneNumbersError)

// FUNCTIONS

onMounted(() => getPhoneNumbers())

function handleEdit(phoneNumber: WhatsAppNumber | undefined) {
  editingPhoneNumber.value = phoneNumber
  form.editPhoneNumber = phoneNumber?.phoneNumber as string
}

function handleCancelingEdit() {
  editingPhoneNumber.value = undefined
  form.editPhoneNumber = ''
}

function handleOpenDialog(phoneNumber?: WhatsAppNumber | undefined) {
  dialog.value = { isOpened: true, selectedNumber: phoneNumber }
}

function handleCloseDialog() {
  setTimeout(() =>
    dialog.value = { isOpened: false, selectedNumber: undefined }, 250)
}

async function handleAddNumber(formEl: FormInstance | undefined) {
  if (!formEl) { return }
  await formEl.validate(async (valid) => {
    if (valid) {
      await addNumber()
      if (addNumberError.value) {
        if (addNumberError.value?.statusCode === 409) {
          showNumberAlreadyExistError('add')
        }
        else { showErrorNotification('add') }
      }
      else {
        getPhoneNumbers()
        form.phoneNumber = ''
        showSuccessNotification('add')
      }
    }
  })
}

async function handleEditNumber() {
  if (!formRef.value) { return }
  await formRef.value.validate(async (valid) => {
    if (valid) {
      await editNumber()
      if (editNumberError.value) {
        if (editNumberError.value?.statusCode === 409) {
          showNumberAlreadyExistError('edit')
        }
        else { showErrorNotification('edit') }
      }
      else {
        handleCancelingEdit()
        getPhoneNumbers()
        showSuccessNotification('edit')
      }
    }
  })
}

async function handleDeleteNumber(formEl: FormInstance | undefined) {
  await deleteNumber()
  if (deleteNumberError.value) { showErrorNotification('delete') }
  else {
    getPhoneNumbers()
    showSuccessNotification('delete')
  }
  handleCloseDialog(formEl)
}

function showNumberAlreadyExistError(type: 'add' | 'edit') {
  ElNotification({
    title: t(`users.phone_numbers.${type}.error_409_title`),
    message: t(`users.phone_numbers.${type}.error_409_description`),
    type: 'error',
    customClass: 'error',
    duration: 2500,
  })
}

function showErrorNotification(type: Types) {
  ElNotification({
    title: t(`users.phone_numbers.${type}.error_title`),
    message: t(`users.phone_numbers.${type}.error_description`),
    type: 'error',
    customClass: 'error',
    duration: 2500,
  })
}

function showSuccessNotification(type: Types) {
  ElNotification({
    title: t(`users.phone_numbers.${type}.success_title`),
    message: t(`users.phone_numbers.${type}.success_description`),
    type: 'success',
    customClass: 'success',
    duration: 2500,
  })
}
</script>

<template>
  <div class="header-wrapper">
    <div class="subtitle-wrapper main-text-color">
      <WhatsAppLogoIcon size="24" />
      <h6 class="main-text-color">
        {{ $t('settings.whatsapp_numbers_management') }}
      </h6>
      <LlmTooltip :content="$t('settings.labels.mobile_number_info')">
        <InfoIcon class="icon" size="24" />
      </LlmTooltip>
    </div>
  </div>

  <template v-if="getPhoneNumberState === 'pending'">
    <div class="whatsapp-numbers-loader">
      <MeetUpLoader />
    </div>
  </template>

  <template v-else>
    <div v-if="getPhoneNumbersData?.length" class="whatsapp-numbers-container">
      <div
        v-for="numberData in getPhoneNumbersData"
        :key="numberData.id"
        class="number-card grid"
      >
        <div
          v-if="editingPhoneNumber?.id !== numberData.id"
          class="whatsapp-number-wrapper"
        >
          <WhatsAppLogoIcon size="24" />
          <p class="whatsapp-number">
            {{ `+${numberData.phoneNumber}` }}
          </p>
        </div>
        <ElForm
          v-else
          ref="formRef"
          :model="form"
          :rules="rules"
          class="edit-form"
        >
          <ElFormItem prop="editPhoneNumber" :style="`padding-bottom: ${isEditPhoneNumberValid ? '0px' : '32px'};`">
            <template #label>
              <div class="add-phone-number-label-wrapper">
                <WhatsAppLogoIcon size="24" />
                {{ `+${numberData.phoneNumber}` }}
              </div>
            </template>
            <div class="add-number-form-item-wrapper">
              <ElInput
                v-model="form.editPhoneNumber"
                :placeholder="$t('settings.placeholders.mobile_number')"
                class="add-number-form-item-input"
              >
                <template #prefix>
                  <p class="main-text-color">
                    +
                  </p>
                </template>
              </ElInput>
              <ElButton @click="handleCancelingEdit">
                {{ $t('settings.cancel') }}
              </ElButton>
              <ElButton
                type="primary"
                :loading="editNumberStatus === 'pending'"
                :disabled="!form.editPhoneNumber?.length"
                @click="handleEditNumber(formRef)"
              >
                {{ $t('settings.edit') }}
              </ElButton>
            </div>
          </ElFormItem>
        </ElForm>

        <div v-if="editingPhoneNumber?.id !== numberData.id" class="whatsapp-number-actions">
          <LlmTooltip :content="t('users.phone_numbers.edit.title')">
            <ElButton
              type="primary"
              plain
              @click="handleEdit(numberData)"
            >
              <EditIcon size="24" />
            </ElButton>
          </LlmTooltip>
          <LlmTooltip :content="t('users.phone_numbers.delete.title')">
            <ElButton
              type="danger"
              plain
              @click="handleOpenDialog(numberData)"
            >
              <DeleteIcon size="24" />
            </ElButton>
          </LlmTooltip>
        </div>
      </div>

      <ElForm
        ref="formRef"
        :model="form"
        :rules="rules"
        class="number-card grid"
      >
        <ElFormItem prop="phoneNumber" :style="`padding-bottom: ${isPhoneNumberValid ? '0px' : '32px'};`">
          <template #label>
            <div class="add-phone-number-label-wrapper">
              <AddIcon size="24" />
              {{ $t('users.phone_numbers.add.title') }}
            </div>
          </template>
          <div class="add-number-form-item-wrapper">
            <ElInput
              v-model="form.phoneNumber"
              :placeholder="$t('settings.placeholders.mobile_number')"
              class="add-number-form-item-input"
            >
              <template #prefix>
                <p class="main-text-color">
                  +
                </p>
              </template>
            </ElInput>
            <ElButton
              type="primary"
              :loading="addNumberStatus === 'pending'"
              :disabled="!form.phoneNumber?.length"
              @click="handleAddNumber(formRef)"
            >
              {{ $t('settings.save') }}
            </ElButton>
          </div>
        </ElFormItem>
      </ElForm>
    </div>

    <EmptyState
      v-else
      :title="$t('users.phone_numbers.empty_data')"
      :description="$t('users.phone_numbers.empty_data_description')"
    >
      <template #icon>
        <EmptyChatIcon size="44px" />
      </template>
    </EmptyState>
  </template>

  <ElDialog
    v-model="dialog.isOpened"
    align-center
    class="barrage-dialog--small"
    :close-icon="CloseCircleIcon"
    :close-on-click-modal="false"
    @close="handleCloseDialog(formRef)"
  >
    <template #header>
      <div class="subtitle-wrapper">
        <WhatsAppLogoIcon size="24" />
        <h5>{{ $t('users.phone_numbers.delete.title') }}</h5>
      </div>
    </template>
    <p>
      {{ $t('users.phone_numbers.delete.description') }}
    </p>

    <div class="delete-phone-number-wrapper main-text-color">
      <WhatsAppLogoIcon size="24" />
      <p class="main-text-color">
        {{ `+${dialog.selectedNumber?.phoneNumber}` }}
      </p>
    </div>

    <template #footer>
      <ElButton type="default" @click="dialog.isOpened = false">
        {{ $t('settings.cancel') }}
      </ElButton>
      <ElButton
        type="danger"
        :loading="deleteNumberStatus === 'pending'"
        @click="handleDeleteNumber(formRef)"
      >
        {{ $t('settings.delete') }}
      </ElButton>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.header-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.whatsapp-numbers-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-fluid-3-xl);
  padding-bottom: 100px;
}

.subtitle-wrapper {
  display: flex;
  align-items: center;
  gap: var(--spacing-fluid-xs);

  .icon {
    cursor: pointer;
  }
}

.main-text-color {
  color: var(--color-primary-900);
}

.delete-phone-number-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px;
}

.whatsapp-numbers-container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-fluid-s);
  width: 100%;
  border-radius: 10px;
  overflow: hidden;

  .edit-form {
    grid-column: span 12;
  }

  .number-card {
    border: 0.5px solid var(--color-primary-300);
    background: var(--color-primary-0);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
    border-radius: 16px;
    padding: 1rem;

    .add-phone-number-label-wrapper {
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .add-number-form-item-wrapper {
      display: flex;
      align-items: center;
      gap: var(--spacing-fluid-s);

      .add-number-form-item-input {
        width: 100%;
      }
    }

    .whatsapp-number-actions {
      grid-column: 11/-1;
      display: flex;
      gap: 12px;
      justify-content: flex-end;
    }

    .whatsapp-number-wrapper {
      grid-column: span 3;
      align-items: center;
      text-overflow: ellipsis;
      display: flex;
      min-width: fit-content;
      gap: 6px;
      color: var(--color-primary-800);
    }

    .whatsapp-number {
      margin: 0;
      font-size: var(--font-size-fluid-2);
      line-height: normal;
      font-weight: var(--font-weight-bold);
      color: var(--color-primary-900);
    }
  }
}

.mobile-number-label {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
}

.dark {
  .whatsapp-numbers-container {
    .number-card {
      border: 1px solid var(--color-primary-500);
      background-color: var(--color-primary-700);
      box-shadow: 0px 2px 6px 0px var(--color-primary-600);
      & .whatsapp-number-wrapper {
        color: var(--color-primary-100);
      }
      & .whatsapp-number {
        color: var(--color-primary-0);
      }
    }
  }

  .main-text-color {
    color: var(--color-primary-0);
  }
}
</style>
