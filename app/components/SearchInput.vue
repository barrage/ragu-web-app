<script setup lang="ts">
import SearchIcon from '~/assets/icons/svg/search.svg'

const props = defineProps<{
  placeholder?: string
  delay?: number
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const searchValue = ref('')
const delay = props.delay || 300

let timeoutId: ReturnType<typeof setTimeout> | null = null

const onInput = (value: string) => {
  if (timeoutId) {
    clearTimeout(timeoutId)
  }
  timeoutId = setTimeout(() => {
    emit('update:modelValue', value)
  }, delay)
}

watch(searchValue, (newValue) => {
  emit('update:modelValue', newValue)
})
</script>

<template>
  <el-input
    v-model="searchValue"
    :placeholder="placeholder"
    size="small"
    :suffix-icon="SearchIcon"
    @input="onInput"
  />
</template>

<style scoped>

</style>
