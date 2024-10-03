<script lang="ts" setup>
const props = defineProps<{
  vectorProviders: Array<string> | undefined | null
}>()
</script>

<template>
  <div class="vector-providers-card">
    <h6>Vector providers</h6>

    <div v-if="props.vectorProviders" class="vector-providers-list">
      <template v-for="vectorProvider in vectorProviders" :key="vectorProvider">
        <p>{{ vectorProvider }}</p>
      </template>
    </div>
    <div v-else>
      No data
    </div>
  </div>
</template>

<style lang="scss" scoped>
.vector-providers-card {
  border-radius: 8px;
  border: 1px solid var(--color-primary-400);
  padding: 12px 16px;
}
</style>
