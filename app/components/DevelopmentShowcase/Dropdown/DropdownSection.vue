<script lang="ts" setup>
const dropdownItems = ref(['dropdown item 1', 'dropdown item 1', 'dropdown item 1', 'dropdown item 1'])

const popperOptions = {
  placement: 'bottom-start',
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 6],
      },
    },
    {
      name: 'flip',
      options: {
        fallbackPlacements: ['top-start'],
      },
    },
  ],
}
</script>

<template>
  <section>
    <h5 class="dropdown-section-title">
      Dropdown
    </h5>
    <ClientOnly>
      <el-dropdown trigger="click" :popper-options="popperOptions">
        <el-button size="small">
          <Globe />
          <p>
            Dropdown click
          </p>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in dropdownItems"
              :key="item"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-dropdown trigger="hover" :popper-options="popperOptions">
        <el-button size="small">
          <Globe />
          <p>
            Dropdown hover
          </p>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="item in dropdownItems"
              :key="item"
            >
              {{ item }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </ClientOnly>
  </section>
</template>

<style lang="scss" scoped>

</style>
