<script lang="ts" setup>
import ArrowUp from '~/assets/icons/svg/arrow-up.svg'

const chatInput = ref('')
</script>

<template>
  <section class="chat-input-section">
    <el-input
      v-model="chatInput"
      size="large"
      placeholder="Pošalji poruku"
    >
      <template #suffix>
        <div class="suffix-icon">
          <ArrowUp size="32" />
        </div>
      </template>
    </el-input>
  </section>
</template>

<style lang="scss" scoped>
.chat-input-section {
  height: 84px;
  width: 100%;
  background: transparent;
  display: flex;
  align-items: start;
  justify-content: space-around;
  & .barrage-input {
    width: 100%;
    max-width: 768px;
  }
}

.suffix-icon {
  color: var(--color-primary-100);
  background: var(--color-primary-800);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover {
    color: var(--color-primary-0);
    background: var(--color-primary-900);
  }
}
.dark {
  & .suffix-icon {
    color: var(--color-primary-700);
    background: var(--color-primary-100);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
