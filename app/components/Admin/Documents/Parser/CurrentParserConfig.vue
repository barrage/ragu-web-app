<script lang="ts" setup>
import OpenFolderIcon from '~/assets/icons/svg/open-folder.svg'
import type { ParserConfig } from '~/types/document.ts'

const props = defineProps<{
  config: ParserConfig | null | undefined
}>()
</script>

<template>
  <div>
    <p class="current-config-title">
      Current config
    </p>
    <div class="current-parser-config">
      <template v-if="props.config">
        <div class="start-end-range-wrapper">
          <LabelDescriptionItem
            label="Start:"
            :description="props.config.start.toString()"
            horizontal
          />
          <LabelDescriptionItem
            label="End:"
            :description="props.config.end.toString()"
            horizontal
          />
          <LabelDescriptionItem
            label="Range:"
            :description="props.config.range.toString()"
            horizontal
          />
          <LabelDescriptionItem
            label="Filters:"
            :description="props.config.filters.join(', ')"
            horizontal
          />
        </div>

        <!-- <span>Filters:
          <template v-if=" props?.config?.filters?.length">
            <template v-for="filter in props?.config?.filters">
              {{ filter }}
            </template>
          </template>
          <template v-else>
            Empty
          </template>
        </span> -->
      </template>
      <template v-else>
        <div class="empty-config-container">
          <OpenFolderIcon />
          <span>Empty config</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.current-config-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-800);
}
.current-parser-config {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding-inline: 12px;
  padding-top: 16px;

  & .start-end-range-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  & span {
    margin: 0;
    color: var(--color-primary-800);
  }
}
.empty-config-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.dark {
  & .current-config-title {
    color: var(--color-primary-100);
  }
  & .current-parser-config {
    & span {
      margin: 0;
      color: var(--color-primary-100);
    }
  }
}
</style>
