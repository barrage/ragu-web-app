<script lang="ts" setup>
// IMPORTS
import BarrageLogo from '~/assets/icons/svg/barrage-logo.svg'
import More from '~/assets/icons/svg/more.svg'
</script>

<template>
  <header>
    <BarrageLogo
      width="80px"
      height="80px"
      color="black"
    />

    <button class="settings">
      <More />
    </button>
  </header>
</template>

<style lang="scss" scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  grid-area: header;
  position: sticky;
  top: 0;
  z-index: 1;
  padding: 0.75rem;
  border-bottom: 1px solid var(--color-gray-200);
  background-color: white;

  .settings {
    border: none;
    color: var(--color-gray-700);
    cursor: pointer;
    &:hover {
      color: var(--color-gray-500);
    }
  }
}
</style>
