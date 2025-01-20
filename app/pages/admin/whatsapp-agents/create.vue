<script lang="ts" setup>
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import type { EmbeddingProvider } from '~/types/agent'
import type { PostWhatsAppAgentBody } from '~/types/whatsapp.ts'
import AddPersonIcon from '~/assets/icons/svg/person-add.svg'
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

definePageMeta({
  layout: 'admin-layout',
})

// CONSTANTS & STATES

const { $api } = useNuxtApp()
const { t } = useI18n()
const localePath = useLocalePath()
const maxContext = 1000
const embeddingProviders: EmbeddingProvider[] = ['azure', 'openai', 'ollama']

// FORM

const formRef = ref<FormInstance>()
const form = reactive<PostWhatsAppAgentBody>({
  name: '',
  description: '',
  language: '',
  active: false,
  configuration: {
    context: '',
    llmProvider: '',
    model: '',
    temperature: 0.1,
    instructions: {
      languageInstruction: '',
      summaryInstruction: '',
      promptInstruction: '',
    },
  },
})

const validateField = (
  value: string,
  options: { requiredMessage: string, min?: number, max?: number, lengthMessage?: string },
  callback: (error?: Error) => void,
) => {
  if (!value || !value.trim()) {
    callback(new Error(t(options.requiredMessage)))
  }
  else if (
    (options.min && value.trim().length < options.min)
    || (options.max && value.trim().length > options.max)
  ) {
    callback(
      new Error(
        t(options.lengthMessage || '', { min: options.min, max: options.max }),
      ),
    )
  }
  else {
    callback()
  }
}

const validateFieldWrapper
  = (options: { requiredMessage: string, min?: number, max?: number, lengthMessage?: string }) =>
    (_rule: any, value: string, callback: (error?: Error) => void) => {
      validateField(value, options, callback)
    }

const rules = computed<FormRules>(() => ({
  'name': [
    { required: true, message: t('agents.rules.name.required_message'), trigger: 'blur' },
    {
      validator: validateFieldWrapper({
        requiredMessage: 'agents.rules.name.required_message',
        min: 3,
        max: 50,
        lengthMessage: 'agents.rules.name.length_message',
      }),
      trigger: 'blur',
    },

  ],
  'configuration.context': [
    { required: true, message: t('agents.rules.context.required_message'), trigger: 'blur' },
    {
      validator: validateFieldWrapper({
        requiredMessage: 'agents.rules.context.required_message',
        min: 30,
        max: maxContext,
        lengthMessage: 'agents.rules.context.length_message',
      }),
      trigger: 'blur',
    },
  ],
  'description': [
    { required: true, message: t('agents.rules.description.required_message'), trigger: 'blur' },
    {
      validator: validateFieldWrapper({
        requiredMessage: 'agents.rules.description.required_message',
      }),
      trigger: 'blur',
    },
  ],
  'configuration.llmProvider': [
    { required: true, message: t('agents.rules.llmProvider.required_message'), trigger: 'change' },
  ],
  'configuration.model': [
    { required: true, message: t('agents.rules.model.required_message'), trigger: 'blur' },
  ],
  'language': [
    { required: true, message: t('agents.rules.language.required_message'), trigger: 'blur' },
    {
      validator: validateFieldWrapper({
        requiredMessage: 'agents.rules.language.required_message',
      }),
      trigger: 'blur',
    },
  ],
  'configuration.temperature': [
    { required: true, message: t('agents.rules.temperature.required_message'), trigger: 'change' },
  ],
  'active': [
    { required: true, message: t('agents.rules.active.required_message'), trigger: 'change' },
  ],
}))

// API CALLS

const { execute: postAgent, error: postAgentError, status: postAgentStatus, data: postAgentData } = await useAsyncData(() => $api.whatsApp.BoCreateWhatsAppAgent(form), { immediate: false })
const { execute: getAvailableLLms, error: getAvailableLLmsError, data: availableLLmsData } = await useAsyncData(() => $api.provider.GetListAvailableLLms(form.configuration.llmProvider), { immediate: false })

errorHandler(postAgentError)
errorHandler(getAvailableLLmsError)

// WATCHERS

watch(() => form.configuration.llmProvider, async (newProvider) => {
  if (newProvider) {
    form.configuration.model = ''
    await getAvailableLLms()
  }
})

// FUNCTIONS

