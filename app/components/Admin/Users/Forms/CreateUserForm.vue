<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import CheckIcon from '~/assets/icons/svg/check.svg'
import type { CreateUserPayload } from '~/types/users.ts'

const props = defineProps({
  resetFormTrigger: {
    type: Boolean,
    default: false,
    required: false,
  },
  hasCancelOption: {
    type: Boolean,
    default: true,
    required: false,
  },
})

const emits = defineEmits<Emits>()
const { $api } = useNuxtApp()
const { t } = useI18n()
const router = useRouter()

interface Emits {
  (event: 'userCreated'): void
  (event: 'userCreationCanceled'): void
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}

const inviteUserformRef = ref<FormInstance>()
const inviteUserform = reactive<CreateUserPayload>({
  email: '',
  fullName: '',
  firstName: '',
  lastName: '',
  role: 'user',
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
const rules = computed<FormRules<CreateUserPayload>>(() => ({
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
  return inviteUserform.role = role
}
const { execute: executeCreateUser, error: createUserError, status: createUserStatus, data: createdUserData } = await useAsyncData(() => $api.user.PostCreateUser(inviteUserform), {
  immediate: false,
})

const submitInviteUserForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate(async (valid, __) => {
    if (valid) {
      await executeCreateUser()
      if (createUserError.value) {
        if (createUserError.value?.statusCode === 409) {
          ElNotification({
            title: t('users.notifications.create_error_title'),
            message: t('users.notifications.create_error_existing_user_description'),
            type: 'error',
            customClass: 'error',
            duration: 2500,
          })
        }
        else {
          ElNotification({
            title: t('users.notifications.create_error_title'),
            message: t('users.notifications.create_error_description'),
            type: 'error',
            customClass: 'error',
            duration: 2500,
          })
        }
      }
      else {
        ElNotification({
          title: t('users.notifications.create_title'),
          message: t('users.notifications.create_message', { name: inviteUserform.fullName }),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })

        router.push(`/admin/users/${createdUserData.value?.id}`)
        emits('userCreated')
        resetForm(inviteUserformRef.value)
      }
    }
  })
}

const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}
watch(() => props.resetFormTrigger, (newVal) => {
  if (newVal) {
    resetForm(inviteUserformRef.value)
  }
})

const isCreateUserLoading = computed(() => {
  return createUserStatus.value === 'pending'
})
</script>

<template>
  <ElForm
    ref="inviteUserformRef"
    :model="inviteUserform"
    :rules="rules"
    :scroll-to-error="true"
    :scroll-into-view-options="scrollIntoViewOptions"
  >
    <div class="invite-user-form-items-wrapper">
      <p class="form-description">
        {{ t('users.invite_user_description') }}
      </p>
      <span class="role-title">{{ t('users.form.role') }}</span>
      <div class="new-user-role-wrapper">
        <template v-for="role in userRoles" :key="role.value">
          <el-card
            class="is-accent select-role-card"
            :class="{
              selected: role.value === inviteUserform.role,
            }"
            @click="selectUserRole(role.value)"
          >
            <div class="select-role-card-body">
              <div class="title-wrapper">
                <p class="role-label">
                  {{ role.label }}
                </p>
                <CheckIcon v-if="role.value === inviteUserform.role" size="22px" />
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
            v-model="inviteUserform.firstName"
            :placeholder="t('users.form.first_name_placeholder')"
            size="small"
          />
        </ElFormItem>
        <ElFormItem
          :label="t('users.form.last_name')"
          prop="lastName"
        >
          <ElInput
            v-model="inviteUserform.lastName"
            :placeholder="t('users.form.last_name_placeholder')"
            size="small"
          />
        </ElFormItem>
      </div>
      <div class="form-items-inline">
        <ElFormItem
          :label="t('users.form.email')"
          prop="email"
          size="small"
        >
          <ElInput
            v-model="inviteUserform.email"
            :placeholder="t('users.form.email_placeholder')"
            size="small"
          />
        </ElFormItem>

        <ElFormItem
          :label="t('users.form.username')"
          prop="fullName"
        >
          <ElInput
            v-model="inviteUserform.fullName"
            :placeholder="t('users.form.username_placeholder')"
            size="small"
          />
        </ElFormItem>
      </div>
      <ElFormItem class="form-item-actions">
        <div class="form-actions">
          <div class="form-actions-left">
            <el-button
              v-if="props.hasCancelOption"
              size="small"
              plain
              @click="emits('userCreationCanceled')"
            >
              {{ t('users.form.cancel') }}
            </el-button>
            <el-button
              size="small"
              :disabled="isCreateUserLoading"
              plain
              @click="resetForm(inviteUserformRef)"
            >
              {{ t('users.form.reset') }}
            </el-button>
          </div>
          <ElButton
            type="primary"
            size="small"
            :disabled="isCreateUserLoading"
            @click="submitInviteUserForm(inviteUserformRef)"
          >
            {{ t('users.form.submit') }}
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

  & .form-actions-left {
    display: flex;
    gap: 22px;
  }
}
.form-item-actions {
  padding: 0;
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
.invite-user-form-items-wrapper {
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
  .invite-user-form-items-wrapper {
    & .form-description {
      color: var(--color-primary-0);
    }
  }
}
</style>
