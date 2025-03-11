<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import type { ChatListFilterForm } from '~/types/chat'

const props = defineProps<{
  filter: ChatListFilterForm
}>()

const emits = defineEmits<Emits>()
interface Emits {
  (event: 'filterApplied', filter: ChatListFilterForm): void
}
const { t } = useI18n()

const chatListAdminFilterFormRef = ref<FormInstance>()
const chatListAdminFilterForm = reactive<ChatListFilterForm>({
  userId: undefined,
  agentId: undefined,
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  chatListAdminFilterForm.userId = undefined
  chatListAdminFilterForm.agentId = undefined
  formEl.clearValidate()
}
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}

const prefillAgentsFilter = () => {
  chatListAdminFilterForm.userId = props.filter?.userId
  chatListAdminFilterForm.agentId = props.filter?.agentId
}

onMounted(() => {
  prefillAgentsFilter()
})

const submitAgentFilterForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  emits('filterApplied', chatListAdminFilterForm)
}

const { $api } = useNuxtApp()
const { status: getAgentsStatus, data: allAgentsData } = await useAsyncData(() => $api.agent.GetAllAgents(1, 100), { lazy: true })

const { status: getUsersStatus, data: allUsersData } = await useAsyncData(() => $api.user.GetAllUsers(1, 100), { lazy: true })
</script>

<template>
  <div>
    <ElForm
      ref="chatListAdminFilterFormRef"
      :model="chatListAdminFilterForm"
      data-testid="bo-agents-list-filter-form"
      :scroll-to-error="true"
      :scroll-into-view-options="scrollIntoViewOptions"
    >
      <div class="agent-list-filter-form-items-wrapper">
        <ElFormItem :label="t('chat.user')" prop="status">
          <ElSelect
            v-model="chatListAdminFilterForm.userId"
            :placeholder="t('placeholders.choose_user')"
            clearable
            data-testid="bo-agents-list-filter-form-status-select"
            :disabled="getUsersStatus === 'pending'"
            filterable
          >
            <ElOption
              v-for="user in allUsersData?.items"
              :key="user.id"
              :label="user.fullName"
              :value="user.id"
              data-testid="bo-agents-list-filter-form-status-option"
            />
          </ElSelect>
        </ElFormItem>
        <ElFormItem :label="t('agents.title')" prop="status">
          <ElSelect
            v-model="chatListAdminFilterForm.agentId"
            :placeholder="t('placeholders.choose_agent')"
            clearable
            data-testid="bo-agents-list-filter-form-status-select"
            :disabled="getAgentsStatus === 'pending'"
            filterable
          >
            <ElOption
              v-for="agent in allAgentsData?.items"
              :key="agent.agent.id"
              :label="agent.agent.name"
              :value="agent.agent.id"
              data-testid="bo-agents-list-filter-form-status-option"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem>
          <div class="form-actions">
            <el-button
              size="small"
              data-testid="bo-agent-list-filter-form-reset-button"
              plain
              @click="resetForm(chatListAdminFilterFormRef)"
            >
              {{ t('users.form.reset') }}
            </el-button>

            <ElButton
              type="primary"
              size="small"
              data-testid="bo-agent-list-filter-form-confirm-button"

              @click="submitAgentFilterForm(chatListAdminFilterFormRef)"
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
