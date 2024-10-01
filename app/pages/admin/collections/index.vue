<script lang="ts" setup>
// IMPORTS
import AddIcon from '~/assets/icons/svg/add.svg'
// CONSTANTS
const collectionStore = useCollectionsStore()
const localePath = useLocalePath()
const { t } = useI18n()

definePageMeta({
  layout: 'admin-layout',
})

const { error: getError } = await useAsyncData(() => collectionStore.GET_AllCollections())

errorHandler(getError)
</script>

<template>
  <section class="agents-section ">
    <h4 class="page-title">
      {{ t('collections.titles.title') }}
    </h4>
    <p class="description">
      {{ t('collections.titles.subTitle') }}
    </p>
    <ElButton
      type="primary"
      class="create-button"
      @click="navigateTo({ path: localePath('/admin/collections/create') })"
    >
      <AddIcon original /> {{ t('collections.buttons.create') }}
    </ElButton>
    <div class="agents-container">
      <CollectionCard
        v-for="collection in collectionStore.collections"
        :key="collection.id"
        :collection="collection"
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.agents-section {
  grid-column: content-start;
  padding-block: var(--spacing-fluid-l);

  & .page-title {
    margin-bottom: 0.5rem;
    font-weight: 600;
    color: var(--color-primary-900);
  }
  & .description {
    color: var(--color-primary-700);
  }

  button {
    margin-left: auto;
    margin-bottom: 1.5rem;
  }
}

.link {
  text-decoration: underline;
  cursor: pointer;
}

.agents-container {
  grid-column: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.dark {
  & .page-title {
    color: var(--color-primary-100);
  }
  & .description {
    color: var(--color-primary-300);
  }
  & .users-actions-container {
    & h6 {
      color: var(--color-primary-100);
    }
  }
}
</style>
