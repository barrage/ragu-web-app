<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import WhatsAppLogoIcon from '~/assets/icons/svg/whatsapp-chat.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import InfoIcon from '~/assets/icons/svg/info.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import EmptyChatIcon from '~/assets/icons/svg/chat-warning.svg'
import { useWhatsAppStore } from '~/stores/whatsapp'
import { isValidPhoneNumber } from '~/utils/useValidation'
import type { WhatsAppNumber } from '~/types/whatsapp'
import type { User } from '~/types/users'
import LlmTooltip from '~/components/shared/LlmTooltip.vue'

type ModalTypes = 'add' | 'edit' | 'delete'

// CONSTANTS & STATES

const props = defineProps<{
  user: User | null | undefined
}>()
const { $api } = useNuxtApp()
const { t } = useI18n()
const selectedNumber = ref<WhatsAppNumber>()
const whatsAppStore = useWhatsAppStore()
const { reloadBOWhatsAppNumbers } = storeToRefs(whatsAppStore)
const modal = ref<{
  isOpened: boolean
  type: ModalTypes
  phoneNumber: WhatsAppNumber | undefined
}>({
  isOpened: false,
  type: 'add',
  phoneNumber: undefined,
})

// FORM

const formRef = ref<FormInstance>()
const form = reactive<{
  phoneNumber: string | null
}>({
  phoneNumber: null,
})
const rules = computed<FormRules>(() => ({
  phoneNumber: [
    {
      validator: (rule, value, callback) => {
        if (!isValidPhoneNumber(value)) { callback(new Error(t('settings.rules.mobile.wrong_number'))) }
        else { callback() }
      },
      trigger: 'change',
    },
  ],
}))

// API CALLS

const { execute: getPhoneNumbers, error: getPhoneNumbersError, data: phoneNumbers, status: getPhoneNumbersStatus } = useAsyncData(() => $api.whatsApp.BoGetWhatsAppNumbers(String(props.user?.id)), { immediate: false })
const { execute: addNewPhoneNumber, error: addNewPhoneNumberError, status: addPhoneNumberStatus } = useAsyncData(() => $api.whatsApp.BoPostWhatsAppNumber(String(props.user?.id), String(form.phoneNumber)), { immediate: false })
const { execute: editPhoneNumber, error: editPhoneNumberError, status: editPhoneNumberStatus } = useAsyncData(() => $api.whatsApp.BoPutWhatsAppNumber(String(props.user?.id), String(form.phoneNumber), String(selectedNumber.value?.id)), { immediate: false })
const { execute: deletePhoneNumber, error: deletePhoneNumberError, status: deletePhoneNumberStatus } = useAsyncData(() => $api.whatsApp.BoDeleteWhatsAppNumber(String(props.user?.id), String(selectedNumber.value?.id)), { immediate: false })

errorHandler(getPhoneNumbersError)

// WATCHERS

watch(() => reloadBOWhatsAppNumbers.value, (newValue) => {
  if (newValue) {
    getPhoneNumbers()
    whatsAppStore.resetReloadBOWhatsAppNumbers()
  }
})

// FUNCTIONS

onMounted(() => getPhoneNumbers())

function openDialog(type: ModalTypes, numberData?: WhatsAppNumber) {
  if (numberData) { selectedNumber.value = numberData }
  if (type === 'edit') { form.phoneNumber = numberData?.phoneNumber || '' }
  modal.value = {
    isOpened: true,
    type,
    phoneNumber: numberData,
  }
}

function closeDialog() {
  if (modal.value.type === 'edit' || modal.value.type === 'add') { form.phoneNumber = '' }
  modal.value = {
    isOpened: false,
    type: 'add',
    phoneNumber: undefined,
  }
  selectedNumber.value = undefined
}

async function handleAddWhatsAppNumber(formEl: FormInstance | undefined) {
  if (!formEl) { return }
  await formEl.validate(async (valid) => {
    if (valid) {
      await addNewPhoneNumber()
      modal.value.isOpened = false
      if (addNewPhoneNumberError.value) {
        if (addNewPhoneNumberError.value?.statusCode === 409) {
          showNumberAlreadyExistError('add')
        }
        else { showErrorNotification('add') }
      }
      else {
        getPhoneNumbers()
        formEl?.resetFields()
        showSuccessNotification('add')
      }
    }
  })
}

