<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import type { EditUserPayload, User } from '~/types/users'
import EditIcon from '~/assets/icons/svg/edit-user.svg'

const props = defineProps<{
  selectedUser: User | null
  isOpen: boolean
}>()

const emits = defineEmits<Emits>()

const usersStore = useUsersStore()

const { t } = useI18n()
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}

const editUserModalVisible = ref(props.isOpen)

watch(() => props.isOpen, (newVal) => {
  editUserModalVisible.value = newVal
})
interface Emits {
  (event: 'closeModal'): void
  (event: 'userEdited'): void
  (event: 'editUserConfirm', user: EditUserPayload): void

}

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

const editUserFormRef = ref<FormInstance>()

const editUserForm = reactive<EditUserPayload>({
  active: false,
  email: '',
  fullName: '',
  firstName: '',
  lastName: '',
  role: '',
})

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
  role: [
    { required: true, message: t('users.form.rules.required'), trigger: 'blur' },
  ],
}))

const { execute: updateUser, error } = await useAsyncData(() => usersStore.PUT_UpdateUser(props.selectedUser!.id, editUserForm), { immediate: false })

const submitEditUserForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  await formEl.validate(async (valid, __) => {
    if (valid) {
      await updateUser()
      editUserModalVisible.value = false
      if (error.value) {
        ElNotification({
          title: t('users.edit_user.notifications.error_title'),
          message: t('users.edit_user.notifications.error_description'),
          type: 'error',
          customClass: 'error',
          duration: 2500,
        })
      }

      else {
        emits('userEdited')
        ElNotification({
          title: t('users.edit_user.notifications.success_title'),
          message: t('users.edit_user.notifications.success_description'),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })
      }
    }
  })
}

const userRoles = computed(() => [
  {
    label: t('users.user_card.adminRole'),
    value: 'admin',
  },
  {
    label: t('users.user_card.userRole'),
    value: 'user',
  },
])

watch(
  () => [editUserForm.firstName, editUserForm.lastName],
  ([newFirstName, newLastName]) => {
    editUserForm.fullName = `${newFirstName} ${newLastName}`.trim()
  },
)

const prefillEditUserForm = () => {
  if (props.selectedUser) {
    editUserForm.active = props.selectedUser.active
    editUserForm.email = props.selectedUser.email
    editUserForm.firstName = props.selectedUser.firstName
    editUserForm.lastName = props.selectedUser.lastName
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
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}
const closeModal = () => {
  editUserModalVisible.value = false
  resetForm(editUserFormRef.value)
  emits('closeModal')
}
</script>

<template>
  <ClientOnly>
    <ElDialog
      v-model="editUserModalVisible"
      :destroy-on-close="true"
      align-center
      class="edit-user-modal-backoffice barrage-dialog--small"
      :close-icon="CloseCircleIcon"
      @close="closeModal"
    >
      <template #header>
        <div class="edit-user-modal-header">
          <EditIcon size="42px" />
          <h5> {{ $t('users.edit_user.title') }}</h5>
        </div>
      </template>
      <el-divider />
      <UserProfileOverview :user="props.selectedUser" size="large" />
      <p>{{ t('users.edit_user.description') }}</p>
      <ElForm
        ref="editUserFormRef"
        :model="editUserForm"
        :rules="rules"
        :scroll-to-error="true"
        :scroll-into-view-options="scrollIntoViewOptions"
      >
        <div class="start-end-form-items-wrapper">
          <ElFormItem
            :label="t('users.form.first_name')"
            prop="firstName"
          >
            <ElInput v-model="editUserForm.firstName" :placeholder="t('users.form.first_name_placeholder')" />
          </ElFormItem>
          <ElFormItem
            :label="t('users.form.last_name')"
            prop="lastName"
          >
            <ElInput v-model="editUserForm.lastName" :placeholder="t('users.form.last_name_placeholder')" />
          </ElFormItem>

          <!-- <ElFormItem
            :label="t('users.form.email')"
            prop="email"
          >
            <ElInput
              v-model="editUserForm.email"
              :placeholder="t('users.form.email_placeholder')"
              disabled
            />
          </ElFormItem> -->

          <ElFormItem
            :label="t('users.form.role')"
            prop="role"
          >
            <ElSelect
              v-model="editUserForm.role"
              :placeholder="t('users.form.role_placeholder')"
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
              <el-button @click="closeModal">
                {{ t('users.edit_user.cancel') }}
              </el-button>

              <ElButton
                type="primary"
                @click="submitEditUserForm(editUserFormRef)"
              >
                {{ t('users.edit_user.confirm') }}
              </ElButton>
            </div>
          </ElFormItem>
        </div>
      </ElForm>
    </ElDialog>
  </ClientOnly>
</template>

<style lang="scss" scoped>
.form-actions {
  display: flex;
  gap: 22px;
  width: 100%;
  justify-content: space-between;
  margin-top: 32px;
}

.edit-user-modal-header {
  display: flex;
  align-items: center;
  width: 100%;
  gap: 1rem;
}
</style>
