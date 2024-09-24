<script lang="ts" setup>
// IMPORTS
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import { useAgentStore } from '~/stores/agents'
import type { AgentDetail } from '~/types/agent'

definePageMeta({
  layout: 'admin-layout',
})

// CONSTANTS
const agentStore = useAgentStore()
const { t } = useI18n()
const localePath = useLocalePath()
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
    { min: 3, max: 50, message: t('agents.rules.name.length_message', { min: 3, max: 50 }), trigger: 'blur' },
  ],
  context: [
    { required: true, message: t('agents.rules.context.required_message'), trigger: 'blur' },
    { min: 30, max: maxContext, message: t('agents.rules.context.length_message', { min: 30, max: maxContext }), trigger: 'blur' },
  ],
})

// API CALLS
const { execute: createExecute, error: createError, status: createStatus } = await useAsyncData(() => agentStore.CreateAgent(form), {
  immediate: false,
})

// HELPERS
const createAgent = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  await formEl.validate(async (valid) => {
    if (valid) {
      await createExecute()
      if (createStatus.value === 'success') {
        ElNotification({
          title: t('agents.notifications.create_title'),
          message: t('agents.notifications.create_message', { name: agentStore.selectedAgent?.name }),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })
        agentStore.setEditMode(false)
        navigateTo({ path: localePath(`/admin/agents/${agentStore.selectedAgent?.id}`) })
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

const cancelCreate = () => {
  navigateTo({ path: localePath('/admin/agents') })
}

// ERROR HANDLERS
errorHandler(createError)
</script>

<template>
  <section class="agent-section">
    <h4 class="page-title">
      {{ t('agents.titles.create') }}
    </h4>
    <p class="description">
      {{ t('agents.titles.createDescription') }}
    </p>

    <!-- EDIT FORM -->
    <ElForm
      ref="formRef"
      class="container"
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
        />
      </ElFormItem>
      <ElFormItem class="actions">
        <ElButton
          type="primary"
          class="left-button"
          @click="cancelCreate"
        >
          {{ t('agents.buttons.cancel') }}
        </ElButton>
        <ElButton
          type="primary"
          :loading="createStatus === 'pending'"
          @click="createAgent(formRef)"
        >
          {{ t('agents.buttons.create') }}
        </ElButton>
      </ElFormItem>
    </ElForm>
  </section>
</template>

<style lang="scss" scoped>
.agent-section {
  padding-block: var(--spacing-fluid-l);

  & .page-title {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--color-primary-900);
  }
  & .description {
    color: var(--color-primary-700);
    margin-bottom: 1.5rem;
  }
}

.container {
  --container-background-color: var(--color-primary-100);

  background: var(--container-background-color);
  border: var(--border-global-transparent);
  border-radius: var(--radius-4);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-200);
  padding: var(--spacing-fluid-m);
  position: relative;
  width: 100%;

  .context {
    width: 100%;
  }

  &:deep(.actions) {
    .barrage-form-item__content {
      display: flex;
      flex-direction: row;
    }
  }

  .left-button {
    margin-right: var(--spacing-fluid-m);
  }
}

:deep(.barrage-input__inner) {
  background-color: var(--color-primary-200);
  color: var(--color-primary-700);
}

html.dark {
  & .page-title {
    color: var(--color-primary-100);
  }
  & .description {
    color: var(--color-primary-300);
  }
  & .users-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }

  .container {
    --container-background-color: var(--color-primary-800);
  }
}
</style>
