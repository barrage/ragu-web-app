<script lang="ts" setup>
import DocumentIcon from '~/assets/icons/svg/document.svg'
import DocumentErrorIcon from '~/assets/icons/svg/document-error.svg'
import DocumentAddIcon from '~/assets/icons/svg/document-add.svg'
import type { SortingValues } from '~/types/sort'

const { t } = useI18n()
const documentStore = useDocumentsStore()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('documents.title')),
})

const currentPage = ref(1)
const itemsPerPage = ref(10)
const openedUploadDialog = ref(false)

const sort = ref<SortingValues>({
  direction: 'desc',
  sortProperty: { name: '', value: '' },
})
const { error, execute } = await useAsyncData(() =>
  documentStore.GET_AllDocuments(currentPage.value, itemsPerPage.value, sort.value.sortProperty.value, sort.value?.direction), { lazy: true })

errorHandler(error)

const handlePageChange = async (page: number) => {
  currentPage.value = page
  await execute()
}
const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.direction = sortingValues.direction
  sort.value.sortProperty = sortingValues.sortProperty
  await execute()
}
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('documents.title')"
          :description="t('documents.description')"
        >
          <template #icon>
            <DocumentIcon size="52px" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <DocumentsQuickActionsContainer v-model="openedUploadDialog" />
      </template>
    </AdminPageHeadingTemplate>

    <!--   <DocumentsListActions /> -->
    <template v-if="documentStore.documentResponse?.items">
      <div class="active-screen-container grid">
        <div class="documents-overview">
          <DocumentsListActions @sort-change="handleSortChange" />
          <DocumentList :documents="documentStore.documentResponse?.items" @page-change="handlePageChange" />
        </div>
        <div class="widgets">
          <DocumentStatistics :documents="documentStore.documentResponse?.items" />
        </div>
      </div>
    </template>
    <EmptyState
      v-else
      :title="$t('documents.empty_state_title')"
      :description="$t('documents.empty_state_desc')"
    >
      <template #icon>
        <DocumentErrorIcon size="44px" />
      </template>
      <template #cta>
        <ElButton
          @click="openedUploadDialog = true"
        >
          <DocumentAddIcon size="20px" />  {{ $t('documents.upload') }}
        </ElButton>
      </template>
    </EmptyState>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.active-screen-container {
  grid-column-gap: var(--spacing-fluid-2-xl);

  & .documents-overview {
    grid-column: span 8;
  }

  & .widgets {
    grid-column: span 4;
  }
}
</style>
