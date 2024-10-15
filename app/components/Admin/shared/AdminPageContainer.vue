<script lang="ts" setup>

</script>

<template>
  <div class="admin-page-container">
    <slot name="default" />
  </div>
</template>

<style lang="scss" scoped>
.admin-page-container {
  padding: 1rem 2rem;

  @include viewport-l {
    padding-inline: 2.5rem;
  }
  @include viewport-xl {
    padding-inline: 5rem;
  }
}
</style>
