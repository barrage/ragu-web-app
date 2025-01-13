<script setup lang="ts">
import { useDebounce } from '@vueuse/core'
import SearchIcon from '~/assets/icons/svg/search.svg'

const props = withDefaults(defineProps<{
  placeholder?: string
  delay?: number
  size?: 'small' | 'default' | 'large'
  initialValue?: string | null
}>(), {
  delay: 300,
  size: 'small',
  initialValue: '',
})

const emit = defineEmits<{
  (e: 'updateSearch', value: string): void
}>()

const searchValue = ref(props.initialValue || '')
const debouncedSearchValue = useDebounce(searchValue, props.delay || 300)

watch(debouncedSearchValue, (newValue) => {
  emit('updateSearch', newValue)
})
</script>

<template>
  <el-input
    v-model="searchValue"
    :placeholder="placeholder"
    :size="props.size"
    :suffix-icon="SearchIcon"
  />
</template>
