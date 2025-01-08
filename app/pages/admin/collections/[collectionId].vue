<script lang="ts" setup>
import CollectionQuestionMarkIcon from '~/assets/icons/svg/collection-question-mark.svg'
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'

definePageMeta({
  layout: 'admin-layout',
})

const { t } = useI18n()
const { $api } = useNuxtApp()

useHead({
  title: computed(() => t('collections.titles.details')),
})

// CONSTATNS
const route = useRoute()

const selectedCollectionId = ref(route.params.collectionId as string)

// API CALLS
const { error, status: singleCollectionStatus, data: singleCollectionData } = await useAsyncData(() => $api.collection.GetSingleCollection(selectedCollectionId?.value), { lazy: true })

errorHandler(error)
</script>

<template>
  <AdminPageContainer>
    <LlmLink to="/admin/collections" type="link">
      <ArrowLeftIcon size="20px" /> {{ t('collections.title') }}
    </LlmLink>

    <template v-if="singleCollectionStatus === 'pending'">
      <div class="collection-details-loader">
        <MeetUpLoader />
      </div>
    </template>
    <template v-else-if="singleCollectionData">
      <CollectionDetails :single-collection="singleCollectionData" />
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
</style>
