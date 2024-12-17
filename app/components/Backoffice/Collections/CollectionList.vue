<script lang="ts" setup>
import type { Collection } from '~/types/collection'
import type { Pagination } from '~/types/pagination'

// PROPS & EMITS

const props = defineProps<{
  collections: Collection[] | null | undefined
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
}>()

// CONSTANTS & STATES

const collectionStore = useCollectionsStore()
const isDeleteModalVisible = ref(false)
const collectionToDelete = ref<Collection | null>(null)
const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: collectionStore.collectionResponse?.total || 0,
  disabled: false,
})

// FUNCTIONS

const openDeleteModal = (collection: Collection | null) => {
  collectionToDelete.value = collection
  isDeleteModalVisible.value = true
}

const changePage = (page: number) => {
  pagination.value.currentPage = page
  emits('pageChange', pagination.value.currentPage)
}

// WATCHERS

watch(
  () => collectionStore.collectionResponse?.total,
  (newTotal) => {
    if (newTotal !== undefined) {
      pagination.value.total = newTotal
    }
  },
)
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
    <Pagination
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @page-change="(page) => changePage(page)"
    />
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
</style>
