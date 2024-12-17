<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import DocumentErrorIcon from '~/assets/icons/svg/document-error.svg'

definePageMeta({
  layout: 'admin-layout',
})

const { t } = useI18n()
const route = useRoute()

useHead({
  title: computed(() => t('documents.document_details')),
})

const documentStore = useDocumentsStore()

const selectedDocumentId = computed(() => {
  const documentId = Array.isArray(route.params.documentId) ? route.params.documentId[0] : route.params.documentId
  return documentId || ''
})
const { error, status } = await useAsyncData(() => documentStore.GET_SingleDocument(selectedDocumentId.value), { lazy: true })

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <LlmLink to="/admin/documents" type="link">
      <ArrowLeftIcon size="20px" /> {{ t('documents.title') }}
    </LlmLink>
    <template v-if="status === 'pending'">
      <LlmLoader />
    </template>
    <template v-else-if="documentStore.selectedDocument">
      <DocumentDetails :document="documentStore.selectedDocument" />
    </template>
    <EmptyState
      v-else
      :title="$t('documents.details.empty_state_title')"
      :description="$t('documents.details.empty_state_desc')"
    >
      <template #icon>
        <DocumentErrorIcon size="44px" />
      </template>
    </EmptyState>
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
</style>
