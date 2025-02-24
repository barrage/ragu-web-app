<script lang="ts" setup>
import type { FormInstance } from 'element-plus'
import DocumentIcon from '~/assets/icons/svg/document.svg'
import NoteIcon from '~/assets/icons/svg/notes.svg'
import type { Document } from '~/types/collection'
import ArrowDown from '~/assets/icons/svg/arrow-down.svg'

interface SearchResultItem {
  text: string
  isExpanded: boolean

}

const props = defineProps<{
  collectionId: string
  assignedDocuments: Document[] | undefined
}>()

const { t } = useI18n()
const { $api } = useNuxtApp()

const searchForm = reactive({
  collectionId: props.collectionId,
  query: '',
  limit: 5,
})

const searchFormRef = ref<FormInstance>()

const searchNoteItems = computed(() => [
  t('collections.search.notes.behavior'),
  t('collections.search.notes.limit'),
  t('collections.search.notes.terms'),
  t('collections.search.notes.expand'),
])

const rules = reactive({
  query: [
    { required: true, message: t('collections.search.query_required'), trigger: 'blur' },
    { min: 1, message: t('collections.search.query_min_length'), trigger: 'blur' },
  ],
})

const { data: searchedDocuments, execute: executeSearch, status: searchStatus } = await useAsyncData(
  () => $api.collection.SearchDocumentsChunks(

    searchForm,
  ),
  { immediate: false },

)

const searchResultsRef = ref<HTMLElement | null>(null)

const searchResults = ref<SearchResultItem[]>([])

const toggleExpand = (index: number) => {
  const result = searchResults.value[index]
  if (result) {
    result.isExpanded = !result.isExpanded
  }
}

const formatText = (text: string | undefined, isExpanded: boolean) => {
  if (!text) { return '' } // Ensure no errors if text is undefined
  if (isExpanded) { return text }
  return text.length > 100 ? `${text.slice(0, 100)}...` : text
}

