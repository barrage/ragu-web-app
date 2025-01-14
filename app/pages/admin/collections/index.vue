<script lang="ts" setup>
// IMPORTS
import CollectionIcon from '~/assets/icons/svg/folder-multiple.svg'
import AddCollectionIcon from '~/assets/icons/svg/folder-add.svg'
import EmptyCollectionIcon from '~/assets/icons/svg/collection-question-mark.svg'
import type { SortingValues } from '~/types/sort'

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('collections.titles.title')),
})
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
            <CollectionIcon size="48px" />
          </template>
        </AdminPageTitleContainer>
      </template>
      <template #actions>
        <CollectionQuickActionsContainer />
      </template>
    </AdminPageHeadingTemplate>
    <AsyncCollectionListTemplate />
  </AdminPageContainer>
</template>
