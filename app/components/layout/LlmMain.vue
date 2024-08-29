<script lang="ts" setup>
// IMPORTS

import AiLogo from '~/assets/icons/svg/info.svg'
import ArrowUp from '~/assets/icons/svg/arrow-up.svg'

// STATE
const suggestions = ['Clean account fields', 'Clean contact fields', 'Create master list', 'Create master store', 'Create master store', 'Create master store', 'Create master list']
</script>

<template>
  <div class="main-container">
    <AiLogo
      width="50"
      height="50"
      class="ai-logo"
    />
    <h5>Talk the data to me</h5>
    <p class="description">
      Choose prompt below or write your own to <br> start chatting with me
    </p>
    <div class="about-container">
      <p>Ask About:</p>
      <div class="suggestions-container">
        <span v-for="(suggestion, index) in suggestions" :key="index"> {{ suggestion }}</span>
      </div>
    </div>
    <div class="input-container">
      <input
        type="text"
        placeholder="Type your message..."
        class="input-field"
      >
      <button class="submit-btn">
        <ArrowUp class="submit-icon" />
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.main-container {
  height: 100%;
  max-width: 48rem;
  margin-inline: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--color-primary-subtle);
  h5 {
    margin-bottom: 0.9375rem;
    font-weight: bold;
  }
}

.ai-logo {
  color: var(--color-gray-500);
  padding: 0.5rem;
  border: 1px solid var(--color-gray-500);
  border-radius: 0.625rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  margin-block: 9.375rem 1.875rem;
}

.description {
  text-align: center;
  font-weight: 300;
  margin-bottom: 3.125rem;
}

.about-container {
  text-align: center;
  p {
    margin-bottom: 1.25rem;
    font-size: 16px;
    opacity: 0.7;
  }
}
.suggestions-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  column-gap: 0.625rem;
  row-gap: 0.9375rem;

  span {
    width: max-content;
    padding: 0.625rem 0.5rem;
    border: 1px solid var(--color-primary-200);
    border-radius: 1.625rem;
    cursor: pointer;
  }
}
.input-container {
  display: flex;
  align-items: center;
  margin-block: auto 3.125rem;
  padding: 0.5rem;
  border: 1px solid var(--color-primary-500);
  border-radius: 1.25rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  background-color: #ffffff;
  width: 100%;
}

.input-field {
  flex: 1;
  border: none;
  outline: none;
  padding: 0.5rem;
  font-size: 1rem;
  color: var(--color-gray-700);
}

.submit-btn {
  background-color: var(--color-gray-500);
  border: none;
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 0.5rem;

  .submit-icon {
    width: 1.5rem;
    height: 1.5rem;
    color: #ffffff;
  }

  &:hover {
    background-color: var(--color-gray-700);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 4px var(--color-gray-500);
  }
}
.dark {
  .main-container {
    background-color: var(--color-primary-900);
  }
}
</style>
