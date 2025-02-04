<script lang="ts" setup>
import DocumentIcon from '~/assets/icons/svg/document.svg'
import DocumentErrorIcon from '~/assets/icons/svg/document-error.svg'
import DocumentAddIcon from '~/assets/icons/svg/document-add.svg'

const { t } = useI18n()
const documentStore = useDocumentsStore()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('documents.title')),
})

const isUploadModalVisible = ref(false)

const isInfoDrawerOpen = ref(false)

const toggleInfoDrawer = () => {
  isInfoDrawerOpen.value = !isInfoDrawerOpen.value
}
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('documents.title')"
          :description="t('documents.description')"
          has-info
          @infoclicked="toggleInfoDrawer"
        >
          <template #icon>
            <DocumentIcon size="52px" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <DocumentsQuickActionsContainer v-if="!(documentStore.documentsDataEmpty)" v-model="isUploadModalVisible" />
      </template>
    </AdminPageHeadingTemplate>
    <DocumentsInfoDrawer
      v-model="isInfoDrawerOpen"
    />
    <template v-if="!(documentStore.documentsDataEmpty)">
      <div class="active-screen-container grid">
        <div class="documents-overview">
          <AsyncDocumentsListTemplate />
        </div>
        <div class="widgets">
          <DocumentStatistics />
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
          @click="isUploadModalVisible = true"
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
