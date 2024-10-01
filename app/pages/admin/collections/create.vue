<script lang="ts" setup>
// IMPORTS
import { ElNotification, type FormInstance, type FormRules } from 'element-plus'
import { reactive, ref, watch } from 'vue'
import type { CollectionDetail } from '~/types/collection'

definePageMeta({
  layout: 'admin-layout',
})

// CONSTANTS
const collectionStore = useCollectionsStore()
const { t } = useI18n()
const localePath = useLocalePath()

// STATE
const vectorProviders = ['qdrant', 'weaviate']
const embeddingProviders = ['fembed', 'openai']

const formRef = ref<FormInstance>()
const form = reactive<CollectionDetail>({
  name: '',
  model: '',
  vectorProvider: '',
  embeddingProvider: '',
})
const listEmbeddingsModels = ref<Record<string, number>>({})

// FORM VALIDATION RULES
const rules = reactive<FormRules<CollectionDetail>>({

  name: [
    { required: true, message: t('collections.rules.name.required_message'), trigger: 'blur' },
    { min: 3, max: 50, message: t('collections.rules.name.length_message', { min: 3, max: 50 }), trigger: 'blur' },
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
})

// WATCHER
watch(
  () => form.embeddingProvider,
  async (newProvider) => {
    if (newProvider) {
      await collectionStore.GET_ListEmbeddingModels(newProvider)
      listEmbeddingsModels.value = collectionStore.listEmbeddingsModels
    }
  },
)

// API CALLS
const { execute: createExecute, error: createError, status: createStatus } = await useAsyncData(() => collectionStore.POST_CreateCollection(form), {
  immediate: false,
})

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
          message: t('collections.notifications.create_message', { name: collectionStore.newCollection?.name }),
          type: 'success',
          customClass: 'success',
          duration: 2500,
        })

        navigateTo({ path: localePath('/admin/collections') })
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

const cancelCreate = () => {
  navigateTo({ path: localePath('/admin/collections') })
}

// ERROR HANDLERS
errorHandler(createError)
</script>

<template>
  <section class="collection-section">
    <h4 class="page-title">
      {{ t('collections.titles.create') }}
    </h4>
    <p class="description">
      {{ t('collections.titles.createDescription') }}
    </p>

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
        <ElInput v-model="form.name" />
      </ElFormItem>

      <!-- Vector Provider Dropdown -->
      <ElFormItem
        class="group"
        :label="t('collections.labels.vectorProvider')"
        prop="vectorProvider"
      >
        <ElSelect
          v-model="form.vectorProvider"
          :placeholder="t('collections.labels.vectorPlaceholder')"
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
        :label="t('collections.labels.embeddingProvider')"
        prop="embeddingProvider"
      >
        <ElSelect v-model="form.embeddingProvider" :placeholder="t('collections.labels.embeddingPlaceholder')">
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
        <ElTooltip
          v-if="!form.embeddingProvider"
          content="Please select an Embedding Provider first."
          placement="bottom"
          :show-after="500"
        >
          <ElSelect
            v-model="form.model"
            :placeholder="t('collections.labels.modelPlaceholder')"
            :disabled="!form.embeddingProvider"
          >
            <ElOption
              v-for="(dimension, model) in listEmbeddingsModels"
              :key="model"
              :label="`${model} - ${dimension} dims`"
              :value="model"
            />
          </ElSelect>
        </ElTooltip>
      </ElFormItem>

      <!-- Form Actions -->
      <ElFormItem class="actions">
        <ElButton
          type="primary"
          class="left-button"
          @click="cancelCreate"
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
  </section>
</template>

<style lang="scss" scoped>
.collection-section {
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
