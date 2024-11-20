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
const { error, status } = await useAsyncData(() => collectionStore.GET_SingleCollection(selectedCollectionId?.value))

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

    <template v-if="status === 'pending'">
      <div class="collection-details-loader">
        <MeetUpLoader />
      </div>
    </template>
    <template v-else-if="collectionStore.singleCollection">
      <CollectionDetails :single-collection="collectionStore.singleCollection" />
    </template>
    <CollectionDetailEmptyState v-else />
  </AdminPageContainer>
</template>

<style lang="scss" scoped>
.collection-details-loader {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: var(--spacing-fluid-3-xl);
}
.back-link {
  display: flex;
  gap: 4px;
  align-items: center;
}
</style>
