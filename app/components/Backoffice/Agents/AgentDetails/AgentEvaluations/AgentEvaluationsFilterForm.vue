<script lang="ts" setup>
import type { FormInstance, FormRules } from 'element-plus'
import type { AgentVersionEvaluationMessagesFilter } from '~/types/agent'

const props = defineProps<{
  filter: AgentVersionEvaluationMessagesFilter
}>()

const emits = defineEmits<Emits>()
interface Emits {
  (event: 'filterApplied', filter: AgentVersionEvaluationMessagesFilter): void
}
const { t } = useI18n()

const agentEvaluationsFilterFormRef = ref<FormInstance>()
const agentEvaluationsFilterForm = reactive<AgentVersionEvaluationMessagesFilter>({
  evaluation: undefined,
  agentVersion: '',
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
  agentEvaluationsFilterForm.evaluation = props.filter?.evaluation
  agentEvaluationsFilterForm.agentVersion = props.filter?.agentVersion
}

onMounted(() => {
  prefillAgentsFilter()
})

const rules = computed<FormRules<AgentVersionEvaluationMessagesFilter>>(() => ({
  agentVersion: [
    { required: true, message: t('form_rules.required'), trigger: 'change' },
  ],
}))

const agentStatuses = computed(() =>
  [
    {
      id: 1,
      label: t('agents.descriptions.evaluation_positive'),
      value: true,
    },
    {
      id: 2,
      label: t('agents.descriptions.evaluation_negative'),
      value: false,
    },
  ],
)

const submitAgentFilterForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }
  await formEl.validate(async (valid, __) => {
    if (valid) {
      emits('filterApplied', agentEvaluationsFilterForm)
    }
  },
  )
}

const agentVersionsDataItems = computed(() => useAgentStore().backofficeSelectedAgentDetailsVersions)
</script>

<template>
  <div>
    <ElForm
      ref="agentEvaluationsFilterFormRef"
      :model="agentEvaluationsFilterForm"
      data-testid="bo-agents-evaluation-list-filter-form"
      :rules="rules"
      :scroll-to-error="true"
      :scroll-into-view-options="scrollIntoViewOptions"
    >
      <div class="agent-list-filter-form-items-wrapper">
        <ElFormItem :label="t('agents.labels.evaluation')" prop="evaluation">
          <ElSelect
            v-model="agentEvaluationsFilterForm.evaluation"
            :placeholder="t('agents.placeholder.filter_by_evaluation')"
            clearable
            data-testid="bo-agents-evaluation-list-filter-form-evaluation-select"
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

        <ElFormItem :label="t('agents.labels.version')" prop="agentVersion">
          <ElSelect
            v-model="agentEvaluationsFilterForm.agentVersion"
            :placeholder="t('agents.placeholder.filter_by_version')"
            clearable
            data-testid="bo-agents-evaluation-list-filter-form-version-select"
          >
            <ElOption
              v-for="status in agentVersionsDataItems"
              :key="status.id"
              :label="`v.${status.version}`"
              :value="status.id"
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
              @click="resetForm(agentEvaluationsFilterFormRef)"
            >
              {{ t('users.form.reset') }}
            </el-button>

            <ElButton
              type="primary"
              size="small"
              data-testid="bo-agent-list-filter-form-confirm-button"

              @click="submitAgentFilterForm(agentEvaluationsFilterFormRef)"
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
