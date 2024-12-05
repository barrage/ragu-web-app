<script setup lang="ts">
export type MonthName =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'November'
  | 'December'

export type TimeLabel =
  | 'today'
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'lastYear'
  | 'older'
  | `month${MonthName}`

const props = defineProps<{ localization: TimeLabel }>()
const { isSidebarCollapsed } = storeToRefs(useNavigationStore())

const localization = computed(() => {
  if (props.localization.includes('month')) {
    const month = props.localization.replace('month', '').toLowerCase()
    return `months.${month}`
  }
  return `timePeriod.${props.localization}`
})

const shortLocalization = computed(() => {
  if (props.localization.includes('month')) {
    const month = props.localization.replace('month', '').toLowerCase()
    return `shortMonths.${month}`
  }
  return `shortTimePeriod.${props.localization}`
})
</script>

<template>
  <h6 class="chat-group-title" :class="{ collapsed: isSidebarCollapsed }">
    <ElTooltip
      :content="$t(localization)"
      :show-after="1500"
      :hide-after="0"
      :disabled="!isSidebarCollapsed"
      :enterable="false"
      placement="right"
    >
      <span :class="{ 'collapsed-localization': isSidebarCollapsed }">
        {{ isSidebarCollapsed ? $t(shortLocalization) : $t(localization) }}
      </span>
    </ElTooltip>
  </h6>
</template>

<style lang="scss" scoped>
.chat-group-title {
  color: var(--color-primary-800);
  font-weight: 700;
  font-size: var(--font-size-desktop-1);
  padding: 12px 0px 8px 0px;
  scroll-snap-align: start;

  &.collapsed {
    justify-self: center;
  }

  .collapsed-localization {
    cursor: pointer;
  }
}
.dark {
  & .chat-group-title {
    color: var(--color-primary-200);
  }
}
</style>
