<script lang="ts" setup>
import DropdownSection from '~/components/DevelopmentShowcase/Dropdown/DropdownSection.vue'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'

const isDialogVisible = ref<boolean>(false)

const openModal = () => {
  isDialogVisible.value = true
}

definePageMeta({
  layout: 'login-layout',
})
</script>

<template>
  <div class="development-page-container">
    <div class="development-page-header">
      <h4>Development showcase</h4>
      <ThemeSelector />
      <div class="vertical-divider" />
      <LightDarkModeSelector />
    </div>

    <ButtonSection />
    <DropdownSection />

    <section>
      <h6>Dialog</h6>
      <button @click="openModal">
        Open modal
      </button>
      <el-dialog
        v-model="isDialogVisible"
        :close-icon="CloseCircleIcon"
        class="barrage-dialog--large"
      >
        <template #header>
          <h6>Chunk Preview</h6>
        </template>
      </el-dialog>
    </section>

    <section>
      <h6>Input</h6>
    </section>

    <section>
      <h6>Input Number</h6>
    </section>

    <section>
      <h6>Notification</h6>
    </section>

    <section>
      <h6>Tab</h6>
    </section>

    <section>
      <h6>Tooltip</h6>
    </section>
  </div>
</template>

<style lang="scss" scoped>
.development-page-container {
  width: 100%;
  grid-column: span 12;
  padding: 32px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  min-height: max-content;

  & .development-page-header {
    display: flex;
    justify-content: space-between;
  }
}
</style>
