<script lang="ts" setup>
useHead({
  title: `Barrage Nuxt Boilerplate -- 🚀`,
})
</script>

<template>
  <div class="barrage-nuxt-welcome-container">
    <HeaderSection />
    <HeroSection />
    <FeaturesSection />
    <ShowcaseSection />
    <LocalizationSection />
    <AllProducts />
  </div>
</template>

<style lang="scss" scoped>
.barrage-nuxt-welcome-container {
  grid-column: 1/-1;
  padding-top: 1.25rem;
  padding-inline: 100px;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-fluid-4-xl);
}
</style>
