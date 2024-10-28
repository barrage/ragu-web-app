<script lang="ts" setup>
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

definePageMeta({
  layout: 'admin-layout',
})

// CONSTATNS
const { t } = useI18n()
const route = useRoute()
const collectionStore = useCollectionsStore()

const selectedCollectionId = ref(route.params.collectionId as string)

// API CALLS
const { error } = await useAsyncData(() => collectionStore.GET_SingleCollection(selectedCollectionId?.value))

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <NuxtLink
      to="/admin/collections"
      class="back-link"
    >
      <ArrowLeftIcon /> {{ t('collections.title') }}
    </NuxtLink>
    <CollectionDetails :collection="collectionStore.singleCollection" />
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.back-link {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