async function handleEditWhatsAppNumber(formEl: FormInstance | undefined) {
  if (!formEl) { return }
  await formEl.validate(async (valid) => {
    if (valid) {
      await editPhoneNumber()
      modal.value.isOpened = false
      if (editPhoneNumberError.value) {
        if (editPhoneNumberError.value?.statusCode === 409) {
          showNumberAlreadyExistError('edit')
        }
        else { showErrorNotification('edit') }
      }
      else {
        getPhoneNumbers()
        formEl?.resetFields()
        showSuccessNotification('edit')
      }
    }
  })
}

async function handleDeleteWhatsAppNumber() {
  await deletePhoneNumber()
  modal.value.isOpened = false
  if (deletePhoneNumberError.value) { showErrorNotification('delete') }
  else {
    getPhoneNumbers()
    showSuccessNotification('delete')
  }
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

function showErrorNotification(type: 'add' | 'edit' | 'delete') {
  ElNotification({
    title: t(`users.phone_numbers.${type}.error_title`),
    message: t(`users.phone_numbers.${type}.error_description`),
    type: 'error',
    customClass: 'error',
    duration: 2500,
  })
}

function showSuccessNotification(type: 'add' | 'edit' | 'delete') {
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
  <section class="user-whatsapp-numbers-section">
    <div class="heading">
      <div class="title-wrapper">
        <WhatsAppLogoIcon size="36px" />
        <h4 class="title">
          {{ $t('users.phone_numbers.title') }}
        </h4>
        <LlmTooltip :content="$t('settings.labels.mobile_number_info')">
          <InfoIcon class="hover-pointer" size="20px" />
        </LlmTooltip>
      </div>
      <ElButton v-if="phoneNumbers?.length" @click="openDialog('add')">
        <AddIcon />
        {{ $t('users.phone_numbers.add_btn_label') }}
      </ElButton>
    </div>

    <template v-if="getPhoneNumbersStatus === 'pending'">
      <div class="whatsapp-numbers-loader">
        <MeetUpLoader />
      </div>
    </template>

    <div
      v-else-if="phoneNumbers?.length"
      class="numbers-container"
    >
      <div
        v-for="numberData in phoneNumbers"
        :key="numberData.id"
        class="number-card grid"
      >
        <div class="whatsapp-number-wrapper">
          <WhatsAppLogoIcon size="24" />
          <p class="whatsapp-number">
            {{ `+${numberData.phoneNumber}` }}
          </p>
        </div>
        <div class="whatsapp-number-actions">
          <LlmTooltip :content="$t('users.phone_numbers.edit.title')">
            <ElButton
              type="primary"
              plain
              @click="openDialog('edit', numberData)"
            >
              <EditIcon />
            </ElButton>
          </LlmTooltip>
          <LlmTooltip :content="$t('users.phone_numbers.delete.title')">
            <ElButton
              type="danger"
              plain
              @click="openDialog('delete', numberData)"
            >
              <DeleteIcon />
            </ElButton>
          </LlmTooltip>
        </div>
      </div>
    </div>

    <EmptyState
      v-else
      :title="$t('users.phone_numbers.empty_data')"
      :description="$t('users.phone_numbers.empty_data_description')"
    >
      <template #icon>
        <EmptyChatIcon size="44px" />
      </template>
      <template #cta>
        <ElButton @click="modal.isOpened = true">
          <AddIcon /> {{ $t('users.phone_numbers.add.title') }}
        </ElButton>
      </template>
    </EmptyState>
  </section>

  <ElDialog
    v-model="modal.isOpened"
    destroy-on-close
    align-center
    class="barrage-dialog--small"
    :close-icon="CloseCircleIcon"
    :close-on-click-modal="false"
    @close="closeDialog"
  >
    <template #header>
      <div class="number-modal-header">
        <WhatsAppLogoIcon size="42px" />
        <h5>
          {{
            modal.type === 'add' ? $t('users.phone_numbers.add.title')
            : modal.type === 'edit' ? $t('users.phone_numbers.edit.title')
              : $t('users.phone_numbers.delete.title')
          }}
        </h5>
      </div>
    </template>

    <p>
      {{
        modal.type === 'add' ? $t('settings.labels.mobile_number_info')
        : modal.type === 'edit' ? $t('users.phone_numbers.edit.description')
          : $t('users.phone_numbers.delete.description')
      }}
    </p>

    <ElForm
      v-if="modal.type === 'add'"
      ref="formRef"
      :model="form"
      :rules="rules"
    >
      <ElFormItem
        prop="phoneNumber"
        :label="$t('settings.labels.mobile_number')"
      >
        <ElInput
          v-model="form.phoneNumber"
          placeholder="385 12 3456 789"
        >
          <template #prefix>
            <p class="input-prefix-color">
              +
            </p>
          </template>
        </ElInput>
      </ElFormItem>
    </ElForm>

    <ElForm
      v-else-if="modal.type === 'edit'"
      ref="formRef"
      :model="form"
      :rules="rules"
    >
      <ElFormItem
        prop="phoneNumber"
        :label="$t('settings.labels.mobile_number')"
      >
        <ElInput
          v-model="form.phoneNumber"
          :placeholder="$t('settings.placeholders.mobile_number')"
        >
          <template #prefix>
            <p class="input-prefix-color">
              +
            </p>
          </template>
        </ElInput>
      </ElFormItem>
    </ElForm>

    <div v-else class="delete-phone-number-wrapper">
      <WhatsAppLogoIcon size="24" />
      <p class="delete-phone-number-text">
        {{ `+${selectedNumber?.phoneNumber}` }}
      </p>
    </div>

    <div class="form-actions">
      <ElButton @click="modal.isOpened = false">
        {{ $t('users.phone_numbers.cancel') }}
      </ElButton>
      <ElButton
        :type="modal.type === 'delete' ? 'danger' : 'primary'"
        :loading="addPhoneNumberStatus === 'pending' || editPhoneNumberStatus === 'pending' || deletePhoneNumberStatus === 'pending' "
        @click="modal.type === 'add' ? handleAddWhatsAppNumber(formRef)
          : modal.type === 'edit' ? handleEditWhatsAppNumber(formRef)
            : handleDeleteWhatsAppNumber()
        "
      >
        {{ modal.type === 'add' ? $t('users.phone_numbers.add.btn_label')
          : modal.type === 'edit' ? $t('users.phone_numbers.edit.btn_label')
            : $t('users.phone_numbers.delete.btn_label')
        }}
      </ElButton>
    </div>
  </ElDialog>
</template>

<style lang="scss" scoped>
.user-whatsapp-numbers-section {
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
  padding-bottom: 2rem;

  .heading {
    display: flex;
    gap: 2rem;
    justify-content: space-between;
    align-items: center;
    padding-block: 1rem;
    margin: 1rem;
  }

  .title-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    color: var(--color-primary-900);
    .title {
      color: var(--color-primary-800);
      font-size: var(--font-size-fluid-4);
      font-weight: var(--font-weight-bold);
    }
  }

  .whatsapp-numbers-loader {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: var(--spacing-fluid-3-xl);
    padding-bottom: 100px;
  }

  .numbers-container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    border-radius: 10px;
    overflow: hidden;

    .number-card {
      border: 0.5px solid var(--color-primary-300);
      background: var(--color-primary-0);
      box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
      border-radius: 16px;
      padding: 1rem;

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
}

.hover-pointer {
  cursor: pointer;
}

.input-prefix-color {
  color: var(--color-primary-900);
}

.number-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
}

.delete-phone-number-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-primary-900);
  gap: 8px;
  .delete-phone-number-text {
    color: var(--color-primary-900);
  }
}

.dark {
  .title-wrapper {
    color: var(--color-primary-100);
    .title {
      color: var(--color-primary-100);
    }
  }

  .input-prefix-color {
    color: var(--color-primary-0);
  }

  .delete-phone-number-wrapper {
    color: var(--color-primary-0);
    .delete-phone-number-text {
      color: var(--color-primary-0);
    }
  }

  .numbers-container {
    .number-card {
      border: 0.5px solid var(--color-primary-700);
      background-color: var(--color-primary-900);
      box-shadow: 0px 2px 6px 0px var(--color-primary-800);
      & .whatsapp-number-wrapper {
        color: var(--color-primary-100);
      }
      & .whatsapp-number {
        color: var(--color-primary-0);
      }
    }
  }
}
</style>
