<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { EditUserPayload, User } from '~/types/users'
import CheckIcon from '~/assets/icons/svg/check.svg'

const props = withDefaults(
  defineProps<{
    selectedUser: User | null
    resetFormTrigger: boolean
    hasCancelOption: boolean
  }>(),
  {
    resetFormTrigger: false,
    hasCancelOption: true,
  },
)

const emits = defineEmits<Emits>()
const { $api } = useNuxtApp()
const { t } = useI18n()

interface Emits {
  (event: 'userEdited'): void
  (event: 'userEditCanceled'): void
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}

const editUserFormRef = ref<FormInstance>()

const editUserForm = reactive<EditUserPayload>({
  active: false,
  email: '',
  fullName: '',
  firstName: '',
  lastName: '',
  role: '',
})

const userRoles = computed(() => [
  {
    label: t('users.roles.user_label'),
    description: t('users.roles.user_description'),
    value: 'user',
  },
  {
    label: t('users.roles.admin_label'),
    description: t('users.roles.admin_description'),
    value: 'admin',
  },
])
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}

const validateEmail = (_rule: any, value: string, callback: (error?: Error) => void) => {
  if (!value) {
    callback(new Error(t('users.form.rules.invalid_email')))
  }
  else if (!isValidEmail(value)) {
    callback(new Error(t('users.form.rules.invalid_email')))
  }
  else {
    callback()
  }
}

const rules = computed<FormRules<EditUserPayload>>(() => ({
  email: [
    { required: true, message: t('users.form.rules.required'), trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' },
  ],
  firstName: [
    { required: true, message: t('users.form.rules.required'), trigger: 'blur' },
  ],
  lastName: [
    { required: true, message: t('users.form.rules.required'), trigger: 'blur' },
  ],
  fullName: [
    { required: true, message: t('users.form.rules.required'), trigger: 'blur' },
  ],
  role: [
    { required: true, message: t('users.form.rules.required'), trigger: 'blur' },
  ],
}))

const selectUserRole = (role: string) => {
  return editUserForm.role = role
}

const { execute: executeEditUser, error: editUserError, status: editUserStatus } = await useAsyncData(() => $api.user.PutEditUser(props.selectedUser!.id, editUserForm), {
  immediate: false,
})

const submitEditUserForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  await formEl.validate(async (valid, __) => {
    if (valid) {
      await executeEditUser()
      if (editUserError.value) {
        ElNotification({
          title: t('users.edit_user.notifications.error_title'),
          message: t('users.edit_user.notifications.error_description'),
          type: 'error',
          customClass: 'error',
          duration: 2500,
        })
      }

      else {
        ElNotification({
          title: t('users.edit_user.notifications.success_title'),
          message: t('users.edit_user.notifications.success_description'),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })
        emits('userEdited')
        resetForm(editUserFormRef.value)
      }
    }
  })
}

const prefillEditUserForm = () => {
  if (props.selectedUser) {
    editUserForm.active = props.selectedUser.active
    editUserForm.email = props.selectedUser.email
    editUserForm.firstName = props.selectedUser.firstName
    editUserForm.lastName = props.selectedUser.lastName
    editUserForm.fullName = props.selectedUser.fullName
    editUserForm.role = props.selectedUser.role
  }
}
watch(
  () => props.selectedUser,
  () => {
    prefillEditUserForm()
  },
)

onMounted(() => {
  prefillEditUserForm()
})

watch(() => props.resetFormTrigger, (newVal) => {
  if (newVal) {
    resetForm(editUserFormRef.value)
  }
})

const isEditUserLoading = computed(() => {
  return editUserStatus.value === 'pending'
})
</script>

