<script setup lang="ts">
import { defineProps } from 'vue'
import PdfIcon from '~/assets/icons/svg/pdfIcon.svg'
import DocxIcon from '~/assets/icons/svg/docx-icon.svg'
import TxtIcon from '~/assets/icons/svg/txt-icon.svg'
import MarkdownIcon from '~/assets/icons/svg/markdown-icon.svg'
import CsvIcon from '~/assets/icons/svg/csv-icon.svg'
import JsonIcon from '~/assets/icons/svg/json-icon.svg'
import UnknownDocumentIcon from '~/assets/icons/svg/unknown-document-icon.svg'

import type { Document } from '~/types/document'

const props = defineProps<{ documents: Document[] }>()
</script>

<template>
  <ElTooltip
    content="Shows the 5 most recently updated or created documents"
    :show-after="2000"
    :enterable="false"
    placement="top"
  >
    <div class="last-modified-documents">
      <h6>Most recent</h6>
      <ul>
        <li
          v-for="doc in props.documents"
          :key="doc.id"
        >
          <div class="horizontal-divider" />
          <NuxtLink :to="`/admin/documents/${doc.id}`">
            <div class="document-item">
              <div class="document-name-wrapper">
                <PdfIcon
                  v-if="doc.ext === 'pdf'"
                  size="16"
                  original
                />
                <DocxIcon v-else-if="doc.ext === 'docx'" size="16" />
                <MarkdownIcon
                  v-else-if="doc.ext === 'md'"
                  size="16"
                  original
                />
                <CsvIcon
                  v-else-if="doc.ext === 'csv'"
                  size="16"
                  original
                />
                <JsonIcon
                  v-else-if="doc.ext === 'json'"
                  size="16"
                  original
                />
                <TxtIcon
                  v-else-if="doc.ext === 'txt'"
                  size="16"
                  original
                />
                <UnknownDocumentIcon
                  v-else
                  size="16"
                  original
                />
                <span class="document-name">{{ doc.name }}</span>
              </div>
              <span>{{ useRelativeDate(doc.updatedAt) }}</span>
            </div>
          </NuxtLink>
        </li>
      </ul>
    </div>
  </ElTooltip>
</template>

<style lang="scss" scoped>
.last-modified-documents {
  background: var(--color-primary-100);
  padding: 16px;
  border-radius: 10px;
  display: flex;
  gap: 0.375rem;
  flex-direction: column;
  box-shadow: 0px 4px 12px 0px var(--color-primary-100);
  border: 0.5px solid var(--color-primary-200);

  & h6 {
    color: var(--color-primary-800);
    font-weight: var(--font-weight-semibold);
  }
  & svg {
    min-width: max-content;
  }
  ul {
    padding-inline: 6px;
    li {
      font-size: var(--font-size-fluid-2);
      gap: 8px;
      line-height: normal;
      color: var(--color-primary-800);
      text-overflow: ellipsis;
      & .document-name {
        padding-rightht: 4px;
        max-width: 100%;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}

.document-item {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding-inline: 6px;
  margin: 8px 0px;
  gap: 6px;
  &:hover {
    cursor: pointer;
    opacity: 0.8;
  }
  & .document-name-wrapper {
    display: flex;
    gap: 4px;
  }
}

.dark {
  & .last-modified-documents {
    background: var(--color-primary-800);
    box-shadow: 0px 4px 12px 0px var(--color-primary-800);
    border: 0.5px solid var(--color-primary-600);

    & h6 {
      color: var(--color-primary-100);
    }
    ul {
      li {
        color: var(--color-primary-100);
      }
    }
  }
}
</style>
