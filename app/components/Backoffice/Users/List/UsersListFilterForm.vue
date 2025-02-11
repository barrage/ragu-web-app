<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { UsersListFilterForm } from '~/types/users'

const props = defineProps<{
  filter: UsersListFilterForm
}>()

const emits = defineEmits<Emits>()
interface Emits {
  (event: 'filterApplied', filter: UsersListFilterForm): void
}
const { t } = useI18n()

const usersFilterFormRef = ref<FormInstance>()
const usersFilterForm = reactive<UsersListFilterForm>({
  status: undefined,
  role: undefined,
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()

  usersFilterForm.status = undefined
  usersFilterForm.role = undefined
}
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}

const prefillUsersFilter = () => {
  usersFilterForm.status = props.filter?.status
  usersFilterForm.role = props.filter?.role
}

onMounted(() => {
  prefillUsersFilter()
})

const rules = computed<FormRules<UsersListFilterForm>>(() => ({
  status: [],
  role: [],
}))

const userStatus = computed(() =>
  [
    {
      id: 1,
      label: t('users.user_card.active_status'),
      value: true,
    },
    {
      id: 2,
      label: t('users.user_card.inactive_status'),
      value: false,
    },
  ],
)

const userRoles = computed(() =>
  [
    {
      id: 1,
      label: t('users.roles.user_label'),
      value: 'user',
    },
    {
      id: 2,
      label: t('users.roles.admin_label'),
      value: 'admin',
    },
  ],
)

const submitAgentFilterForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  emits('filterApplied', usersFilterForm)
}
</script>

<template>
  <div>
    <ElForm
      ref="usersFilterFormRef"
      :model="usersFilterForm"
      data-testid="bo-users-list-filter-form"
      :rules="rules"
      :scroll-to-error="true"
      :scroll-into-view-options="scrollIntoViewOptions"
    >
      <div class="user-list-filter-form-items-wrapper">
        <ElFormItem :label="t('users.user_card.status')" prop="status">
          <ElSelect
            v-model="usersFilterForm.status"
            :placeholder="t('placeholders.choose_status')"
            clearable
            data-testid="bo-users-list-filter-form-status-select"
          >
            <ElOption
              v-for="status in userStatus"
              :key="status.id"
              :label="status.label"
              :value="status.value"
              data-testid="bo-users-list-filter-form-status-option"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem :label="t('users.user_card.role')" prop="role">
          <ElSelect
            v-model="usersFilterForm.role"
            :placeholder="t('placeholders.choose_role')"
            clearable
            data-testid="bo-users-list-filter-form-status-select"
          >
            <ElOption
              v-for="role in userRoles"
              :key="role.id"
              :label="role.label"
              :value="role.value"
              data-testid="bo-users-list-filter-form-status-option"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <div class="form-actions">
            <el-button
              size="small"
              data-testid="bo-users-list-filter-form-reset-button"
              plain
              @click="resetForm(usersFilterFormRef)"
            >
              {{ t('users.form.reset') }}
            </el-button>

            <ElButton
              type="primary"
              size="small"
              data-testid="bo-users-list-filter-form-confirm-button"

              @click="submitAgentFilterForm(usersFilterFormRef)"
            >
              {{ t('users.edit_user.confirm') }}
            </ElButton>
          </div>
        </ElFormItem>
      </div>
    </ElForm>
  </div>
</template>

<style>
.form-actions {
  display: flex;
  justify-content: space-between;
}
</style>
