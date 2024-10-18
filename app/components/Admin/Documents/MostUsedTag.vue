<script setup lang="ts">
import { defineProps } from 'vue'

const props = defineProps<{ mostUsedTag: string }>()
</script>

<template>
  <div class="most-used-tag">
    <h4>Most Used Tag</h4>
    <p>{{ props.mostUsedTag }}</p>
  </div>
</template>

  <style scoped>
  .most-used-tag {
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 5px;
}
</style>
