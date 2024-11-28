<script lang="ts" setup>
import CollectionQuestionMarkIcon from '~/assets/icons/svg/collection-question-mark.svg'
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

definePageMeta({
  layout: 'admin-layout',
})

const { t } = useI18n()

useHead({
  title: computed(() => t('collections.titles.details')),
})

// CONSTATNS
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
      <ArrowLeftIcon size="20px" /> {{ t('collections.title') }}
    </NuxtLink>

    <template v-if="status === 'pending'">
      <div class="collection-details-loader">
        <MeetUpLoader />
      </div>
    </template>
    <template v-else-if="collectionStore.singleCollection">
      <CollectionDetails :single-collection="collectionStore.singleCollection" />
    </template>
    <EmptyState
      v-else
      :title="t('collections.collection_card.empty_state_title')"
      :description="t('collections.collection_card.empty_state_desc')"
    >
      <template #icon>
        <CollectionQuestionMarkIcon size="44px" />
      </template>
    </EmptyState>
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
