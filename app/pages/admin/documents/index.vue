<script lang="ts" setup>
import DocumentIcon from '~/assets/icons/svg/document.svg'

definePageMeta({
  layout: 'admin-layout',
})
const { t } = useI18n()
const documentStore = useDocumentsStore()

const currentPage = ref(1)
const itemsPerPage = ref(10)

const { error, execute } = await useAsyncData(() =>
  documentStore.GET_AllDocuments(currentPage.value, itemsPerPage.value))

const handlePageChange = async (page: number) => {
  currentPage.value = page
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
            <DocumentIcon size="52" />
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
        <div class="widgets">
          <DocumentStatistics :documents="documentStore.documentResponse?.items" />
        </div>
        <div class="documents-overview">
          <DocumentList :documents="documentStore.documentResponse?.items" @page-change="handlePageChange" />
        </div>
      </div>
    </template>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.documents-overview {
  grid-column: span 8;
}
.widgets {
  grid-column: span 4;
}
</style>
