<script lang="ts" setup>
import type { Collection } from '~/types/collection'
import type { Pagination } from '~/types/pagination'

// PROPS & EMITS

const props = defineProps<{
  collections: Collection[] | null | undefined
  pagination: Pagination
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
  (event: 'collectionDeleted'): void
}>()

// CONSTANTS & STATES

const isDeleteModalVisible = ref(false)
const collectionToDelete = ref<Collection | null>(null)

// FUNCTIONS

const openDeleteModal = (collection: Collection | null) => {
  collectionToDelete.value = collection
  isDeleteModalVisible.value = true
}

const collectionDeleted = () => {
  emits('collectionDeleted')
}
</script>

<template>
  <div class="collection-list-container">
    <div
      v-for="(collection, index) in props.collections"
      :key="collection.id"
    >
      <CollectionCard
        v-motion-fade
        :delay="(index * 100)"
        :duration="400"
        :collection="collection"
        @open-delete-modal="openDeleteModal(collection)"
      />
    </div>

    <DeleteCollectionModal
      v-model="isDeleteModalVisible"
      :collection="collectionToDelete"
      @collection-deleted="collectionDeleted"
    />
  </div>
</template>

<style lang="scss" scoped>
.collection-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}
</style>
