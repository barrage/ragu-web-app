<script lang="ts" setup>
import type { Collection } from '~/types/collection'

const props = defineProps<{
  collections: Collection[] | null | undefined
}>()

const cardClasses = ref<string[]>([])
const isDeleteModalVisible = ref(false)
const collectionToDelete = ref<Collection | null>(null)

const openDeleteModal = (collection: Collection | null) => {
  collectionToDelete.value = collection
  isDeleteModalVisible.value = true
}

onMounted(() => {
  nextTick(() => {
    props.collections?.forEach((_, index) => {
      setTimeout(() => {
        cardClasses.value[index] = 'list-item-visible'
      }, index * 100)
    })
  })
})
</script>

<template>
  <div class="collection-list-container">
    <div
      v-for="(collection, index) in props.collections"
      :key="collection.id"
      class="list-item"
      :class="[cardClasses[index]]"
    >
      <CollectionCard
        :collection="collection"
        @open-delete-modal="openDeleteModal(collection)"
      />
    </div>
    <DeleteCollectionModal
      v-model:visible="isDeleteModalVisible"
      :collection="collectionToDelete"
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

.list-item {
  opacity: 0;
  transform: translateY(20px);
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.list-item-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
