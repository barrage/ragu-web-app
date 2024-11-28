<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import DocumentErrorIcon from '~/assets/icons/svg/document-error.svg'

definePageMeta({
  layout: 'admin-layout',
})
const { t } = useI18n()
const route = useRoute()

const documentStore = useDocumentsStore()

const selectedDocumentId = computed(() => {
  const documentId = Array.isArray(route.params.documentId) ? route.params.documentId[0] : route.params.documentId
  return documentId || ''
})
const { error, status } = await useAsyncData(() => documentStore.GET_SingleDocument(selectedDocumentId.value))

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <NuxtLink to="/admin/documents" class="back-link">
      <ArrowLeftIcon /> {{ t('documents.title') }}
    </NuxtLink>
    <template v-if="status === 'pending'">
      <LlmLoader />
    </template>
    <template v-else-if="documentStore.selectedDocument">
      <DocumentDetails :document="documentStore.selectedDocument" />
    </template>
    <template v-else>
      <div class="document-details-empty-state">
        <DocumentErrorIcon size="44px" />
        <p> <b>{{ t('documents.details.empty') }}</b> </p>
      </div>
    </template>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.back-link {
  display: flex;
  gap: 4px;
  align-items: center;
}

.document-details-empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: var(--spacing-fluid-3-xl);
}
</style>
