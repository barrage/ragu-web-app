<script lang="ts" setup>
const props = defineProps<{
  text: string
}>()
</script>

<template>
  <div class="chat-suggestion-card">
    <p class="chat-suggestion-text">
      {{ props.text }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.chat-suggestion-card {
  border: 1px solid var(--color-primary-400);
  padding: 0.75rem;
  padding-bottom: 1rem;
  border-radius: 1rem;
  transition: all 0.3s ease;

  & .chat-suggestion-text {
    font-size: var(--font-size-desktop-2);
    text-align: left;
    line-height: 1.5rem;
    color: var(--color-primary-700);
  }

  &:hover {
    border: 1px solid var(--color-primary-500);
    background: var(--color-primary-100);
    cursor: pointer;

    & .chat-suggestion-text {
      color: var(--color-primary-900);
    }
  }
}

.dark {
  & .chat-suggestion-card {
    & .chat-suggestion-text {
      color: var(--color-primary-200);
    }

    &:hover {
      border: 1px solid var(--color-primary-300);
      background: var(--color-primary-800);

      & .chat-suggestion-text {
        color: var(--color-primary-0);
      }
    }
  }
}
</style>
