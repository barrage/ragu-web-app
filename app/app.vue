<template>
  <ElConfigProvider namespace="barrage">
    <NuxtLayout />
  </ElConfigProvider>
</template>

<style scoped>
.layout-enter-active,
.layout-leave-active {
  position: absolute;
  width: 100%;
  transition: all 0.5s ease;
}

.layout-leave-active {
  opacity: 1;
}
.layout-leave-to {
  opacity: 0;
}

.layout-enter-active {
  opacity: 0;
}
.layout-enter-to {
  opacity: 1;
}
</style>
