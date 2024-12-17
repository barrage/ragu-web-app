<script lang="ts" setup>
import ArrowRightIcon from '~/assets/icons/svg/arrow-right.svg'

const props = defineProps<{
  title: string
  value: string | number
  description: string | number
  redirectUrl: string
  redirectText?: string
}>()

const slots = defineSlots<Slots>()
interface Slots {
  customActions?: () => string | Component
  customIcon?: () => string | Component
}
</script>

<template>
  <el-card class="is-accent service-widget-overview">
    <div class="service-widget-card-content-container">
      <div class="service-overview-widget-header">
        <div class="title-icon-wrapper">
          <template v-if="slots.customIcon">
            <slot name="customIcon" />
          </template>

          <p class="service-overview-widget-title">
            {{ props.title }}
          </p>
        </div>

        <div>
          <template v-if="slots.customActions">
            <slot name="customActions" />
          </template>
        </div>
      </div>

      <div class="service-overview-widget-body">
        <p class="service-overview-widget-value">
          {{ props.value }}
        </p>

        <span class="service-overview-widget-description">{{ props.description }}</span>

        <div class="horizontal-divider" />
        <LlmLink :to="redirectUrl" class="service-overview-widget-redirect-link">
          {{ redirectText }} <ArrowRightIcon size="20px" />
        </LlmLink>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.service-widget-overview {
  &:deep(.barrage-card__body) {
    min-height: 100%;
  }
  & .service-widget-card-content-container {
    display: flex;
    flex-direction: column;
    gap: var(--spacing-fluid-m);
  }
}
.service-overview-widget-header {
  display: flex;
  justify-content: space-between;

  & .title-icon-wrapper {
    display: flex;
    align-items: center;
    color: var(--color-primary-800);
    gap: 0.5rem;
    & .service-overview-widget-title {
      color: var(--color-primary-800);
      font-size: var(--font-size-fluid-3);
      font-weight: var(--font-weight-bold);
    }
  }
}

.service-overview-widget-body {
  margin-top: auto;

  & .service-overview-widget-value {
    font-size: var(--font-size-fluid-5);
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-900);
  }

  & .service-overview-widget-description {
    font-size: var(--font-size-fluid-2);
    color: var(--color-primary-700);
  }
}
.service-overview-widget-redirect-link {
  display: flex;
  align-items: center;
  gap: 1rem;
  color: var(--color-primary-900);
  margin-top: var(--spacing-fluid-3-xs);

  &:hover {
    color: var(--color-primary-800);
  }
}

.horizontal-divider {
  background: var(--color-primary-400);
}

.dark {
  .service-overview-widget-header {
    & .title-icon-wrapper {
      color: var(--color-primary-0);
      & .service-overview-widget-title {
        color: var(--color-primary-subtle);
      }
    }
  }
  .horizontal-divider {
    background: var(--color-primary-700);
  }
  .service-overview-widget-redirect-link {
    color: var(--color-primary-0);

    &:hover {
      color: var(--color-primary-100);
    }
  }
  .service-overview-widget-body {
    margin-top: auto;

    & .service-overview-widget-value {
      color: var(--color-primary-0);
    }

    & .service-overview-widget-description {
      color: var(--color-primary-200);
    }
  }
}
</style>
