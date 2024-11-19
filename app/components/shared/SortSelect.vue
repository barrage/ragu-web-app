<script lang="ts" setup>
import ArrowUpIcon from '~/assets/icons/svg/arrow-up.svg'
import type { SortOption, SortingValues } from '~/types/sort'

const props = defineProps<{
  options: Array<SortOption>
}>()
const emits = defineEmits<Emits>()
interface Emits {
  (event: 'sortUpdated', sort: SortingValues): void
}
const selectedSortBy = ref<SortOption>()
const sortOrder = ref<'asc' | 'desc'>('desc')

const sortingValues = computed(() => ({
  direction: sortOrder.value,
  sortProperty: selectedSortBy.value || { name: '', value: '' },
}))

const emitSortingValues = () => {
  emits('sortUpdated', sortingValues.value)
}
const sortDataByProperty = (option: SortOption) => {
  selectedSortBy.value = option
  emitSortingValues()
}

const changeSortOrder = () => {
  if (sortOrder.value === 'asc') {
    sortOrder.value = 'desc'
  }
  else {
    sortOrder.value = 'asc'
  }
  emitSortingValues()
}
watch(
  () => props.options,
  (newOptions) => {
    const updatedOption = newOptions.find(option => option.value === selectedSortBy.value?.value)
    selectedSortBy.value = updatedOption || newOptions[0]
  },
  { immediate: true },
)
</script>

<template>
  <div class="sorting-actions-wrapper">
    <ClientOnly>
      <ElDropdown
        trigger="click"
        role="navigation"
        class="card-dropdown"
        data-testid="sort-by-dropdown"
      >
        <ElButton size="small" data-testid="sort-by-button">
          {{
            `${$t("sort.description")} ${selectedSortBy?.name ? selectedSortBy?.name : ''}`
          }}
        </ElButton>
        <template #dropdown>
          <ElDropdownMenu>
            <template
              v-for="option in props.options"
              :key="option.value"
            >
              <ElDropdownItem
                :data-testid="`sort-by-option-${option.value}`"
                :class="{ selected: option.value === selectedSortBy?.value }"
                @click="sortDataByProperty(option)"
              >
                <p>
                  {{ option.name }}
                </p>
              </ElDropdownItem>
            </template>
          </ElDropdownMenu>
        </template>
      </ElDropdown>
    </ClientOnly>
    <div class="sort-directions-wrapper">
      <el-button size="small" @click="changeSortOrder()">
        {{ sortOrder === 'asc' ? $t("sort.asc") : $t("sort.desc") }}  <span
          class="sorting-arrow"
          :class="{ 'sorting-arrow-desc': sortOrder === 'desc' }"
        >
          <ArrowUpIcon /></span>
      </el-button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.sorting-actions-wrapper {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}

.sort-directions-wrapper {
  display: flex;
  gap: 6px;
  padding: 0.4rem;
}

.sorting-arrow {
  transition: 0.35s all ease-in-out;

  &.sorting-arrow-desc {
    transition: 0.35s all ease-in-out;
    transform: rotate(180deg);
  }
}
</style>
