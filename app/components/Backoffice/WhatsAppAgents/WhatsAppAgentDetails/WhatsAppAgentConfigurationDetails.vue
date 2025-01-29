<script lang="ts" setup>
import BrainIcon from '~/assets/icons/svg/brain.svg'
import PersonInfoIcon from '~/assets/icons/svg/person-info.svg'
import PersonClockIcon from '~/assets/icons/svg/person-clock.svg'
import type { WhatsAppAgentData } from '~/components/Backoffice/WhatsAppAgents/WhatsAppAgentDetails/WhatsAppAgentDetails.vue'

const props = defineProps<{
  whatsAppAgent: WhatsAppAgentData | null | undefined
}>()
const { t } = useI18n()
const tabData = computed(() => {
  return {
    configuration: {
      name: t('agents.titles.configuration'),
      labels: [
        {
          label: t('agents.labels.llmProvider'),
          value: props.whatsAppAgent?.llmProvider,
          icon: BrainIcon,
        },
        {
          label: t('agents.labels.model'),
          value: props.whatsAppAgent?.model,
          icon: BrainIcon,
        },
        {
          label: t('agents.labels.temperature'),
          value: props.whatsAppAgent?.temperature,
          icon: BrainIcon,
        },
      ],
    },
    instructions: {
      name: t('agents.titles.instructions'),
      labels: [
        {
          label: t('agents.labels.titleInstruction'),
          value: props.whatsAppAgent?.titleInstruction,
          icon: PersonClockIcon,
        },
        {
          label: t('agents.labels.summaryInstruction'),
          value: props.whatsAppAgent?.summaryInstruction,
          icon: PersonClockIcon,
        },
        {
          label: t('agents.labels.context'),
          value: props.whatsAppAgent?.context,
          icon: PersonInfoIcon,
        },
      ],
    },
  }
})
</script>

<template>
  <div class="whatsapp-agent-informations-section">
    <template v-for="(section, index) in tabData" :key="section">
      <div
        class="section-title-wrapper"
        :class="{ 'not-configuration': index !== 'configuration' }"
      >
        <h5 class="section-title">
          {{ section.name }}
        </h5>
      </div>
      <LabelDescriptionItem
        v-for="item in section.labels"
        :key="item.label"
        :label="item.label"
        :description="item.value"
        :horizontal="index === 'configuration'"
      >
        <template #customLabel>
          <div class="whatsapp-agent-details-custom-label">
            <component :is="item.icon" size="18px" />
            <span>  {{ item.label }}</span>
          </div>
        </template>
        <template v-if="index !== 'configuration'" #customDescription>
          <HighlightedText :text="item.value as string" />
        </template>
      </LabelDescriptionItem>
    </template>
  </div>
</template>

<style lang="scss" scoped>
.whatsapp-agent-informations-section {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto;
  padding-block: 2rem;
  padding-top: 22px;
  row-gap: 1.5rem;
  column-gap: 32px;

  :deep(.description) {
    font-size: var(--font-size-fluid-2);
  }
}

.section-title-wrapper {
  grid-column: span 2;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--color-primary-800);
  padding-inline: 0.8rem;
  &.not-configuration {
    margin-top: var(--spacing-fluid-l);
  }
  .section-title {
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
  .whatsapp-agent-details-custom-label {
    color: var(--color-primary-100);
  }

  .section-title-wrapper {
    color: var(--color-primary-100);
    .section-title {
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
