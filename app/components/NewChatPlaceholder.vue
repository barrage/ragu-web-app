<script lang="ts" setup>
// IMPORTS

import BrainIcon from '~/assets/icons/svg/brain.svg'

// STATE
const suggestions = ['How do I debug a segmentation fault in C++?', 'What\'s the best way to manage dependencies in a Node.js project?', 'Can you explain the purpose of unit testing in software development?', 'How do I handle asynchronous operations in Python?']
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
        <template v-for="(suggestion, index) in suggestions" :key="index">
          <ChatSuggestionCard :text="suggestion" />
        </template>
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
  margin-bottom: 1rem;
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
  flex-wrap: nowrap;
  justify-content: space-around;
  gap: 1rem;
  overflow: auto;

  padding-bottom: 2rem;
  color: var(--color-primary-800);
  & .chat-suggestion-card {
    flex: 0 0 calc(25% - 1rem);
    min-width: 180px;
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
  }
}
</style>
