<script setup>
const viewMode = ref('mobile') // 'mobile', 'tablet', 'desktop'

const setViewMode = (mode) => {
  viewMode.value = mode
}

const gridVariables = computed(() => ({
  autoRows: 'max-content',
  rows: '1',
  columns: viewMode.value === 'mobile' ? '4' : viewMode.value === 'tablet' ? '8' : '12',
  rowGap: 'clamp(1rem, 0.909rem + 0.3883vw, 1.375rem)',
  columnGap: 'clamp(1rem, 0.909rem + 0.3883vw, 1.375rem)',
  innerAutoRows: 'max-content',
  innerRows: '1',
  innerColumns: viewMode.value === 'mobile' ? '4' : viewMode.value === 'tablet' ? '6' : '8',
  innerRowGap: 'clamp(1rem, 0.909rem + 0.3883vw, 1.375rem)',
  innerColumnGap: 'clamp(1rem, 0.909rem + 0.3883vw, 1.375rem)',
}))
</script>

<template>
  <div class="grid-showcase">
    <TabTtitleContainer
      title="Grid"
      file="assets/styles/core/_grid.scss"
      redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/blob/master/app/assets/styles/core/_grid.scss"
    />
    <div class="button-group">
      <button
        :class="{ active: viewMode === 'mobile' }"
        @click="setViewMode('mobile')"
      >
        Mobile View
      </button>
      <button
        :class="{ active: viewMode === 'tablet' }"
        @click="setViewMode('tablet')"
      >
        Tablet View
      </button>
      <button
        :class="{ active: viewMode === 'desktop' }"
        @click="setViewMode('desktop')"
      >
        Desktop View
      </button>
    </div>
    <div class="grid-container">
      <div class="grid" :class="{ mobile: viewMode === 'mobile', tablet: viewMode === 'tablet', desktop: viewMode === 'desktop' }">
        <div
          v-for="i in 12"
          :key="`item-${i}`"
          class="grid-item"
        >
          {{ i }}
        </div>
      </div>
      <div class="grid-inner" :class="{ innerMobile: viewMode === 'mobile', innerTablet: viewMode === 'tablet', innerDesktop: viewMode === 'desktop' }">
        <div
          v-for="i in 4"
          :key="`inner-item-${i}`"
          class="grid-inner-item"
        >
          Inner {{ i }}
        </div>
      </div>
    </div>
    <div class="grid-values">
      <section>
        <h6>Grid Variables</h6>
        <div class="grid-variable">
          <div class="variable-name">
            --grid-auto-rows
          </div>

          <div class="variable-value">
            {{ gridVariables.autoRows }}
          </div>
        </div>
        <div class="grid-variable">
          <div class="variable-name">
            --grid-rows
          </div>
          <div class="variable-value">
            {{ gridVariables.rows }}
          </div>
        </div>
        <div class="grid-variable">
          <div class="variable-name">
            --grid-columns
          </div>
          <div class="variable-value">
            {{ gridVariables.columns }}
          </div>
        </div>
        <div class="grid-variable">
          <div class="variable-name">
            --grid-row-gap
          </div>
          <div class="variable-value">
            {{ gridVariables.rowGap }}
          </div>
        </div>
        <div class="grid-variable">
          <div class="variable-name">
            --grid-column-gap
          </div>
          <div class="variable-value">
            {{ gridVariables.columnGap }}
          </div>
        </div>
        <div class="grid-variable">
          <div class="variable-name">
            --grid-inner-auto-rows
          </div>
          <div class="variable-value">
            {{ gridVariables.innerAutoRows }}
          </div>
        </div>
        <div class="grid-variable">
          <div class="variable-name">
            --grid-inner-rows
          </div>
          <div class="variable-value">
            {{ gridVariables.innerRows }}
          </div>
        </div>
        <div class="grid-variable">
          <div class="variable-name">
            --grid-inner-columns
          </div>
          <div class="variable-value">
            {{ gridVariables.innerColumns }}
          </div>
        </div>
        <div class="grid-variable">
          <div class="variable-name">
            --grid-inner-row-gap
          </div>
          <div class="variable-value">
            {{ gridVariables.innerRowGap }}
          </div>
        </div>
        <div class="grid-variable">
          <div class="variable-name">
            --grid-inner-column-gap
          </div>
          <div class="variable-value">
            {{ gridVariables.innerColumnGap }}
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.grid-showcase {
  display: flex;
  flex-direction: column;
  gap: 20px;

  h5 {
    margin: 0;
    font-size: 1.5rem;
  }

  .button-group {
    display: flex;
    gap: 10px;

    button {
      padding: 10px 20px;
      border: none;
      background-color: var(--color-green-400);
      color: white;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s ease;

      &.active {
        background-color: var(--color-green-800);
      }

      &:not(.active):hover {
        background-color: #17b86d;
      }
    }
  }

  .grid-container {
    display: flex;
    flex-direction: column;
    gap: 20px;
    & .mobile {
      width: 375px;
      margin: auto;
    }
    & .tablet {
      width: 768px;
      margin: auto;
    }
    & .desktop {
      width: 100%;
      margin: auto;
    }
  }

  .grid {
    display: grid;
    grid-template-rows: repeat(var(--grid-rows), 1fr);
    grid-template-columns: repeat(var(--grid-columns), 1fr);
    grid-auto-rows: var(--grid-auto-rows);
    gap: var(--grid-row-gap) var(--grid-column-gap);
    padding: 10px;
    border-radius: 4px;
    transition: all 0.3s ease;
    background-color: #f9f9f9;
    border: 1px solid var(--color-gray-400);

    &.mobile {
      --grid-columns: 4;
    }

    &.tablet {
      --grid-columns: 8;
    }

    &.desktop {
      --grid-columns: 12;
    }

    .dark & {
      background-color: #333;
      border: 1px solid #444;
    }
  }

  .grid-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e0e0e0;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 4px;
    font-size: 0.875rem;
    height: 100px;
    text-align: center;
    background-color: #e0e0e0;
    border: 1px solid #ddd;

    .dark & {
      background-color: #555;
      border: 1px solid #666;
    }
  }

  .grid-inner {
    display: grid;
    grid-template-rows: repeat(var(--grid-inner-rows), 1fr);
    grid-template-columns: repeat(var(--grid-inner-columns), 1fr);
    grid-auto-rows: var(--grid-inner-auto-rows);
    gap: var(--grid-inner-row-gap) var(--grid-inner-column-gap);
    padding: 10px;
    border-radius: 4px;
    margin-top: 20px;
    border: 1px solid #999;
    background-color: #f5f5f5;
    &.innerMobile {
      width: 375px;
      margin: auto;
    }
    &.innerTablet {
      width: 768px;
      margin: auto;
    }
    .dark & {
      border: 1px solid #666;
      background-color: #444;
    }
  }

  .grid-inner-item {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #d0d0d0;
    border: 1px solid #bbb;
    padding: 10px;
    border-radius: 4px;
    font-size: 0.75rem;
    height: 80px;
    text-align: center;

    background-color: #d0d0d0;
    border: 1px solid #bbb;

    .dark & {
      background-color: #666;
      border: 1px solid #777;
    }
  }

  .grid-values {
    section {
      display: flex;
      flex-direction: column;
      gap: 10px;
    }

    .grid-variable {
      padding: 8px 8px 8px 16px;
      border: 2px solid var(--color-gray-400);
      border-radius: 4px;
      font-family: var(--font-primary);
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 22px;
      background: var(--color-gray-100);

      .dark & {
        background: var(--color-darkmode-100);
        border-color: var(--color-darkmode-500);
      }
    }

    .variable-name {
      font-weight: bold;

      color: #333;

      .dark & {
        color: #ccc;
      }
    }

    .variable-value {
      color: #333;

      .dark & {
        color: #ccc;
      }
    }
  }
}
</style>
