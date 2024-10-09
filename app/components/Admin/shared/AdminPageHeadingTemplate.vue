<script lang="ts" setup>

</script>

<template>
  <div class="admin-page-heading-template-container">
    <div>
      <slot name="title" />
    </div>
    <div>
      <slot name="actions" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.admin-page-heading-template-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
}
</style>
