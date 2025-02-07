<script lang="ts" setup>
import type { CreateUserOption } from '~/types/users'
import AddIcon from '~/assets/icons/svg/add.svg'

defineProps<{
  createUserOption: CreateUserOption
}>()

const slots = defineSlots<Slots>()
interface Slots {
  customIcon?: () => string | Component
}
</script>

<template>
  <el-card
    v-motion-slide-left
    class="create-user-card-option is-primary"
  >
    <div class="create-user-card-option-body">
      <div class="icon-wrapper">
        <template v-if="slots.customIcon">
          <slot name="customIcon" />
        </template>
        <template v-else>
          <AddIcon size="64px" />
        </template>
      </div>

      <h5 class="create-user-option-title">
        {{ createUserOption.name }}
      </h5>
      <p class="create-user-option-description">
        {{ createUserOption.description }}
      </p>
      <LlmLink
        :to="createUserOption.href"
        type="buttonPrimary"
        class="redirect-link"
      >
        {{ $t('create') }}
      </LlmLink>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.create-user-card-option-body {
  display: flex;
  flex-direction: column;
  gap: 0.6rem;

  & .icon-wrapper {
    margin: auto;
    color: var(--color-primary-900);
  }
  & .create-user-option-title {
    margin: auto;
    color: var(--color-primary-1000);
  }
  & .create-user-option-description {
    font-size: var(--font-size-fluid-3);
    line-height: normal;
    color: var(--color-primary-800);
    margin: auto;
  }

  & .redirect-link {
    width: 100%;
  }
}

.dark {
  .create-user-card-option-body {
    & .icon-wrapper {
      color: var(--color-primary-100);
    }
    & .create-user-option-title {
      color: var(--color-primary-0);
    }
    & .create-user-option-description {
      color: var(--color-primary-200);
    }
  }
}
</style>
