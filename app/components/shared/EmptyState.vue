<script lang="ts" setup>
import EmptyDefaultIcon from '~/assets/icons/svg/question.svg'

interface Props {
  title?: string
  description?: string
  ctaText?: string
}

withDefaults(defineProps<Props>(), {
  title: '',
  description: '',
  ctaText: '',
})

const emit = defineEmits<{
  (e: 'ctaClick'): void
}>()

const slots = defineSlots<Slots>()

interface Slots {
  icon?: () => Component
  cta?: () => Component
}

const { t } = useI18n()

const handleCtaClick = () => {
  emit('ctaClick')
}
</script>

<template>
  <div class="details-empty-state">
    <div class="empty-state-content">
      <template v-if="slots.icon">
        <slot name="icon">
          <EmptyDefaultIcon size="44px" />
        </slot>
      </template>

      <p><b>{{ title || t('empty_title') }}</b></p>
      <span>
        {{ description || t('empty_description') }}
      </span>
      <template v-if="slots.cta">
        <slot name="cta">
          <el-button v-if="ctaText" @click="handleCtaClick">
            <EmptyDefaultIcon size="44px" />
            {{ ctaText }}
          </el-button>
        </slot>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.details-empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  min-height: 300px;
  padding: var(--spacing-fluid-4-md);
  text-align: center;
}

.empty-state-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.empty-state-content p {
  font-size: var(--font-size-fluid-4);
  color: var(--color-primary-900);
}

.empty-state-content span {
  font-size: var(--font-size-fluid-3);
  color: var(--color-primary-600);
  max-width: 700px;
}

.dark {
  .empty-state-content p {
    color: var(--color-primary-0);
  }
  .empty-state-content span {
    color: var(--color-primary-200);
  }
}
</style>
