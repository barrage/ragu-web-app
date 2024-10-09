<script lang="ts" setup>
import type { Collection } from '~/types/collection'

const props = defineProps<{
  collections: Collection[] | null | undefined
}>()
</script>

<template>
  <div class="collection-list-container">
    <template v-for="collection in props.collections" :key="collection.id">
      <CollectionCard
        :collection="collection"
      />
    </template>
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
