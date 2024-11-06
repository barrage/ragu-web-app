<script lang="ts" setup>
import type { Pagination } from '~/types/pagination'
import type { Document } from '~/types/document'

// Define the props for this component
const props = defineProps<{
  documents: Document[]
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
}>()

const documentStore = useDocumentsStore()

const pagination = ref<Pagination>({
  currentPage: 1,
  pageSize: 10,
  total: documentStore.documentResponse?.total || 0,
  disabled: false,
})

const changePage = (page: number) => {
  pagination.value.currentPage = page
  emits('pageChange', pagination.value.currentPage)
}

watch(
  () => documentStore.documentResponse?.total,
  (newTotal) => {
    if (newTotal !== undefined) {
      pagination.value.total = newTotal
    }
  },
)
const cardClasses = ref<string[]>([])
const applyCardClasses = () => {
  cardClasses.value = []
  props.documents?.forEach((_, index) => {
    setTimeout(() => {
      cardClasses.value[index] = 'list-item-visible'
    }, index * 100)
  })
}

watch(
  () => props.documents,
  () => {
    nextTick(applyCardClasses)
  },
  { immediate: true },
)
</script>

<template>
  <div class="document-list">
    <!--    <div class="document-list-actions">
      <DocumentsListActions />
    </div> -->
    <div class="documents-container grid">
      <DocumentCard
        v-for="document in props.documents"
        :key="document.id"
        :document="document"
      />
    </div>
    <Pagination
      :current-page="pagination.currentPage"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @page-change="(page:number) => changePage(page)"
    />
  </div>
</template>

  <style lang="scss"  scoped>
.document-list {
  padding-left: var(--spacing-desktop-m);
}
.list-title {
  color: var(--color-primary-700);
}
.documents-container {
  row-gap: 0.8rem;

  & .document-card {
    grid-column: span 12;
    row-gap: 0.8rem;
  }
}
.dark {
  & .list-title {
    color: var(--color-primary-0);
  }
}
h2 {
  margin-bottom: 16px;
}
</style>
