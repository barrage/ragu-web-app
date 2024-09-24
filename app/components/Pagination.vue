<script setup lang="ts">
// IMPORTS
import { ref } from 'vue'
import DoubleLeftIcon from '~/assets/icons/svg/caret-double-left.svg'
import DoubleRightIcon from '~/assets/icons/svg/caret-double-right.svg'
import LeftIcon from '~/assets/icons/svg/caret-left.svg'
import RightIcon from '~/assets/icons/svg/caret-right.svg'

// TYPES
interface Props {
  currentPage: number
  pageSize: number
  total: number
  disabled?: boolean
  dataTestIdPrefix?: string
}
interface Emits {
  (event: 'pageChange', page: number): number
}

// PROPS
const props = withDefaults(defineProps<Props>(), {
  currentPage: 1,
  pageSize: 10,
  total: 0,
  disabled: false,
  dataTestIdPrefix: 'pagination',
})

const emits = defineEmits<Emits>()

// STATES
const page = ref<number>(props.currentPage)

// COMPUTEDS
const size = computed(() => {
  return props.pageSize
})

const paginationSearchValue = computed(() => {
  const firstNumber = props.currentPage * props.pageSize - props.pageSize + 1
  const secondNumber
    = props.currentPage * props.pageSize < props.total
      ? props.currentPage * props.pageSize
      : props.total
  return `${firstNumber} - ${secondNumber}`
})

const goToFirstPageDisabled = computed(() => {
  if (props.disabled || props.currentPage === 1) {
    return true
  }
  return false
})

const goToLastPageDisabled = computed(() => {
  if (
    props.disabled
    || props.currentPage === Math.ceil(props.total / props.pageSize)
  ) { return true }
  return false
})

// HELPERS
function changePage(newPageValue: number) {
  page.value = newPageValue
  emits('pageChange', page.value)
}

function goToLastPage() {
  page.value = Math.ceil(props.total / props.pageSize)
  emits('pageChange', page.value)
}
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
    :data-testid="dataTestIdPrefix"
    @current-change="changePage"
  >
    <template #default>
      <button
        class="btn-start"
        :disabled="goToFirstPageDisabled"
        :aria-disabled="goToFirstPageDisabled"
        :data-testid="`${dataTestIdPrefix}-go-to-first-page-button`"
        @click="changePage(1)"
      >
        <DoubleLeftIcon :data-testid="`${dataTestIdPrefix}-double-left-icon`" />
      </button>
      <div class="t-ht-pagination-data">
        <span
          class="t-ht-pagination-data__current-items"
          :data-testid="`${dataTestIdPrefix}-search-value`"
        >
          {{ paginationSearchValue }}
        </span>
        <span class="t-ht-pagination-data__slash">&#47;</span>
        <span :data-testid="`${dataTestIdPrefix}-total-value`">
          {{ total }}
        </span>
      </div>
      <button
        class="btn-end"
        :disabled="goToLastPageDisabled"
        :aria-disabled="goToLastPageDisabled"
        :data-testid="`${dataTestIdPrefix}-go-to-last-page-button`"
        @click="goToLastPage"
      >
        <DoubleRightIcon
          :data-testid="`${dataTestIdPrefix}-double-right-icon`"
        />
      </button>
    </template>
  </ElPagination>
</template>

<style scoped lang="scss"></style>
