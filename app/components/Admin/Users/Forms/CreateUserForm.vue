<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import CheckIcon from '~/assets/icons/svg/check.svg'
import type { CreateUserPayload } from '~/types/users.ts'

const emits = defineEmits<Emits>()
interface Emits {
  (event: 'createUserFormSubmited', newUserPayload: CreateUserPayload): void
}

const { t } = useI18n()
const inviteUserformRef = ref<FormInstance>()
const inviteUserform = reactive<CreateUserPayload>({
  email: '',
  fullName: '',
  firstName: '',
  lastName: '',
  role: 'user',
})

const validateEmail = (_rule: any, value: string, callback: (error?: Error) => void) => {
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/

  if (!value) {
    callback(new Error(t('users.form.rules.invalid_email')))
  }
  else if (!emailRegex.test(value)) {
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

const selectUserRole = (role: string) => {
  return inviteUserform.role = role
}

const submitInviteUserForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate(async (valid, __) => {
    if (valid) {
      emits('createUserFormSubmited', inviteUserform)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}

const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}
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
                <CheckIcon v-if="role.value === inviteUserform.role" size="32px" />
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
          <ElInput v-model="inviteUserform.firstName" :placeholder="t('users.form.first_name_placeholder')" />
        </ElFormItem>
        <ElFormItem
          :label="t('users.form.last_name')"
          prop="lastName"
        >
          <ElInput v-model="inviteUserform.lastName" :placeholder="t('users.form.last_name_placeholder')" />
        </ElFormItem>
      </div>
      <div class="form-items-inline">
        <ElFormItem
          :label="t('users.form.email')"
          prop="email"
        >
          <ElInput v-model="inviteUserform.email" :placeholder="t('users.form.email_placeholder')" />
        </ElFormItem>

        <ElFormItem
          :label="t('users.form.username')"
          prop="fullName"
        >
          <ElInput v-model="inviteUserform.fullName" :placeholder="t('users.form.username_placeholder')" />
        </ElFormItem>
      </div>

      <ElFormItem class="form-item-actions">
        <div class="form-actions">
          <el-button
            size="large"
            plain
            @click="closeModal()"
          >
            {{ t('users.form.cancel') }}
          </el-button>

          <ElButton
            type="primary"
            size="large"
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
.add-user-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: space-between;
}
.form-item-actions {
  padding: 0;
}
.new-user-role-wrapper {
  display: flex;
  gap: 22px;
  margin-bottom: var(--spacing-fluid-m);
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
    color: var(--color-primary-0);
    font-size: var(--font-size-fluid-2);
    line-height: var(--font-size-fluid-4);
    text-align: left;
  }
}

.select-role-card {
  border: 1.5px solid var(--color-primary-300);
  &:hover {
    cursor: pointer;
  }
  &.selected {
    border: 1.5px solid var(--color-primary-600);
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
        font-size: var(--font-size-fluid-3);
      }
    }

    & .role-description {
      color: var(--color-primary-800);
      line-height: normal;
      font-size: var(--font-size-fluid-2);
    }
  }
}

.dark {
  .select-role-card {
    border: 1.5px solid var(--color-primary-600);
    &:hover {
      cursor: pointer;
    }
    &.selected {
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
}
</style>
