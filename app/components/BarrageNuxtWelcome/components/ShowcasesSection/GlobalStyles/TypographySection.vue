<script setup>
import { onMounted, ref } from 'vue'

// Font families
const fontFamilies = [
  {
    variable: '--font-sans',
    value:
      'system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, Noto Sans, sans-serif',
  },
  { variable: '--font-serif', value: 'ui-serif, serif' },
  {
    variable: '--font-asap',
    value:
      '\'Asap\', \'Arial\', \'Helvetica\', sans-serif',
  },
  {
    variable: '--font-primary',
    value: 'var(--font-asap, var(--font-sans))',
  },
]

// Font weights
const fontWeights = [
  { variable: '--font-weight-thin', value: '100' },
  { variable: '--font-weight-extra-light', value: '200' },
  { variable: '--font-weight-light', value: '300' },
  { variable: '--font-weight-regular', value: '400' },
  { variable: '--font-weight-medium', value: '500' },
  { variable: '--font-weight-semibold', value: '600' },
  { variable: '--font-weight-bold', value: '700' },
  { variable: '--font-weight-extra-bold', value: '800' },
]

// Font sizes
const mobileFontSizes = ref([])
const desktopFontSizes = ref([])
const fluidFontSizes = ref([])

onMounted(() => {
  const mobileSizes = Array.from({ length: 10 }, (_, i) => ({
    variable: `--font-size-mobile-${i + 1}`,
    value: getComputedStyle(document.documentElement).getPropertyValue(
      `--font-size-mobile-${i + 1}`,
    ),
  }))

  const desktopSizes = Array.from({ length: 10 }, (_, i) => ({
    variable: `--font-size-desktop-${i + 1}`,
    value: getComputedStyle(document.documentElement).getPropertyValue(
      `--font-size-desktop-${i + 1}`,
    ),
  }))

  const fluidSizes = Array.from({ length: 10 }, (_, i) => ({
    variable: `--font-size-fluid-${i + 1}`,
    value: getComputedStyle(document.documentElement).getPropertyValue(
      `--font-size-fluid-${i + 1}`,
    ),
  }))

  mobileFontSizes.value = mobileSizes
  desktopFontSizes.value = desktopSizes
  fluidFontSizes.value = fluidSizes
})
</script>

<template>
  <div class="barrage-typography-section">
    <TabTtitleContainer
      title="Typography"
      file="assets/styles/core/_typography.scss"
      redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/blob/master/app/assets/styles/core/_typography.scss"
    />
    <!-- Font Families -->
    <section>
      <h6>Font Families</h6>
      <div
        v-for="font in fontFamilies"
        :key="font.variable"
        class="font-example"
        :style="{ fontFamily: `var(${font.variable})` }"
      >
        {{ font.variable }}
        <span class="variable-value">{{ font.value }}</span>
      </div>
    </section>

    <!-- Font Weights -->
    <section>
      <h6>Font Weights</h6>
      <div
        v-for="weight in fontWeights"
        :key="weight.variable"
        class="font-example"
        :style="{ fontWeight: `var(${weight.variable})` }"
      >
        {{ weight.variable }}
        <span class="variable-value">{{ weight.value }}</span>
      </div>
    </section>

    <!-- Mobile Font Sizes -->
    <section>
      <h6>Mobile Font Sizes</h6>
      <div
        v-for="size in mobileFontSizes"
        :key="size.variable"
        class="font-example"
        :style="{ fontSize: `var(${size.variable})` }"
      >
        {{ size.variable }}
        <span class="variable-value">{{ size.value }}</span>
      </div>
    </section>

    <!-- Desktop Font Sizes -->
    <section>
      <h6>Desktop Font Sizes</h6>
      <div
        v-for="size in desktopFontSizes"
        :key="size.variable"
        class="font-example"
        :style="{ fontSize: `var(${size.variable})` }"
      >
        {{ size.variable }}
        <span class="variable-value">{{ size.value }}</span>
      </div>
    </section>

    <!-- Fluid Font Sizes -->
    <section>
      <h6>Fluid Font Sizes</h6>
      <div
        v-for="size in fluidFontSizes"
        :key="size.variable"
        class="font-example"
        :style="{ fontSize: `var(${size.variable})` }"
      >
        {{ size.variable }}
        <span class="variable-value">{{ size.value }}</span>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.barrage-typography-section {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 42px;

  h6 {
    margin: 0;
    color: var(--color-gray-700);
  }
}

section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.font-example {
  padding: 8px 8px 8px 16px;
  border: 2px solid var(--color-gray-400);
  border-radius: 4px;
  font-family: var(--font-primary);
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 22px;
  background: var(--color-gray-100);
}

.variable-value {
  font-size: var(--font-size-fluid-3);
  color: var(--color-gray-700);
}

.dark {
  & .barrage-typography-section {
    h6 {
      color: var(--color-gray-300);
    }
  }
  & .font-example {
    background: var(--color-darkmode-100);
    border-color: var(--color-darkmode-500);
  }

  & .variable-value {
    color: var(--color-gray-300);
  }
}
</style>
