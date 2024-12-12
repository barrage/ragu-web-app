<script setup lang="ts">
import { ref } from 'vue'
import DoubleLeftIcon from '~/assets/icons/svg/caret-double-left.svg'
import DoubleRightIcon from '~/assets/icons/svg/caret-double-right.svg'
import LeftIcon from '~/assets/icons/svg/caret-left.svg'
import RightIcon from '~/assets/icons/svg/caret-right.svg'

const props = withDefaults(
  defineProps<{
    currentPage: number
    pageSize: number
    total: number
    disabled?: boolean
  }>(),
  {
    currentPage: 1,
    pageSize: 10,
    total: 0,
    disabled: false,
  },
)

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
}>()

const page = ref<number>(props.currentPage)
const total = ref<number>(props.total)

const size = computed(() => {
  return props.pageSize
})

watch(
  () => props.currentPage,
  (newCurrentPage) => {
    page.value = newCurrentPage
  },
)
watch(
  () => props.total,
  (newTotal) => {
    total.value = newTotal
  },
)

const paginationSearchValue = computed(() => {
  const firstNumber = props.currentPage * props.pageSize - props.pageSize + 1
  const secondNumber
    = props.currentPage * props.pageSize < props.total
      ? props.currentPage * props.pageSize
      : props.total
  return `${firstNumber} - ${secondNumber}`
})

function changePage(newPageValue: number) {
  page.value = newPageValue
  emits('pageChange', page.value)
}

function goToLastPage() {
  page.value = Math.ceil(props.total / props.pageSize)
  emits('pageChange', page.value)
}

const goToFirstPageDisabled = computed(() => {
  if (props.disabled || props.currentPage === 1) { return true }
  return false
})

const goToLastPageDisabled = computed(() => {
  if (
    props.disabled
    || props.currentPage === Math.ceil(props.total / props.pageSize)
  ) { return true }
  return false
})
</script>

<template>
  <ElPagination
    v-model:page-size="size"
    v-model:current-page="page"
    :disabled="disabled"
    :total="total"
    class="pagination"
    layout="prev, slot, next"
    :prev-icon="LeftIcon"
    :next-icon="RightIcon"
    data-testid="pagination"
    @current-change="changePage"
  >
    <template #default>
      <button
        class="btn-start"
        :disabled="goToFirstPageDisabled"
        :aria-disabled="goToFirstPageDisabled"
        data-testid="pagination-go-to-first-page-button"
        @click="changePage(1)"
      >
        <DoubleLeftIcon size="20px" />
      </button>
      <div class="barrage-pagination-data">
        <span
          class="barrage-pagination-data__current-items"
          data-testid="pagination-search-value"
        >
          {{ paginationSearchValue }}
        </span>
        <span class="barrage-pagination-data__slash">&#47;</span>
        <span class="" data-testid="pagination-total-value">
          {{ total }}
        </span>
      </div>
      <button
        class="btn-end"
        :disabled="goToLastPageDisabled"
        :aria-disabled="goToLastPageDisabled"
        data-testid="pagination-go-to-last-page-button"
        @click="goToLastPage"
      >
        <DoubleRightIcon size="20px" />
      </button>
    </template>
  </ElPagination>
</template>

<style scoped lang="scss">
.pagination {
  padding-top: 22px;
  margin: auto;
  justify-content: center;

  :deep(.barrage-icon) {
    svg {
      width: 20px;
      height: 20px;
    }
  }
}
</style>
