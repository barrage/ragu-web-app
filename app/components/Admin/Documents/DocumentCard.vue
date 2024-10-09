<script lang="ts" setup>
import { ref } from 'vue'
import PdfIcon from '~/assets/icons/svg/pdfIcon.svg'
import DocxIcon from '~/assets/icons/svg/docx-icon.svg'
import TxtIcon from '~/assets/icons/svg/txt-icon.svg'
import MarkdownIcon from '~/assets/icons/svg/markdown-icon.svg'
import CsvIcon from '~/assets/icons/svg/csv-icon.svg'
import JsonIcon from '~/assets/icons/svg/json-icon.svg'
import DocumentArrowRightIcon from '~/assets/icons/svg/document-arrow-right.svg'

import UnknownDocumentIcon from '~/assets/icons/svg/unknown-document-icon.svg'

import type { Document } from '~/types/document'

/* Setup */
const props = defineProps<{
  document: Document
}>()
const router = useRouter()

const navigateToDocumentDetailsPage = () => {
  if (props.document.id) {
    router.push(`documents/${props.document.id}`)
  }
}
const formatName = (str: string, n: number) => {
  return str.length > n ? `${str.slice(0, n)}...` : str
}
</script>

<template>
  <div class="document-card">
    <div class="document-name-type-wrapper" @click="navigateToDocumentDetailsPage()">
      <PdfIcon
        v-if="props.document.ext === 'pdf'"
        size="36"
        original
      />
      <DocxIcon v-else-if="props.document.ext === 'docx'" size="36" />
      <MarkdownIcon
        v-else-if="props.document.ext === 'md'"
        size="36"
        original
      />
      <CsvIcon
        v-else-if="props.document.ext === 'csv'"
        size="36"
        original
      />
      <JsonIcon
        v-else-if="props.document.ext === 'json'"
        size="36"
        original
      />
      <TxtIcon
        v-else-if="props.document.ext === 'txt'"
        size="36"
        original
      />
      <UnknownDocumentIcon
        v-else
        size="36"
        original
      />
      <div class="document-name-wrapper">
        <h6>{{ formatName(props.document.name, 25) }}</h6>
        <span>Uploaded {{ formatDate(props.document.createdAt) }}</span>
      </div>
    </div>
    <div class="document-inforamtions">
      <LabelDescriptionItem
        label="Extension"
        :description="props.document.ext "
      />
      <LabelDescriptionItem
        label="Path"
        :description="props.document.path"
      />
    </div>
    <div class="document-actions">
      <ElTooltip
        content="Manage your document"
        :show-after="100"
        :enterable="false"
        placement="top"
      >
        <el-button type="primary" @click="navigateToDocumentDetailsPage">
          <DocumentArrowRightIcon size="24" />
        </el-button>
      </ElTooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.document-card {
  border: 1px solid var(--color-primary-200);
  border-radius: 8px;
  padding: 16px;
  background-color: var(--color-primary-100);
  box-shadow: 0 2px 4px var(--color-primary-100);
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  gap: 1.5rem;
  align-items: center;

  &:hover {
    border: 1px solid var(--color-primary-300);
    box-shadow: 0 2px 4px var(--color-primary-200);
  }

  & .document-name-type-wrapper {
    flex: 0 0 calc(30% - 8px);
    display: flex;
    gap: 0.5rem;
    align-items: center;
    text-overflow: ellipsis;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    & .document-name-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
      text-overflow: ellipsis;
      h6 {
        font-weight: var(--font-weight-bold);
        font-size: var(--font-size-fluid-3);
        color: var(--color-primary-900);
        line-height: normal;
        margin-bottom: 0;
      }
      & span {
        line-height: normal;
        font-size: var(--font-size-fluid-2);
        color: var(--color-primary-700);
      }
    }
  }

  & .document-inforamtions {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 2.5rem;
  }

  & .document-actions {
    margin-left: auto;
    display: flex;
    gap: 0.5rem;
    margin-top: 8px;
  }
}

.dark {
  .document-card {
    border: 1px solid var(--color-primary-700);
    background-color: var(--color-primary-800);
    box-shadow: 0 2px 4px var(--color-primary-600);
    &:hover {
      border: 1px solid var(--color-primary-500);
      box-shadow: 0 2px 4px var(--color-primary-600);
    }

    & .document-name-wrapper {
      h6 {
        color: var(--color-primary-0);
      }
      & span {
        color: var(--color-primary-200);
      }
    }
  }
}
</style>
