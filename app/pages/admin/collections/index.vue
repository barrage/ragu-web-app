<script lang="ts" setup>
// IMPORTS
import CollectionIcon from '~/assets/icons/svg/folder-multiple.svg'

const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

useHead({
  title: computed(() => t('collections.titles.title')),
})

const infoDrawerOpen = ref(false)

const toggleInfoDrawer = () => {
  infoDrawerOpen.value = !infoDrawerOpen.value
}
</script>

<template>
  <AdminPageContainer>
    <AdminPageHeadingTemplate>
      <template #title>
        <AdminPageTitleContainer
          :title="t('collections.titles.title')"
          :description="t('collections.titles.subTitle')"
          has-info
          @infoclicked="toggleInfoDrawer"
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
    <CollectionsInfoDrawer v-model="infoDrawerOpen" />
  </AdminPageContainer>
</template>
