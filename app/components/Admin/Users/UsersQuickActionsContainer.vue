<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import AddIcon from '~/assets/icons/svg/add.svg'
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'
import type { CreateUserPayload } from '~/types/users.ts'

const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}
const usersStore = useUsersStore()
const { t } = useI18n()
const inviteUserModalOpen = ref(false)

const toggleInviteUserModal = () => {
  return inviteUserModalOpen.value = !inviteUserModalOpen.value
}
const validateEmail = (_rule: any, value: string, callback: (error?: Error) => void) => {
  const emailRegex = /^[^\s@]+@[^\s@][^\s.@]*\.[^\s@]+$/

  if (!value) {
    callback(new Error('Email is required'))
  }
  else if (!emailRegex.test(value)) {
    callback(new Error('Invalid email address'))
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
  role: '',
})

const rules = reactive<FormRules<CreateUserPayload>>({
  email: [
    { required: true, message: 'Required', trigger: 'blur' },
    { validator: validateEmail, trigger: 'blur' },
  ],
  firstName: [
    { required: true, message: 'Required', trigger: 'change' },

  ],
  lastName: [
    { required: true, message: 'Required', trigger: 'change' },

  ],
  role: [
    { required: true, message: 'Required', trigger: 'change' },
  ],
})
const { execute: AddNewUser, error } = await useAsyncData(() => usersStore.POST_CreateUser(inviteUserform), { immediate: false })

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
        await usersStore.GET_AllUsers()
        inviteUserform.email = ''
        inviteUserform.firstName = ''
        inviteUserform.lastName = ''
        inviteUserform.role = ''
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
const userRoles = [{
  label: 'Admin',
  value: 'admin',
}, {
  label: 'User',
  value: 'user',
}]

watch(
  () => [inviteUserform.firstName, inviteUserform.lastName],
  ([newFirstName, newLastName]) => {
    inviteUserform.fullName = `${newFirstName} ${newLastName}`.trim()
  },
)
</script>

<template>
  <div class="users-actions-container">
    <el-button
      type="primary"
      @click="toggleInviteUserModal()"
    >
      <AddPersonIcon />  {{ $t('users.invite_user') }}
    </el-button>
    <ClientOnly>
      <ElDialog
        v-model="inviteUserModalOpen"
        align-center
        destroy-on-close
        class="barrage-dialog--small"
        :close-icon="CloseCircleIcon"
      >
        <template #header>
          <h5> {{ $t('users.invite_user') }}</h5>
        </template>
        <ElForm
          ref="inviteUserformRef"
          :model="inviteUserform"
          :rules="rules"
          :scroll-to-error="true"
          :scroll-into-view-options="scrollIntoViewOptions"
        >
          <div class="start-end-form-items-wrapper">
            <ElFormItem
              label="First Name"
              prop="firstName"
            >
              <ElInput v-model="inviteUserform.firstName" placeholder="Enter first name" />
            </ElFormItem>
            <ElFormItem
              label="Last Name"
              prop="lastName"
            >
              <ElInput v-model="inviteUserform.lastName" placeholder="Enter last name" />
            </ElFormItem>

            <ElFormItem
              label="Email"
              prop="email"
            >
              <ElInput v-model="inviteUserform.email" placeholder="Enter email" />
            </ElFormItem>

            <ElFormItem
              label="Role"
              prop="role"
            >
              <ElSelect
                v-model="inviteUserform.role"
                placeholder="Select role"
              >
                <ElOption
                  v-for="userRole in userRoles"
                  :key="userRole.value"
                  :label="userRole.label"
                  :value="userRole.value"
                />
              </ElSelect>
            </ElFormItem>

            <ElFormItem>
              <div class="form-actions">
                <el-button @click="toggleInviteUserModal()">
                  Cancel
                </el-button>

                <ElButton
                  type="primary"
                  @click="submitInviteUserForm(inviteUserformRef)"
                >
                  Submit
                </ElButton>
              </div>
            </ElFormItem>
          </div>
        </ElForm>
      </ElDialog>
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
.users-actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 1.5rem;

  & h6 {
    color: var(--color-primary-800);
  }
  & .users-actions-wrapper {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    margin-bottom: 1.5rem;
  }
}
.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
}
.dark {
  .users-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
