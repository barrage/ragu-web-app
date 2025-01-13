<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { AgentListFilterForm } from '~/types/agent'

const props = defineProps<{
  filter: AgentListFilterForm
}>()

const emits = defineEmits<Emits>()
interface Emits {
  (event: 'filterApplied', filter: AgentListFilterForm): void
}
const { t } = useI18n()

const agentsFilterFormRef = ref<FormInstance>()
const agentsFilterForm = reactive<AgentListFilterForm>({
  status: true,
})

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) { return }
  formEl.resetFields()
}
const scrollIntoViewOptions = {
  behavior: 'smooth',
  block: 'center',
}

const prefillAgentsFilter = () => {
  agentsFilterForm.status = props.filter?.status
}

onMounted(() => {
  prefillAgentsFilter()
})

const rules = computed<FormRules<AgentListFilterForm>>(() => ({
  status: [
    /* { required: true, message: t(''), trigger: 'blur' }, */
  ],
}))

const agentStatuses = computed(() =>
  [
    {
      id: 1,
      label: t('agents.agent_card.active_status'),
      value: true,
    },
    {
      id: 2,
      label: t('agents.agent_card.inactive_status'),
      value: false,
    },
  ],
)

const submitAgentFilterForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  emits('filterApplied', agentsFilterForm)
}
</script>

<template>
  <div>
    <ElForm
      ref="agentsFilterFormRef"
      :model="agentsFilterForm"
      data-testid="bo-agents-list-filter-form"
      :rules="rules"
      :scroll-to-error="true"
      :scroll-into-view-options="scrollIntoViewOptions"
    >
      <div class="agent-list-filter-form-items-wrapper">
        <ElFormItem :label="t('agents.labels.status')" prop="status">
          <ElSelect
            v-model="agentsFilterForm.status"
            :placeholder="t('agents.placeholder.filter_by_status')"
            data-testid="bo-agents-list-filter-form-status-select"
          >
            <ElOption
              v-for="status in agentStatuses"
              :key="status.id"
              :label="status.label"
              :value="status.value"
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
              @click="resetForm(agentsFilterFormRef)"
            >
              {{ t('users.form.reset') }}
            </el-button>

            <ElButton
              type="primary"
              size="small"
              data-testid="bo-agent-list-filter-form-confirm-button"

              @click="submitAgentFilterForm(agentsFilterFormRef)"
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
