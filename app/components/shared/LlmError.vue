<script setup lang="ts">
interface Props {
  title: string
  description: string
  error: any
}

defineProps<Props>()
</script>

<template>
  <div class="error-wrapper">
    <slot name="image" />
    <div class="description">
      <h2 class="title">
        {{ title }}
      </h2>
      <h3>
        {{ error }}
      </h3>
      <p class="text">
        {{ description }}
      </p>
      <p
        class="error-info"
      >
        Please
        go
        back
        or
        continue
        your
        journey
        from
        <LlmLink
          to="/"
          type="link"
        >
          your dashboard
        </LlmLink>.
      </p>
      <LlmLink type="button" @click="clearError()">
        Go to home page
      </LlmLink>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-wrapper {
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: var(--color-primary-300);
  padding: 1.875rem;
  margin-top: 1.25rem;
  border-radius: 0.625rem;

  &:deep(img) {
    margin-bottom: auto;
    width: 100%;
    max-height: 50rem;
    object-fit: cover;
  }

  & .description {
    margin-bottom: auto;
    margin-top: 0;
  }

  & .title,
  .text {
    margin-block: 1.875rem;
  }

  & .error-info {
    margin-bottom: 1.875rem;
  }
}
</style>
