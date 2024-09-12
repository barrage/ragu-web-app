<script lang="ts" setup>
// IMPORTS

import BrainIcon from '~/assets/icons/svg/brain.svg'

// STATE
const suggestions = ['Clean account fields', 'Clean contact fields', 'Create master list', 'Create master store', 'Create master store', 'Create master store', 'Create master list']
</script>

<template>
  <div class="new-chat-placeholder-container">
    <BrainIcon
      width="64"
      height="64"
      class="ai-logo"
    />
    <h5>BarrageGPT</h5>
    <p class="description">
      {{ $t('description') }}
    </p>
    <div class="about-container">
      <p> {{ $t('askAbout') }}</p>
      <div class="suggestions-container">
        <span v-for="(suggestion, index) in suggestions" :key="index"> {{ suggestion }}</span>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.new-chat-placeholder-container {
  height: 100%;
  max-width: 48rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  h5 {
    margin-bottom: 0.9375rem;
    font-weight: bold;
    color: var(--color-primary-800);
  }
}

.ai-logo {
  color: var(--color-primary-600);
  padding: 0.5rem;
  border: 0.0625rem solid var(--color-primary-200);
  border-radius: 0.625rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  margin-block: 9.375rem 1.875rem;
}

.description {
  text-align: center;
  font-weight: 300;
  margin-bottom: 3.125rem;
  max-width: 21.875rem;
  overflow-wrap: break-word;
  word-break: break-word;
  color: var(--color-primary-700);
}

.about-container {
  text-align: center;

  p {
    margin-bottom: 1.25rem;
    font-size: 1rem;
    opacity: 0.7;
    color: var(--color-primary-600);
  }
}
.suggestions-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 0.625rem;
  row-gap: 0.9375rem;
  color: var(--color-primary-800);

  span {
    width: max-content;
    padding: 0.625rem 0.5rem;
    border: 0.0625rem solid var(--color-primary-500);
    border-radius: 1.625rem;
    color: var(--color-primary-700);
    cursor: pointer;

    &:hover {
      color: var(--color-primary-900);
      border: 0.0625rem solid var(--color-primary-700);
    }
  }
}

.dark {
  .new-chat-placeholder-container {
    & h5 {
      color: var(--color-primary-0);
    }
  }
  .ai-logo {
    color: var(--color-primary-200);
  }
  .description {
    color: var(--color-primary-100);
  }
  .about-container {
    text-align: center;

    p {
      color: var(--color-primary-200);
    }
  }
  .suggestions-container {
    color: var(--color-primary-100);

    span {
      border: 0.0625rem solid var(--color-primary-200);

      color: var(--color-primary-0);

      &:hover {
        color: var(--color-primary-200);
        border: 0.0625rem solid var(--color-primary-100);
      }
    }
  }
}
</style>
