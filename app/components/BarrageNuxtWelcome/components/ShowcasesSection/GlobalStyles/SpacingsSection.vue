<script setup>
const mobileSpacings = [
  { variable: '--spacing-mobile-7-xs', value: '0.25rem' },
  { variable: '--spacing-mobile-6-xs', value: '0.3125rem' },
  { variable: '--spacing-mobile-5-xs', value: '0.375rem' },
  { variable: '--spacing-mobile-4-xs', value: '0.4375rem' },
  { variable: '--spacing-mobile-3-xs', value: '0.5rem' },
  { variable: '--spacing-mobile-2-xs', value: '0.625rem' },
  { variable: '--spacing-mobile-xs', value: '0.8125rem' },
  { variable: '--spacing-mobile-s', value: '1rem' },
  { variable: '--spacing-mobile-m', value: '1.25rem' },
  { variable: '--spacing-mobile-l', value: '1.5rem' },
  { variable: '--spacing-mobile-xl', value: '1.875rem' },
  { variable: '--spacing-mobile-2-xl', value: '2.375rem' },
  { variable: '--spacing-mobile-3-xl', value: '2.9375rem' },
  { variable: '--spacing-mobile-4-xl', value: '3.6875rem' },
  { variable: '--spacing-mobile-5-xl', value: '4.625rem' },
  { variable: '--spacing-mobile-6-xl', value: '5.75rem' },
  { variable: '--spacing-mobile-7-xl', value: '7.1875rem' },
  { variable: '--spacing-mobile-8-xl', value: '9rem' },
  { variable: '--spacing-mobile-9-xl', value: '11.1875rem' },
  { variable: '--spacing-mobile-10-xl', value: '14rem' },
]

const desktopSpacings = [
  { variable: '--spacing-desktop-7-xs', value: '0.25rem' },
  { variable: '--spacing-desktop-6-xs', value: '0.3125rem' },
  { variable: '--spacing-desktop-5-xs', value: '0.375rem' },
  { variable: '--spacing-desktop-4-xs', value: '0.5rem' },
  { variable: '--spacing-desktop-3-xs', value: '0.5625rem' },
  { variable: '--spacing-desktop-2-xs', value: '0.75rem' },
  { variable: '--spacing-desktop-xs', value: '0.875rem' },
  { variable: '--spacing-desktop-s', value: '1.125rem' },
  { variable: '--spacing-desktop-m', value: '1.375rem' },
  { variable: '--spacing-desktop-l', value: '1.6875rem' },
  { variable: '--spacing-desktop-xl', value: '2.125rem' },
  { variable: '--spacing-desktop-2-xl', value: '2.6875rem' },
  { variable: '--spacing-desktop-3-xl', value: '3.3125rem' },
  { variable: '--spacing-desktop-4-xl', value: '4.125rem' },
  { variable: '--spacing-desktop-5-xl', value: '5.1875rem' },
  { variable: '--spacing-desktop-6-xl', value: '6.4375rem' },
  { variable: '--spacing-desktop-7-xl', value: '8.0625rem' },
  { variable: '--spacing-desktop-8-xl', value: '10.0625rem' },
  { variable: '--spacing-desktop-9-xl', value: '12.625rem' },
  { variable: '--spacing-desktop-10-xl', value: '15.75rem' },
]

