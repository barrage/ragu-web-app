<script lang="ts" setup>
import DocumentIcon from '~/assets/icons/svg/document.svg'
import type { SortingValues } from '~/types/sort'

definePageMeta({
  layout: 'admin-layout',
})
const { t } = useI18n()

useHead({
  title: computed(() => t('documents.title')),
})

const documentStore = useDocumentsStore()

const currentPage = ref(1)
const itemsPerPage = ref(10)

const sort = ref<SortingValues>({
  direction: 'desc',
  sortProperty: { name: '', value: '' },
})
const { error, execute } = await useAsyncData(() =>
  documentStore.GET_AllDocuments(currentPage.value, itemsPerPage.value, sort.value.sortProperty.value, sort.value?.direction))

const handlePageChange = async (page: number) => {
  currentPage.value = page
  await execute()
}
const handleSortChange = async (sortingValues: SortingValues) => {
  sort.value.direction = sortingValues.direction
  sort.value.sortProperty = sortingValues.sortProperty
  await execute()
}
errorHandler(error)
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
        <DocumentsQuickActionsContainer />
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
