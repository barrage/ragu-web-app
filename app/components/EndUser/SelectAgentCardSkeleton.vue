<template>
  <el-card
    class="skeleton-card"
  />
</template>

<style lang="scss" scoped>
.skeleton-card {
  padding-inline: 0.6rem;
  padding-block: 0.8rem;
  min-width: 384px;
  min-height: 180px;
  background-color: var(--color-primary-100);
  animation: pulse-light 1.5s infinite ease-in-out;
  transition:
    opacity 0.3s ease,
    transform 0.3s ease;
}

.dark {
  .skeleton-card {
    background-color: var(--color-primary-900);
    animation: pulse-dark 1.5s infinite ease-in-out;
  }
}

@keyframes pulse-light {
  0% {
    background-color: var(--color-primary-100);
  }
  50% {
    background-color: var(--color-primary-200);
  }
  100% {
    background-color: var(--color-primary-100);
  }
}

@keyframes pulse-dark {
  0% {
    background-color: var(--color-primary-900);
  }
  50% {
    background-color: var(--color-primary-800);
  }
  100% {
    background-color: var(--color-primary-900);
  }
}
</style>