const handleSearch = async () => {
  if (!searchFormRef.value) { return }

  await searchFormRef.value.validate(async (valid) => {
    if (valid) {
      await executeSearch()

      if (searchedDocuments.value) {
        const results = Array.isArray(searchedDocuments.value)
          ? searchedDocuments.value
          : [searchedDocuments.value]

        searchResults.value = results.map((item) => {
          return {
            text: String(item || 'No Data'),
            isExpanded: false,
          }
        })

        await nextTick()

        if (searchResultsRef.value) {
          searchResultsRef.value.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }
    }
  })
}

const hasAssignedDocuments = computed(() => !!props.assignedDocuments?.length)

watch(hasAssignedDocuments, (hasDocuments) => {
  if (!hasDocuments) {
    searchResults.value = []
    searchForm.query = ''
    if (searchFormRef.value) {
      searchFormRef.value.resetFields()
    }
  }
})
</script>

<template>
  <el-divider class="is-weak" />
  <div class="search-section">
    <div class="group-heading-wrapper">
      <h5 class="group-title">
        {{ t('collections.search.title') }}
      </h5>
      <span class="group-description">
        {{ t('collections.search.description') }}
      </span>
    </div>
    <Note
      :title="t('collections.search.title')"
      :items="searchNoteItems"
      :icon="NoteIcon"
    />
    <ElForm
      v-if="hasAssignedDocuments"
      ref="searchFormRef"
      :model="searchForm"
      :rules="rules"
      class="search-form"
    >
      <ElFormItem
        :label="t('collections.search.query_label')"
        prop="query"
        class="query-form-item"
      >
        <ElInput
          v-model="searchForm.query"
          type="textarea"
          :rows="3"
          :placeholder="t('collections.search.query_placeholder')"
          data-testid="collection-search-query-input"
        />
      </ElFormItem>

      <ElFormItem
        :label="t('collections.search.limit_label')"
        class="limit-form-item"
      >
        <el-card class="is-accent">
          <div class="card-body">
            <ElTag type="primary">
              {{ searchForm.limit }}
            </ElTag>
            <ElSlider
              v-model="searchForm.limit"
              :min="1"
              :max="100"
              :step="1"
              data-testid="collection-search-limit-slider"
            />
          </div>
        </el-card>
      </ElFormItem>

      <ElButton
        type="primary"
        class="search-button"
        :loading="searchStatus === 'pending'"
        @click="handleSearch"
      >
        {{ t('collections.search.button') }}
      </ElButton>
    </ElForm>
    <EmptyState
      v-else
      :title="t('collections.search.empty_state_title')"
      :description="t('collections.search.empty_state_description')"
    >
      <template #icon>
        <DocumentIcon size="44px" />
      </template>
    </EmptyState>

    <!-- Search Results -->
    <div
      v-if="searchResults?.length"
      ref="searchResultsRef"
      v-motion-fade
      class="search-results"
      :duration="400"
    >
      <div class="group-heading-wrapper">
        <h5 class="group-title">
          {{ t('collections.search.results_title') }}
        </h5>
      </div>
      <el-card class="search-result-card is-primary">
        <div>
          <div class="search-result-content">
            <div class="result-header">
              <h6>{{ t('collections.search.resuts_overview') }}</h6>
              <ElTag type="primary" size="small">
                {{ searchForm.limit }} {{ t('collections.search.results') }}
              </ElTag>
            </div>
            <div class="result-body">
              <div
                v-for="(result, index) in searchResults"
                :key="index"
                class="result-item"
                @click="toggleExpand(index)"
              >
                <div class="result-item-content">
                  <span class="result-number">{{ index + 1 }}.</span>
                  <span class="result-text" :class="{ expanded: result.isExpanded }">
                    {{ formatText(result.text, result.isExpanded) || t('collections.search.no_results') }}
                  </span>
                </div>
                <ElIcon class="expand-icon" :class="{ expanded: result.isExpanded }">
                  <ArrowDown />
                </ElIcon>
              </div>
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.search-section {
  margin-top: 3rem;

  form {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    column-gap: 1rem;

    .query-form-item {
      margin-bottom: 1rem;
      grid-column: span 3;
    }

    .limit-form-item {
      grid-column: span 3;
    }

    .search-button {
      margin-top: 1rem;
    }
  }

  .search-results {
    margin-top: 2rem;

    h5 {
      margin-bottom: 1rem;
    }
  }

  .barrage-form-item {
    padding-bottom: 0;
  }

  .search-result-content {
    .result-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;

      h6 {
        color: var(--color-primary-900);
        margin: 0;
      }
    }

    .result-body {
      padding: 0;
      background: none;

      .result-item {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 1rem;
        background: var(--color-primary-100);
        border-bottom: 1px solid var(--el-border-color);
        cursor: pointer;
        transition: background-color 0.2s ease;

        &:hover {
          background: var(--color-primary-200);
        }

        &:last-child {
          border-bottom: none;
        }

        .result-item-content {
          display: flex;
          gap: 0.5rem;
          flex: 1;
        }

        .result-number {
          color: var(--color-primary-600);
          font-weight: 500;
          min-width: 2rem;
        }

        .result-text {
          &.expanded {
            white-space: pre-wrap;
          }
        }

        .expand-icon {
          margin-left: 1rem;
          transition: transform 0.2s ease;
          color: var(--color-primary-600);

          &.expanded {
            transform: rotate(180deg);
          }
        }
      }
    }
  }
}

html.dark {
  .search-results {
    .results-content {
      background: var(--el-fill-color-darker);
    }
  }

  .search-result-card {
    .search-result-content {
      .result-header h6 {
        color: var(--color-primary-100);
      }

      .result-body {
        .result-item {
          background: var(--color-primary-800);
          border-color: var(--color-primary-700);

          &:hover {
            background: var(--color-primary-700);
          }

          .result-number {
            color: var(--color-primary-400);
          }

          .expand-icon {
            color: var(--color-primary-400);
          }
        }
      }
    }
  }
}
</style>
