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
const providerStore = useProviderStore()
const collectionStore = useCollectionsStore()
const route = useRoute()
const { t } = useI18n()
const router = useRouter()
const localePath = useLocalePath()
const agentId = Number.parseInt(route.params.agentId as string, 10)
const maxContext = 1000
const embeddingProviders = ['fembed', 'openai']

// STATE
const formRef = ref<FormInstance>()
const form = reactive<AgentDetail>({
  name: '',
  context: '',
  description: '',
  llmProvider: '',
  model: '',
  language: '',
  temperature: 0.1,
  vectorProvider: '',
  embeddingProvider: '',
  embeddingModel: '',
  active: true,
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
  description: [
    { required: true, message: t('agents.rules.description.required_message'), trigger: 'blur' },
  ],
  llmProvider: [
    { required: true, message: t('agents.rules.llmProvider.required_message'), trigger: 'change' },
  ],
  model: [
    { required: true, message: t('agents.rules.model.required_message'), trigger: 'blur' },
  ],
  language: [
    { required: true, message: t('agents.rules.language.required_message'), trigger: 'blur' },
  ],
  temperature: [
    { required: true, message: t('agents.rules.temperature.required_message'), trigger: 'change' },
  ],
  vectorProvider: [
    { required: true, message: t('agents.rules.vectorProvider.required_message'), trigger: 'change' },
  ],
  embeddingProvider: [
    { required: true, message: t('agents.rules.embeddingProvider.required_message'), trigger: 'change' },
  ],
  embeddingModel: [
    { required: true, message: t('agents.rules.embeddingModel.required_message'), trigger: 'blur' },
  ],
  active: [
    { required: true, message: t('agents.rules.active.required_message'), trigger: 'change' },
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
      try {
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
      catch (error) {
        console.error(error)
        ElNotification({
          title: t('agents.notifications.form_title'),
          message: t('agents.notifications.form_message'),
          type: 'error',
          customClass: 'error',
          duration: 2500,
        })
      }
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

// WATCHER FOR LLM PROVIDER
watch(() => form.llmProvider, async (newProvider) => {
  if (newProvider) {
    await providerStore.GET_AvailableListLlms(newProvider)
  }
})
watch(() => form.embeddingProvider, async (newModel) => {
  if (newModel === 'azure') {
    await collectionStore.GET_ListEmbeddingModels('openai')
  }
  else {
    await collectionStore.GET_ListEmbeddingModels(newModel)
  }
})
</script>

<template>
  <section class="agent-section grid">
    <h4 class="typing-effect title-color section-title">
      {{ agentStore.editMode ? t('agents.titles.edit') : t('agents.titles.details') }}
    </h4>

    <!-- EDIT FORM -->
    <template v-if="agentStore.editMode">
      <ElForm
        ref="formRef"
        class="container"
        :model="form"
        :rules="rules"
      >
        <!-- Name -->
        <ElFormItem
          class="group"
          :label="t('agents.labels.name')"
          prop="name"
        >
          <ElInput v-model="form.name" />
        </ElFormItem>

        <!-- Context -->
        <ElFormItem
          class="group context"
          :label="t('agents.labels.context')"
          prop="context"
        >
          <ElInput v-model="form.context" type="textarea" />
        </ElFormItem>

        <!-- Description -->
        <ElFormItem
          class="group description"
          :label="t('agents.labels.description')"
          prop="description"
        >
          <ElInput v-model="form.description" />
        </ElFormItem>

        <!-- LLM Provider -->
        <ElFormItem
          class="group"
          :label="t('agents.labels.llmProvider')"
          prop="llmProvider"
        >
          <ElSelect v-model="form.llmProvider" placeholder="Select LLM Provider">
            <ElOption
              v-for="provider in embeddingProviders"
              :key="provider"
              :label="provider"
              :value="provider"
            />
          </ElSelect>
        </ElFormItem>

        <!-- Model -->
        <ElFormItem
          class="group"
          :label="t('agents.labels.model')"
          prop="model"
        >
          <ElSelect
            v-model="form.model"
            placeholder="Select Model"
            :disabled="providerStore?.availableLlmList?.length === 0"
          >
            <ElOption
              v-for="model in providerStore?.availableLlmList"
              :key="model"
              :label="model"
              :value="model"
            />
          </ElSelect>
        </ElFormItem>

        <!-- Language -->
        <ElFormItem
          class="group"
          :label="t('agents.labels.language')"
          prop="language"
        >
          <ElInput v-model="form.language" />
        </ElFormItem>

        <!-- Temperature -->
        <ElFormItem
          class="group"
          :label="t('agents.labels.temperature')"
          prop="temperature"
        >
          <ElSlider
            v-model="form.temperature"
            :min="0"
            :max="1"
            :step="0.1"
          />
        </ElFormItem>

        <!-- Vector Provider -->
        <ElFormItem
          class="group"
          :label="t('agents.labels.vectorProvider')"
          prop="vectorProvider"
        >
          <ElSelect v-model="form.vectorProvider" placeholder="Select Vector Provider">
            <ElOption
              v-for="provider in providerStore?.listProviders?.vector"
              :key="provider"
              :label="provider"
              :value="provider"
            />
          </ElSelect>
        </ElFormItem>

        <!-- Embedding Provider -->
        <ElFormItem
          class="group"
          :label="t('agents.labels.embeddingProvider')"
          prop="embeddingProvider"
        >
          <ElSelect v-model="form.embeddingProvider" placeholder="Select Embedding Provider">
            <ElOption
              v-for="provider in providerStore.listProviders?.embedding"
              :key="provider"
              :label="provider"
              :value="provider"
            />
          </ElSelect>
        </ElFormItem>

        <!-- Embedding Model -->
        <ElFormItem
          class="group"
          :label="t('agents.labels.model')"
          prop="embeddingModel"
        >
          <ElSelect
            v-model="form.embeddingModel"
            placeholder="Select Model"
            :disabled="collectionStore?.listEmbeddingsModels?.length === 0"
          >
            <ElOption
              v-for="(dimension, model) in collectionStore?.listEmbeddingsModels"
              :key="model"
              :label="`${model} - ${dimension}`"
              :value="model"
            />
          </ElSelect>
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
    </template>

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
        <label>{{ t('agents.labels.name') }}:</label>
        <p class="typing-effect">
          {{ agentStore.selectedAgent?.name }}
        </p>
      </div>

      <div class="group">
        <label>{{ t('agents.labels.context') }}:</label>
        <p class="textarea">
          {{ agentStore.selectedAgent?.context }}
        </p>
      </div>

      <div class="group">
        <label>{{ t('agents.labels.description') }}:</label>
        <p>{{ agentStore.selectedAgent?.description }}</p>
      </div>

      <div class="group">
        <label>{{ t('agents.labels.llmProvider') }}:</label>
        <p>{{ agentStore.selectedAgent?.llmProvider }}</p>
      </div>

      <div class="group">
        <label>{{ t('agents.labels.model') }}:</label>
        <p>{{ agentStore.selectedAgent?.model }}</p>
      </div>

      <div class="group">
        <label>{{ t('agents.labels.language') }}:</label>
        <p>{{ agentStore.selectedAgent?.language }}</p>
      </div>

      <div class="group">
        <label>{{ t('agents.labels.temperature') }}:</label>
        <p>{{ agentStore.selectedAgent?.temperature }}</p>
      </div>

      <div class="group">
        <label>{{ t('agents.labels.vectorProvider') }}:</label>
        <p>{{ agentStore.selectedAgent?.vectorProvider }}</p>
      </div>

      <div class="group">
        <label>{{ t('agents.labels.embeddingProvider') }}:</label>
        <p>{{ agentStore.selectedAgent?.embeddingProvider }}</p>
      </div>

      <div class="group">
        <label>{{ t('agents.labels.embeddingModel') }}:</label>
        <p>{{ agentStore.selectedAgent?.embeddingModel }}</p>
      </div>

      <div class="group">
        <label>{{ t('agents.labels.active') }}:</label>
        <p>{{ agentStore.selectedAgent?.active ? t('agents.labels.active_true') : t('agents.labels.active_false') }}</p>
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
          {{ t('agents.buttons.overview') }}
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
