<script lang="ts" setup>
import { computed } from 'vue'

const borderSizes = [
  { name: 'Border Size 1', variable: '--border-size-1' },
  { name: 'Border Size 2', variable: '--border-size-2' },
]

const borderTypes = [
  { name: 'Border Type Solid', variable: '--border-type-solid' },
  { name: 'Border Type Dashed', variable: '--border-type-dashed' },
]

const borderColors = [
  { name: 'Border Color', variable: '--border-color' },
  { name: 'Border Transparent', variable: '--border-transparent' },
]

const borderRadius = [
  { name: 'Radius 1', variable: '--radius-1' },
  { name: 'Radius 2', variable: '--radius-2' },
  { name: 'Radius 3', variable: '--radius-3' },
  { name: 'Radius 4', variable: '--radius-4' },
  { name: 'Radius 5', variable: '--radius-5' },
  { name: 'Radius 6', variable: '--radius-6' },
  { name: 'Radius 9', variable: '--radius-9' },
  { name: 'Radius Circle', variable: '--radius-circle' },
]

const getStyle = (variable: string, type: string) => {
  const style = getComputedStyle(document.documentElement)
  const value = style.getPropertyValue(variable).trim()

  switch (type) {
    case 'size':
      return { border: `${value} solid var(--color-gray-500)` }
    case 'type':
      return { border: `2px ${value} var(--color-gray-500)` }
    case 'color':
      return { border: `2px solid ${value}` }
    case 'radius':
      return { borderRadius: value, border: '2px solid var(--color-gray-500)' }
    default:
      return {}
  }
}

// Get the computed styles and their values
const getVariableValue = (variable: string) => {
  return getComputedStyle(document.documentElement).getPropertyValue(variable).trim()
}

const borderSizeStyles = computed(() => borderSizes.map(border => ({
  ...border,
  style: getStyle(border.variable, 'size'),
  value: getVariableValue(border.variable), // Get actual value
})))

const borderTypeStyles = computed(() => borderTypes.map(border => ({
  ...border,
  style: getStyle(border.variable, 'type'),
  value: getVariableValue(border.variable), // Get actual value
})))

const borderColorStyles = computed(() => borderColors.map(border => ({
  ...border,
  style: getStyle(border.variable, 'color'),
  value: getVariableValue(border.variable), // Get actual value
})))

const borderRadiusStyles = computed(() => borderRadius.map(border => ({
  ...border,
  style: getStyle(border.variable, 'radius'),
  value: getVariableValue(border.variable), // Get actual value
})))
</script>

<template>
  <div class="borders-showcase">
    <TabTtitleContainer
      title="Borders"
      file="assets/styles/core/_borders.scss"
      redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/blob/master/app/assets/styles/core/_borders.scss"
    />

    <section class="border-section">
      <h6>Border Sizes</h6>
      <div class="borders">
        <div
          v-for="border in borderSizeStyles"
          :key="border.variable"
          class="border-example"
          :style="border.style"
        >
          <div class="border-label">
            {{ border.name }}: {{ border.value }}
          </div>
        </div>
      </div>
    </section>

    <section class="border-section">
      <h6>Border Types</h6>
      <div class="borders">
        <div
          v-for="border in borderTypeStyles"
          :key="border.variable"
          class="border-example"
          :style="border.style"
        >
          <div class="border-label">
            {{ border.name }}: {{ border.value }}
          </div>
        </div>
      </div>
    </section>

    <section class="border-section">
      <h6>Border Colors</h6>
      <div class="borders">
        <div
          v-for="border in borderColorStyles"
          :key="border.variable"
          class="border-example"
          :style="border.style"
        >
          <div class="border-label">
            {{ border.name }}: {{ border.value }}
          </div>
        </div>
      </div>
    </section>

    <section class="border-section">
      <h6>Border Radius</h6>
      <div class="borders">
        <div
          v-for="border in borderRadiusStyles"
          :key="border.variable"
          class="border-example"
          :style="border.style"
        >
          <div class="border-label">
            {{ border.name }}: {{ border.value }}
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.borders-showcase {
  display: flex;
  flex-direction: column;
  gap: 40px;

  h6 {
    margin-bottom: 10px;
  }

  .borders {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 20px;
    margin-bottom: 20px;
  }

  .border-example {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100px;
    border: 2px solid var(--color-gray-500);
    border-radius: var(--radius-1);
    transition: all 0.3s ease;
  }

  .border-label {
    text-align: center;
    font-size: 0.875rem;
  }
}

.border-section {
  display: flex;
  flex-direction: column;
  gap: 22px;
}

.dark {
  .border-example {
    border-color: var(--color-gray-400);
  }
}
</style>
