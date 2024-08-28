<template>
  <section class="vueuse-section">
    <TabTtitleContainer title="Composables" />
    <p>
      Our Nuxt 3 boilerplate leverages <strong class="vue-use-text">VueUse</strong> to offer a robust set of default composables.
      <br>
      VueUse provides a comprehensive set of composition functions to help you build Vue applications more efficiently.
    </p>
    <p>
      <b>Instead of reinventing the wheel, check out the VueUse documentation
        for a list of available functions</b>
    </p>
    <div class="links-wrapper">
      <a
        class="vueuse-link"
        href="https://vueuse.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        VueUse Documentation
      </a>

      <a
        class="vueuse-link"
        href="https://vueuse.org/functions.html"
        target="_blank"
        rel="noopener noreferrer"
      > VueUse Functions</a>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .vueuse-section {
  padding: 20px;
  border-radius: 8px;
}

.vueuse-section h1 {
  font-size: 1.5em;
  margin-bottom: 1em;
}

.vueuse-section p {
  margin-bottom: 1em;
  font-size: 1em;
  color: var(--color-gray-600);

  & b {
    color: var(--color-red-700);
  }
}

.vueuse-link {
  color: var(--color-gray-50);
  text-decoration: none;
  font-weight: bold;
  border: 1px solid var(--color-green-500);
  border-radius: 8px;
  padding: 8px;
  background: var(--color-green-400);
  transition: all 0.2s ease;
}

.vueuse-link:hover {
  background: var(--color-green-100);
  color: var(--color-green-600);
}

.links-wrapper {
  display: flex;
  align-items: center;
  gap: 66px;
  margin-top: 32px;
}

.vue-use-text {
  color: var(--color-green-500);
}

.dark {
  & .vueuse-section {
    & p {
      color: var(--color-gray-400);
      & b {
        color: var(--color-red-200);
      }
    }
  }
  & .vueuse-link:hover {
    background: var(--color-green-300);
    color: var(--color-green-900);
  }
}
</style>