const createAgent = async (formEl: FormInstance | undefined) => {
  if (!formEl) { return }

  await formEl.validate(async (valid) => {
    if (valid) {
      await postAgent()
      if (postAgentStatus.value === 'success') {
        ElNotification({
          title: t('agents.notifications.create_title'),
          message: t('agents.notifications.create_message', { name: form.name }),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })

        navigateTo({ path: localePath(`/admin/whatsapp-agents/${postAgentData.value?.id}`) })
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
</script>

<template>
  <AdminPageContainer>
    <LlmLink
      to="/admin/whatsapp-agents"
      type="link"
    >
      <ArrowLeftIcon /> {{ $t('whatsapp_agents.title') }}
    </LlmLink>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="$t('whatsapp_agents.create.title')"
          :description="$t('whatsapp_agents.create.description')"
        >
          <template #icon>
            <AddPersonIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
    </AdminPageHeadingTemplate>

    <ElCard class="is-primary">
      <ElForm
        ref="formRef"
        class="container"
        :model="form"
        :rules="rules"
      >
        <ElFormItem :label="$t('agents.labels.name')" prop="name">
          <ElInput v-model="form.name" :placeholder="$t('agents.placeholder.agentName')" />
        </ElFormItem>
        <ElFormItem :label="$t('agents.labels.language')" prop="language">
          <ElInput v-model="form.language" :placeholder="$t('agents.placeholder.language')" />
        </ElFormItem>
        <ElFormItem :label="$t('agents.labels.languageInstruction')" prop="configuration.instructions.languageInstruction">
          <ElInput v-model="form.configuration.instructions.languageInstruction" :placeholder="$t('agents.placeholder.languageInstruction')" />
        </ElFormItem>
        <ElFormItem
          :label="$t('agents.labels.description')"
          prop="description"
          class="context-form-item"
        >
          <ElInput
            v-model="form.description"
            :placeholder="$t('agents.placeholder.description')"
            type="textarea"
          />
        </ElFormItem>
        <ElFormItem
          :label="t('agents.labels.promptInstruction')"
          prop="configuration.instructions.promptInstruction"
          class="context-form-item"
        >
          <ElInput
            v-model="form.configuration.instructions.promptInstruction"
            :placeholder="t('agents.placeholder.promptInstruction')"
            type="textarea"
          />
        </ElFormItem>

        <ElFormItem
          :label="$t('agents.labels.summaryInstruction')"
          prop="configuration.instructions.summaryInstruction"
          class="context-form-item"
        >
          <ElInput
            v-model="form.configuration.instructions.summaryInstruction"
            :placeholder="$t('agents.placeholder.summaryInstruction')"
            type="textarea"
          />
        </ElFormItem>
        <ElFormItem
          :label="$t('agents.labels.context')"
          prop="configuration.context"
          class="context-form-item"
        >
          <ElInput
            v-model="form.configuration.context"
            type="textarea"
            :placeholder="$t('agents.placeholder.context')"
          />
        </ElFormItem>

        <ElFormItem :label="$t('agents.labels.llmProvider')" prop="configuration.llmProvider">
          <ElSelect v-model="form.configuration.llmProvider" :placeholder="$t('agents.placeholder.llmProvider')">
            <ElOption
              v-for="item in embeddingProviders"
              :key="item"
              :label="item"
              :value="item"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem :label="$t('agents.labels.model')" prop="configuration.model">
          <ElSelect
            v-model="form.configuration.model"
            :disabled="!availableLLmsData?.length"
            :placeholder="$t('agents.placeholder.model')"
          >
            <ElOption
              v-for="model in availableLLmsData"
              :key="model"
              :label="model"
              :value="model"
            />
          </ElSelect>
        </ElFormItem>

        <ElFormItem :label="$t('agents.labels.temperature')" prop="configuration.temperature">
          <ElSlider
            v-model="form.configuration.temperature"
            :min="0"
            :max="1"
            :step="0.1"
          />
        </ElFormItem>

        <ElFormItem class="actions">
          <LlmLink to="/admin/whatsapp-agents" type="button">
            {{ $t('agents.buttons.cancel') }}
          </LlmLink>
          <ElButton
            type="primary"
            :loading="postAgentStatus === 'pending'"
            @click="createAgent(formRef)"
          >
            {{ $t('agents.buttons.create') }}
          </ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.container {
  padding: 0.7rem;
  --container-background-color: var(--color-primary-100);
  --form-gap: 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: var(--spacing-fluid-2-xl);
  row-gap: var(--spacing-fluid-m);
  position: relative;

  width: 100%;
  @include viewport-ml {
    grid-template-columns: repeat(3, 1fr);
    column-gap: var(--spacing-fluid-3-xl);

    & .context-form-item {
      grid-column: span 3;
    }

    & .actions {
      grid-column: span 3;
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      align-items: flex-end;
      gap: var(--spacing-fluid-3-xl);
    }
  }
  @include viewport-xl {
    column-gap: var(--spacing-fluid-5-xl);
  }

  .context {
    width: 100%;
  }

  &:deep(.actions) {
    .barrage-form-item__content {
      display: flex;
      flex-direction: row;
      justify-content: flex-end;
      gap: var(--spacing-fluid-3-xl);
    }
  }

  .left-button {
    margin-right: var(--spacing-fluid-m);
  }
}
</style>
