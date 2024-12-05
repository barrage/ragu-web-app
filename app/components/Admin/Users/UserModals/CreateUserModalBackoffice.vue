<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'
import CheckIcon from '~/assets/icons/svg/check.svg'
import type { CreateUserPayload } from '~/types/users.ts'

const props = defineProps<{
  isOpen: boolean
}>()

const emits = defineEmits<Emits>()
interface Emits {
  (event: 'closeModal'): void
  (event: 'userInvited'): void
}
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}
const router = useRouter()
const usersStore = useUsersStore()
const { t } = useI18n()
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}
const inviteUserModalOpen = ref(props.isOpen)

watch(() => props.isOpen, (newVal) => {
  inviteUserModalOpen.value = newVal
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

const inviteUserformRef = ref<FormInstance>()
const inviteUserform = reactive<CreateUserPayload>({
  email: '',
  fullName: '',
  firstName: '',
  lastName: '',
  role: 'user',
})

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
const { execute: AddNewUser, error, data: newUserData } = await useAsyncData(() => usersStore.POST_CreateUser(inviteUserform), { immediate: false })

const submitInviteUserForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  await formEl.validate(async (valid, __) => {
    if (valid) {
      await AddNewUser()
      inviteUserModalOpen.value = false
      if (error.value) {
        if (error.value?.statusCode === 409) {
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
        router.push(`/admin/users/${newUserData.value?.id}`)
        resetForm(inviteUserformRef.value)
        emits('userInvited')
        ElNotification({
          title: t('users.notifications.create_title'),
          message: t('users.notifications.create_message', { name: usersStore.selectedUser?.fullName }),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })
      }
    }
  })
}

const closeModal = () => {
  inviteUserModalOpen.value = false
  resetForm(inviteUserformRef.value)
  emits('closeModal')
}

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
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="inviteUserModalOpen"
      align-center
      destroy-on-close
      class="barrage-dialog--medium"
      :close-icon="CloseCircleIcon"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      @close="closeModal()"
    >
      <template #header>
        <div class="add-user-modal-header">
          <AddPersonIcon size="42px" />
          <h5> {{ $t('users.invite_user') }}</h5>
        </div>
      </template>

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
    </ElDialog>
  </ClientOnly>
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
