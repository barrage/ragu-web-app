<script lang="ts" setup>
import PersonKeyIcon from '~/assets/icons/svg/person-key.svg'
import ClockIcon from '~/assets/icons/svg/clock.svg'
import LocaleIcon from '~/assets/icons/svg/locale.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import type { WhatsAppAgentData } from '~/components/Backoffice/WhatsAppAgents/WhatsAppAgentDetails/WhatsAppAgentDetails.vue'

const props = defineProps<{
  whatsAppAgent: WhatsAppAgentData | undefined
}>()

const { t } = useI18n()

const labelData = computed(() => {
  return [
    {
      label: t('agents.labels.name'),
      value: props.whatsAppAgent?.name,
      icon: PersonInfoIcon,
    },
    {
      label: t('agents.labels.description'),
      value: props.whatsAppAgent?.description,
      icon: PersonInfoIcon,
    },
    {
      label: t('agents.labels.id'),
      value: props.whatsAppAgent?.id,
      icon: PersonKeyIcon,
    },
    {
      label: t('agents.labels.language'),
      value: props.whatsAppAgent?.language,
      icon: LocaleIcon,
    },
    {
      label: t('agents.labels.created_at'),
      value: formatDate(props.whatsAppAgent?.createdAt, 'MMMM DD, YYYY'),
      icon: ClockIcon,
    },
    {
      label: t('agents.labels.updated_at'),
      value: formatDate(props.whatsAppAgent?.updatedAt, 'MMMM DD, YYYY'),
      icon: ClockIcon,
    },
  ]
})
</script>

<template>
  <div class="whatsapp-agent-informations-section">
    <div class="whatsapp-agent-informations-title-wrapper">
      <h5 class="whatsapp-agent-informations-title">
        {{ t('agents.titles.details') }}
      </h5>
    </div>
    <LabelDescriptionItem
      v-for="data in labelData"
      :key="data.label"
      :label="data.label"
      :description="data.value"
      horizontal
    >
      <template #customLabel>
        <div class="whatsapp-agent-details-custom-label">
          <component :is="data.icon" size="18px" />
          <span>  {{ data.label }}</span>
        </div>
      </template>
    </LabelDescriptionItem>
  </div>
</template>

<style lang="scss" scoped>
.whatsapp-agent-informations-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  row-gap: 1.5rem;
  column-gap: 32px;
  margin-top: 22px;

  :deep(.description) {
    font-size: var(--font-size-fluid-2);
  }
}

.whatsapp-agent-informations-title-wrapper {
  grid-column: span 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary-800);
  padding-inline: 0.8rem;
  & .whatsapp-agent-informations-title {
    color: var(--color-primary-900);
    font-size: var(--font-size-fluid-4);
  }
}

.whatsapp-agent-details-custom-label {
  display: flex;
  align-items: center;
  gap: 8px;
  flex: 0 0 calc(30% - 0.5rem);
  color: var(--color-primary-900);
  font-size: var(--font-size-fluid-3);
  max-height: fit-content;

  svg {
    flex-shrink: 0;
  }
}
.dark {
  & .whatsapp-agent-details-custom-label {
    color: var(--color-primary-100);
  }

  & .label {
    color: var(--color-primary-100);
  }
  & .whatsapp-agent-informations-title-wrapper {
    color: var(--color-primary-100);
    & .whatsapp-agent-informations-title {
      color: var(--color-primary-0);
    }
  }
}

.label-description-item-container {
  grid-column: span 2;
  padding-inline: var(--spacing-fluid-m);

  @include viewport-ml {
    grid-column: span 1;
  }
}
</style>
