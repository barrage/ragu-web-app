<script lang="ts" setup>
// IMPORTS
import type { FormInstance, FormRules } from 'element-plus'
import { useAgentStore } from '~/stores/agents'
import type { AgentDetail } from '~/types/agent'

// LAYOUT
definePageMeta({
  layout: 'admin-layout',
})

// CONSTANTS
const agentStore = useAgentStore()
const route = useRoute()
const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()
const agentId = Number.parseInt(route.params.agentId as string, 10)
const maxContext = 1000

// STATE
const formRef = ref<FormInstance>()
const form = reactive<AgentDetail>({
  name: '',
  context: '',
})
const rules = reactive<FormRules<AgentDetail>>({
  name: [
    { required: true, message: t('agents.rules.name.required_message'), trigger: 'blur' },
    { min: 3, max: 100, message: t('agents.rules.name.length_message', { min: 3, max: 50 }), trigger: 'blur' },
  ],
  context: [
    { required: true, message: t('agents.rules.context.required_message'), trigger: 'blur' },
    { min: 30, max: maxContext, message: t('agents.rules.context.length_message', { min: 3, max: maxContext }), trigger: 'blur' },
  ],
})

// API CALLS
const { error } = await useAsyncData(() => agentStore.GET_SingleAgent(agentId))
const { execute: updateExecute, error: updateError, status: updateStatus } = await useAsyncData(() => agentStore.UpdateAgent(agentId, form), {
  immediate: false,
})

// HELPERS
const updateAgent = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  await formEl.validate(async (valid) => {
    if (valid) {
      await updateExecute()
      if (updateStatus.value === 'success') {
        ElNotification({
          title: t('agents.notifications.update_title'),
          message: t('agents.notifications.update_message', { name: agentStore.selectedAgent?.name }),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })
        agentStore.setEditMode(false)
      }
    }
    else {
      ElNotification({
        title: t('agents.notifications.form_title'),
        message: t('agents.notifications.form_message'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
  })
}

const cancelUpdate = () => {
  form.name = agentStore.selectedAgent?.name ?? ''
  form.context = agentStore.selectedAgent?.context ?? ''
  agentStore.setEditMode(false)
  navigateTo({ path: localePath(`/admin/agents`) })
}

// ERROR HANDLERS
errorHandler(error, true)
errorHandler(updateError)

// HOOKS
watch(() => agentStore.selectedAgent, (newAgent) => {
  form.name = newAgent?.name ?? ''
  form.context = newAgent?.context ?? ''
}, { immediate: true })
</script>

<template>
  <section class="agent-section grid">
    <h4 class="typing-effect title-color section-title">
      {{ agentStore.editMode ? t('agents.titles.edit') : t('agents.titles.details') }}
    </h4>

    <!-- EDIT FORM -->
    <ElForm
      v-if="agentStore.editMode"
      ref="formRef"
      class="container grid"
      :model="form"
      :rules="rules"
    >
      <ElFormItem
        class="group"
        :label="t('agents.labels.name')"
        prop="name"
      >
        <ElInput v-model="form.name" />
      </ElFormItem>
      <ElFormItem
        class="group context"
        :label="t('agents.labels.context')"
        prop="context"
      >
        <ElInput
          v-model="form.context"
          type="textarea"
          :maxlength="maxContext"
          show-word-limit
          resize="vertical"
        />
      </ElFormItem>
      <ElFormItem class="actions">
        <ElButton
          type="primary"
          class="left-button"
          @click="cancelUpdate"
        >
          {{ t('agents.buttons.cancel') }}
        </ElButton>
        <ElButton
          type="primary"
          :loading="updateStatus === 'pending'"
          @click="updateAgent(formRef)"
        >
          {{ t('agents.buttons.save') }}
        </ElButton>
      </ElFormItem>
    </ElForm>

    <!-- INFO DISPLAY -->
    <div v-else class="container grid">
      <div class="date">
        <p>
          {{ t('agents.labels.created_at') }}:
          {{ formatDate(agentStore.selectedAgent?.createdAt as string) }}
        </p>
        <p>
          {{ t('agents.labels.updated_at') }}:
          {{ formatDate(agentStore.selectedAgent?.updatedAt as string) }}
        </p>
      </div>
      <div class="group">
        <label>
          {{ t('agents.labels.name') }}:
        </label>
        <p class="typing-effect">
          {{ agentStore.selectedAgent?.name }}
        </p>
      </div>
      <div class="group">
        <label>
          {{ t('agents.labels.context') }}:
        </label>
        <p class="textarea">
          {{ agentStore.selectedAgent?.context }}
        </p>
      </div>
      <div class="actions">
        <ElButton
          type="primary"
          class="left-button"
          @click="agentStore.setEditMode(true)"
        >
          {{ t('agents.buttons.edit') }}
        </ElButton>
        <ElButton
          type="primary"
          @click="router.push(`/admin/agents`)"
        >
          Agent Overwiev
        </ElButton>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.agent-section {
  grid-column: content-start;
  padding-block: var(--spacing-fluid-l);
}

.section-title {
  grid-column: 1/-1;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: var(--color-primary-900);
}

.container {
  --container-background-color: var(--color-primary-100);
  --lable-text-color: var(--color-gray-500);

  grid-column: 1/-1;
  display: flex;
  flex-direction: column;
  background: var(--container-background-color);
  border: var(--border-global-transparent);
  border-radius: var(--radius-4);
  box-shadow: var(--shadow-3);
  padding: var(--spacing-fluid-m);
  position: relative;

  .date {
    position: absolute;
    top: var(--spacing-fluid-3-xs);
    right: var(--spacing-fluid-m);
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: flex-end;

    p {
      --paragraph-color: var(--lable-text-color);
      --paragraph-font-size: var(--font-size-fluid-2);
      font-weight: var(--font-weight-semibold);
      --paragraph-margin-block: 0 var(--spacing-fluid-6-xs);
    }
  }

  .group {
    display: flex;
    flex-direction: column;
    padding-bottom: var(--spacing-fluid-5-xs);

    label {
      color: var(--lable-text-color);
    }

    p {
      padding-block: var(--spacing-mobile-m) var(--spacing-mobile-7-xs);
    }
  }

  .context {
    width: 100%;
  }

  .actions {
    display: flex;
    flex-direction: row;

    :deep(div) {
      display: flex;
      flex-direction: row;
    }
  }

  .left-button {
    margin-right: var(--spacing-fluid-m);
  }
}

html.dark .container {
  --container-background-color: var(--color-primary-800);
  --lable-text-color: var(--color-gray-600);

  .section-title {
    color: var(--color-primary-100);
  }
}
</style>
