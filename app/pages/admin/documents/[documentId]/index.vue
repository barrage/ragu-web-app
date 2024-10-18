<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

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

const { error } = await useAsyncData(() => documentStore.GET_SingleDocument(selectedDocumentId.value))

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <NuxtLink to="/admin/documents" class="back-link">
      <ArrowLeftIcon /> {{ t('documents.title') }}
    </NuxtLink>

    <DocumentDetails :document="documentStore.selectedDocument" />
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.back-link {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