<template>
  <ElForm
    ref="editUserFormRef"
    :model="editUserForm"
    :rules="rules"
    :scroll-to-error="true"
    :scroll-into-view-options="scrollIntoViewOptions"
  >
    <div class="edit-user-form-items-wrapper">
      <span class="role-title">{{ t('users.form.role') }}</span>
      <div class="new-user-role-wrapper">
        <template v-for="role in userRoles" :key="role.value">
          <el-card
            class="is-accent select-role-card"
            :class="{
              selected: role.value === editUserForm.role,
            }"
            @click="selectUserRole(role.value)"
          >
            <div class="select-role-card-body">
              <div class="title-wrapper">
                <p class="role-label">
                  {{ role.label }}
                </p>
                <CheckIcon v-if="role.value === editUserForm.role" size="22px" />
              </div>

              <span class="role-description">  {{ role.description }}</span>
            </div>
          </el-card>
        </template>
      </div>
      <div class="form-items-inline">
        <ElFormItem
          :label="t('users.form.first_name')"
          prop="firstName"
        >
          <ElInput
            v-model="editUserForm.firstName"
            :placeholder="t('users.form.first_name_placeholder')"
            size="small"
          />
        </ElFormItem>
        <ElFormItem
          :label="t('users.form.last_name')"
          prop="lastName"
        >
          <ElInput
            v-model="editUserForm.lastName"
            :placeholder="t('users.form.last_name_placeholder')"
            size="small"
          />
        </ElFormItem>
      </div>
      <div class="form-items-inline">
        <ElFormItem
          :label="t('users.form.email')"
          prop="email"
        >
          <ElInput
            v-model="editUserForm.email"
            :placeholder="t('users.form.email_placeholder')"
            size="small"
          />
        </ElFormItem>
        <ElFormItem
          :label="t('users.form.username')"
          prop="fullName"
        >
          <ElInput
            v-model="editUserForm.fullName"
            :placeholder="t('users.form.username_placeholder')"
            size="small"
          />
        </ElFormItem>
      </div>

      <ElFormItem>
        <div class="form-actions">
          <div class="form-actions-left">
            <el-button
              v-if="props.hasCancelOption"
              size="small"
              plain
              @click="emits('userEditCanceled')"
            >
              {{ t('users.edit_user.cancel') }}
            </el-button>
            <el-button
              size="small"
              :disabled="isEditUserLoading"
              plain
              @click="resetForm(editUserFormRef)"
            >
              {{ t('users.form.reset') }}
            </el-button>
          </div>
          <ElButton
            type="primary"
            size="small"
            :disabled="isEditUserLoading"
            @click="submitEditUserForm(editUserFormRef)"
          >
            {{ t('users.edit_user.confirm') }}
          </ElButton>
        </div>
      </ElFormItem>
    </div>
  </ElForm>
</template>

<style lang="scss" scoped>
.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
  & .form-actions-left {
    display: flex;
    gap: 22px;
  }
}
.new-user-role-wrapper {
  display: flex;
  gap: 22px;
  margin-bottom: var(--spacing-fluid-m);
}
.role-title {
  color: var(--form-item-label-color);
  font-size: var(--font-size-fluid-2);
}

.edit-user-modal-body {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.dark {
  .select-role-card {
    background: var(--color-primary-800);
    border: 1.5px solid var(--color-primary-600);
    &:hover {
      cursor: pointer;
    }
    &.selected {
      background: var(--color-primary-700);
      border: 1.5px solid var(--color-primary-0);
    }

    & .select-role-card-body {
      & .title-wrapper {
        .role-label {
          color: var(--color-primary-0);
        }
      }

      & .role-description {
        color: var(--color-primary-100);
      }
    }
  }
  .edit-user-form-items-wrapper {
    & .form-description {
      color: var(--color-primary-0);
    }
  }
}
.edit-user-form-items-wrapper {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-fluid-xs);
  & .form-items-inline {
    display: flex;
    gap: var(--spacing-fluid-xs);
  }

  & .form-description {
    color: var(--color-primary-800);
    font-size: var(--font-size-fluid-2);
    line-height: var(--font-size-fluid-4);
    text-align: left;
  }
}
.select-role-card {
  border: 1.5px solid var(--color-primary-300);
  background: var(--color-primary-200);
  transition: all 0.2s ease-in-out;
  &:hover {
    cursor: pointer;
  }
  &.selected {
    border: 1.5px solid var(--color-primary-600);
    background: var(--color-primary-100);
  }

  & .select-role-card-body {
    display: flex;
    flex-direction: column;
    gap: 12px;

    & .title-wrapper {
      display: flex;
      gap: 22px;
      justify-content: space-between;
      align-items: center;

      .role-label {
        color: var(--color-primary-800);
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-fluid-2);
      }
    }

    & .role-description {
      color: var(--color-primary-800);
      line-height: normal;
      font-size: var(--font-size-fluid-1);
    }
  }
}
</style>
