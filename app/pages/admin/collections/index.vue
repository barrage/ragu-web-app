<script lang="ts" setup>
// IMPORTS
import CollectionIcon from '~/assets/icons/svg/folder-multiple.svg'
import AddCollectionIcon from '~/assets/icons/svg/folder-add.svg'
import EmptyCollectionIcon from '~/assets/icons/svg/collection-question-mark.svg'
import type { SortingValues } from '~/types/sort'

const collectionStore = useCollectionsStore()
const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('collections.titles.title')),
})

const currentPage = ref(1)
const itemsPerPage = ref(10)

const sort = ref<SortingValues>({
  direction: 'desc',
  sortProperty: { name: '', value: '' },
})
const { error: getError, execute } = await useAsyncData(() => collectionStore.GET_AllCollections(currentPage.value, itemsPerPage.value, sort.value.sortProperty.value, sort.value?.direction), { lazy: true })
errorHandler(getError)

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
          :title="t('collections.titles.title')"
          :description="t('collections.titles.subTitle')"
        >
          <template #icon>
            <CollectionIcon size="58px" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <CollectionQuickActionsContainer />
      </template>
    </AdminPageHeadingTemplate>
    <template v-if="collectionStore.collections.length">
      <CollectionListActions @sort-change="handleSortChange" />
      <CollectionList :collections="collectionStore.collections" @page-change="handlePageChange" />
    </template>
    <EmptyState
      v-else
      :title="t('collections.empty_state.title_all')"
      :description="t('collections.empty_state.description_all')"
      :cta-text="t('collections.assign_collection.title')"
    >
      <template #icon>
        <EmptyCollectionIcon size="44px" />
      </template>
      <template #cta>
        <LlmLink to="/admin/collections/create" type="button">
          <AddCollectionIcon /> {{ t('collections.titles.create') }}
        </LlmLink>
      </template>
    </EmptyState>
  </AdminPageContainer>
</template>