const fluidSpacings = [
  {
    variable: '--spacing-fluid-7-xs',
    value: 'clamp(0.25rem, 0.25rem + 0vw, 0.25rem)',
  },
  {
    variable: '--spacing-fluid-6-xs',
    value: 'clamp(0.3125rem, 0.3125rem + 0vw, 0.3125rem)',
  },
  {
    variable: '--spacing-fluid-5-xs',
    value: 'clamp(0.375rem, 0.375rem + 0vw, 0.375rem)',
  },
  {
    variable: '--spacing-fluid-4-xs',
    value: 'clamp(0.4375rem, 0.4223rem + 0.0647vw, 0.5rem)',
  },
  {
    variable: '--spacing-fluid-3-xs',
    value: 'clamp(0.5rem, 0.4848rem + 0.0647vw, 0.5625rem)',
  },
  {
    variable: '--spacing-fluid-2-xs',
    value: 'clamp(0.625rem, 0.5947rem + 0.1294vw, 0.75rem)',
  },
  {
    variable: '--spacing-fluid-xs',
    value: 'clamp(0.8125rem, 0.7973rem + 0.0647vw, 0.875rem)',
  },
  {
    variable: '--spacing-fluid-s',
    value: 'clamp(1rem, 0.9697rem + 0.1294vw, 1.125rem)',
  },
  {
    variable: '--spacing-fluid-m',
    value: 'clamp(1.25rem, 1.2197rem + 0.1294vw, 1.375rem)',
  },
  {
    variable: '--spacing-fluid-l',
    value: 'clamp(1.5rem, 1.4545rem + 0.1942vw, 1.6875rem)',
  },
  {
    variable: '--spacing-fluid-xl',
    value: 'clamp(1.875rem, 1.8143rem + 0.2589vw, 2.125rem)',
  },
  {
    variable: '--spacing-fluid-2-xl',
    value: 'clamp(2.375rem, 2.2992rem + 0.3236vw, 2.6875rem)',
  },
  {
    variable: '--spacing-fluid-3-xl',
    value: 'clamp(2.9375rem, 2.8465rem + 0.3883vw, 3.3125rem)',
  },
  {
    variable: '--spacing-fluid-4-xl',
    value: 'clamp(3.6875rem, 3.5813rem + 0.4531vw, 4.125rem)',
  },
  {
    variable: '--spacing-fluid-5-xl',
    value: 'clamp(4.625rem, 4.4885rem + 0.5825vw, 5.1875rem)',
  },
  {
    variable: '--spacing-fluid-6-xl',
    value: 'clamp(5.75rem, 5.5831rem + 0.712vw, 6.4375rem)',
  },
  {
    variable: '--spacing-fluid-7-xl',
    value: 'clamp(7.1875rem, 6.9751rem + 0.9061vw, 8.0625rem)',
  },
  {
    variable: '--spacing-fluid-8-xl',
    value: 'clamp(9rem, 8.7421rem + 1.1003vw, 10.0625rem)',
  },
  {
    variable: '--spacing-fluid-9-xl',
    value: 'clamp(11.1875rem, 10.8386rem + 1.4887vw, 12.625rem)',
  },
  {
    variable: '--spacing-fluid-10-xl',
    value: 'clamp(14rem, 13.5752rem + 1.8123vw, 15.75rem)',
  },
]
</script>

<template>
  <div class="barrage-spacing-section">
    <TabTtitleContainer
      title="Spacings"
      file="assets/styles/core/_spacings.scss"
      redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/blob/master/app/assets/styles/core/_spacings.scss"
    />

    <!-- Mobile Spacings -->
    <section>
      <h6>Mobile Spacings</h6>
      <SpacingExample
        v-for="spacing in mobileSpacings"
        :key="spacing.variable"
        :spacing="spacing"
      />
    </section>

    <!-- Desktop Spacings -->
    <section>
      <h6>Desktop Spacings</h6>
      <SpacingExample
        v-for="spacing in desktopSpacings"
        :key="spacing.variable"
        :spacing="spacing"
      />
    </section>

    <!-- Fluid Spacings -->
    <section>
      <h6>Fluid Spacings</h6>
      <SpacingExample
        v-for="spacing in fluidSpacings"
        :key="spacing.variable"
        :spacing="spacing"
      />
    </section>
  </div>
</template>

<style lang="scss" scoped>
.barrage-spacing-section {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-desktop-2-xl);

  h6 {
    margin: 0;
    margin-bottom: 6px;
  }
}

section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.dark {
  & .barrage-spacing-section {
    h6 {
      color: var(--color-gray-300);
    }
  }
}
</style>
