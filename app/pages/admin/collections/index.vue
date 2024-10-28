<script lang="ts" setup>
// IMPORTS
import CollectionIcon from '~/assets/icons/svg/collection.svg'
// CONSTANTS
const collectionStore = useCollectionsStore()
const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

const currentPage = ref(1)
const itemsPerPage = ref(10)

const { error: getError, execute } = await useAsyncData(() => collectionStore.GET_AllCollections(currentPage.value, itemsPerPage.value))
errorHandler(getError)

const handlePageChange = async (page: number) => {
  currentPage.value = page
  execute()
}
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('collections.titles.title')"
          :description="t('collections.titles.subTitle')"
        >
          <template #icon>
            <CollectionIcon size="52" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <CollectionQuickActionsContainer />
      </template>
    </AdminPageHeadingTemplate>
    <CollectionListActions />
    <CollectionList :collections="collectionStore.collections" @page-change="handlePageChange" />
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.fufura {
  width: max-content;
  margin-top: 100px;
}
</style>
