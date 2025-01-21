<script lang="ts" setup>
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import type { CollectionDetail } from '~/types/collection'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'
import CollectionIcon from '~/assets/icons/svg/folder-add.svg'

interface Emits {
  (event: 'update:visible', value: boolean): void
  (event: 'collectionCreated'): void
}

const emits = defineEmits<Emits>()
const router = useRouter()
const { $api } = useNuxtApp()
const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('collections.titles.create')),
})

const vectorProviders = ['qdrant', 'weaviate']
const embeddingProviders = ['fembed', 'openai']
const isOpen = defineModel<boolean>()
const formRef = ref<FormInstance>()
const form = reactive<CollectionDetail>({
  name: '',
  model: '',
  vectorProvider: '',
  embeddingProvider: '',
})
const listEmbeddingsModels = ref<Record<string, number>>({})

const rules = computed<FormRules<CollectionDetail>>(() => ({
  name: [
    { required: true, message: t('collections.rules.name.required_message'), trigger: 'blur' },
    { min: 1, message: t('collections.rules.name.length_message', { min: 3, max: 50 }), trigger: 'blur' },
    {
      validator: (rule, value) => /^[A-Z]\w*$/.test(value),
      message: t('collections.rules.name.ascii_alphanumeric_underscored_message'),
      trigger: 'blur',
    },
  ],
  vectorProvider: [
    { required: true, message: t('collections.rules.vectorProvider'), trigger: 'change' },
  ],
  embeddingProvider: [
    { required: true, message: t('collections.rules.embeddingProvider'), trigger: 'change' },
  ],
  model: [
    { required: true, message: t('collections.rules.model'), trigger: 'change' },
  ],
}))

// WATCHER
watch(
  () => form.embeddingProvider,
  async (newProvider) => {
    if (newProvider) {
      form.model = ''
      const { data: embeddingModels } = await useAsyncData(() => $api.collection.GetListEmbeddingModels(newProvider))
      listEmbeddingsModels.value = embeddingModels.value
    }
  },
)

// API CALLS
const { execute: createExecute, error: createError, status: createStatus, data: createdUserData } = await useAsyncData(() => $api.collection.CreateCollection(form), {
  immediate: false,
})

const closeModal = () => {
  isOpen.value = false

  if (formRef.value) {
    formRef.value.resetFields()
  }
}

// HELPERS
const createCollection = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return
  }

  await formEl.validate(async (valid) => {
    if (valid) {
      await createExecute()
      if (createStatus.value === 'success') {
        ElNotification({
          title: t('collections.notifications.create_title'),
          message: t('collections.notifications.create_message', { name: createdUserData.value?.name }),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })
        emits('collectionCreated')
        closeModal()
        router.push(`/admin/collections/${createdUserData.value?.id}`)
      }
    }
    else {
      ElNotification({
        title: t('collections.notifications.form_title'),
        message: t('collections.notifications.form_message'),
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
  })
}

const isModelDisabled = computed(() => !form.embeddingProvider)

// ERROR HANDLERS
errorHandler(createError)
</script>

<template>
  <ElDialog
    v-model="isOpen"
    align-center
    destroy-on-close
    class="barrage-dialog--medium"
 :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    @close="closeModal"
  >
    <template #header>
      <div class="activate-collection-modal-header">
        <CollectionIcon size="42px" />
        <h5> {{ t('collections.titles.create') }}</h5>
      </div>
    </template>
    <div class="activate-collection-modal-body">
      <p>
        {{ t('collections.titles.createDescription') }}
      </p>
    </div>

    <template #footer>
      <ElForm
        ref="formRef"
        class="container"
        :model="form"
        :rules="rules"
      >
        <!-- Collection Name -->
        <ElFormItem
          class="group"
          :label="t('collections.labels.name')"
          prop="name"
        >
          <ElInput v-model="form.name" :placeholder="t('collections.placeholders.collectionName')" />
        </ElFormItem>

        <!-- Vector Provider Dropdown -->
        <ElFormItem
          class="group"
          :label="t('collections.labels.provider')"
          prop="vectorProvider"
        >
          <ElSelect
            v-model="form.vectorProvider"
            :placeholder="t('collections.placeholders.vectorPlaceholder')"
          >
            <ElOption
              v-for="vectorProvider in vectorProviders"
              :key="vectorProvider"
              :label="vectorProvider"
              :value="vectorProvider"
            />
          </ElSelect>
        </ElFormItem>

        <!-- Embedding Provider Dropdown -->
        <ElFormItem
          class="group"
          :label="t('collections.labels.embedder')"
          prop="embeddingProvider"
        >
          <ElSelect v-model="form.embeddingProvider" :placeholder="t('collections.placeholders.embeddingPlaceholder')">
            <ElOption
              v-for="embeddingProvider in embeddingProviders"
              :key="embeddingProvider"
              :label="embeddingProvider"
              :value="embeddingProvider"
            />
          </ElSelect>
        </ElFormItem>

        <!-- Model Dropdown -->
        <ElFormItem
          class="group"
          :label="t('collections.labels.model')"
          prop="model"
        >
          <LlmTooltip
            :content="$t('collections.tooltip.select_embedding_provider_first')"
            placement="bottom"
            delayed
          >
            <ElSelect
              v-model="form.model"
              :placeholder="t('collections.placeholders.modelPlaceholder')"
              :disabled="isModelDisabled"
            >
              <ElOption
                v-for="(dimension, model) in listEmbeddingsModels"
                :key="model"
                :label="`${model} - ${dimension} dims`"
                :value="model"
              />
            </ElSelect>
          </LlmTooltip>
        </ElFormItem>

        <!-- Form Actions -->
        <ElFormItem class="actions">
          <ElButton
            type="primary"
            @click="closeModal"
          >
            {{ t('collections.buttons.cancel') }}
          </ElButton>
          <ElButton
            type="primary"
            :loading="createStatus === 'pending'"
            @click="createCollection(formRef)"
          >
            {{ t('collections.buttons.create') }}
          </ElButton>
        </ElFormItem>
      </ElForm>
    </template>
  </ElDialog>
</template>

<style lang="scss" scoped>
.activate-collection-modal-header {
  display: flex;
  gap: 1rem;
  align-items: center;
}
.activate-collection-modal-body {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.container {
  --form-gap: 0;
  position: relative;
  width: 100%;

  .context {
    width: 100%;
  }

  &:deep(.actions) {
    .barrage-form-item__content {
      display: flex;
      flex-direction: row;
      column-gap: 1.375rem;
    }
  }
}

html.dark {
  .container {
    --container-background-color: var(--color-primary-800);
  }
}
</style>
