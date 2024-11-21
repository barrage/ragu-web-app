<script lang="ts" setup>
import OpenFolderIcon from '~/assets/icons/svg/open-folder.svg'
import type { ParserConfig } from '~/types/document.ts'

const props = defineProps<{
  config: ParserConfig | null | undefined
}>()
</script>

<template>
  <div class="current-parser-config-card">
    <h6 class="current-config-title">
      {{ $t('documents.parser.title') }}
    </h6>
    <div class="current-parser-config">
      <template v-if="props.config">
        <div class="start-end-range-wrapper">
          <LabelDescriptionItem
            :label="$t('documents.parser.form.start')"
            :description="props.config.start.toString()"
            horizontal
          />
          <div class="horizontal-divider" />
          <LabelDescriptionItem
            :label="$t('documents.parser.form.end')"
            :description="props.config.end.toString()"
            horizontal
          />
          <div class="horizontal-divider" />
          <LabelDescriptionItem
            :label="$t('documents.parser.form.range')"
            :description="props.config.range.toString()"
            horizontal
          />
        </div>
        <div class="horizontal-divider" />
        <LabelDescriptionItem
          :label="$t('documents.parser.form.filters')"
          :description="props.config.filters.join(', ')"
        >
          <template #customDescription>
            <div class="tag-list">
              <el-tag
                v-for="item in props.config.filters"
                :key="item"
              >
                {{ item }}
              </el-tag>
            </div>
          </template>
        </LabelDescriptionItem>
      </template>
      <template v-else>
        <div class="empty-config-container">
          <OpenFolderIcon />
          <span>{{ $t('documents.parser.empty_configuration') }}</span>
        </div>
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.current-parser-config-card {
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
  border-radius: 16px;
  padding: 1rem;
  width: 100%;
}
.tag-list {
  max-width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
}
.current-config-title {
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-800);
}
.current-parser-config {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding-inline: 12px;
  padding-top: 16px;

  & .start-end-range-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
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
  & .current-parser-config-card {
    border: 0.5px solid var(--color-primary-600);
    background: var(--color-primary-800);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-700);
  }
}
</style>
