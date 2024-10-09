<script lang="ts" setup>
// IMPORTS
import CollectionIcon from '~/assets/icons/svg/collection.svg'
// CONSTANTS
const collectionStore = useCollectionsStore()
const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

const { error: getError } = await useAsyncData(() => collectionStore.GET_AllCollections())

errorHandler(getError)
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
    <CollectionList :collections="collectionStore.collections" />
  </AdminPageContainer>
</template>

<style lang="scss" scoped />
