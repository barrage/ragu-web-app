<script lang="ts" setup>
import PdfIcon from '~/assets/icons/svg/pdfIcon.svg'
import DocxIcon from '~/assets/icons/svg/docx-icon.svg'
import TxtIcon from '~/assets/icons/svg/txt-icon.svg'
import MarkdownIcon from '~/assets/icons/svg/markdown-icon.svg'
import CsvIcon from '~/assets/icons/svg/csv-icon.svg'
import JsonIcon from '~/assets/icons/svg/json-icon.svg'
import EyeIcon from '~/assets/icons/svg/eye.svg'
import UnknownDocumentIcon from '~/assets/icons/svg/unknown-document-icon.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'
import type { Document } from '~/types/document'

/* Setup */
const props = defineProps<{
  document: Document
}>()

const emits = defineEmits<Emits>()

interface Emits {
  (event: 'deleteDocument', document: Document): void

}

const { t } = useI18n()

const documentData = computed(() => {
  return {
    id: props.document?.id,
    name: props.document?.name || t('users.user_card.unknown_name'),
    extension: props.document?.ext || t('users.user_card.unknown_email'),
    updatedAt: props.document?.updatedAt || t('users.user_card.unknown_date'),
    createdAt: props.document?.createdAt || t('users.user_card.unknown_date'),
  }
})
</script>

<template>
  <el-card class="document-card is-primary">
    <div class="grid">
      <LlmLink :to="`documents/${documentData.id}`" class="document-name-type-wrapper">
        <PdfIcon
          v-if="documentData.extension === 'pdf'"
          size="40px"
          original
          class="document-icon"
        />
        <DocxIcon v-else-if="documentData.extension === 'docx'" size="40px" />
        <MarkdownIcon
          v-else-if="documentData.extension === 'md'"
          size="40px"
          original
          class="document-icon"
        />
        <CsvIcon
          v-else-if="documentData.extension === 'csv'"
          size="40px"
          original
          class="document-icon"
        />
        <JsonIcon
          v-else-if="documentData.extension === 'json'"
          size="40px"
          original
          class="document-icon"
        />
        <TxtIcon
          v-else-if="documentData.extension === 'txt'"
          size="40px"
          original
          class="document-icon"
        />
        <UnknownDocumentIcon
          v-else
          size="40px"
          original
          class="document-icon"
        />
        <div class="document-name-wrapper">
          <h6>{{ documentData.name }}</h6>
        </div>
      </LlmLink>
      <div class="document-inforamtions">
        <LabelDescriptionItem
          label="Extension"
          size="small"
          :description="documentData.extension "
        />
      </div>
      <div class="document-actions">
        <LlmTooltip :content="$t('documents.tooltip.manage_document')">
          <LlmLink
            :to="`documents/${documentData.id}`"
            type="plainButtonPrimary"
          >
            <EyeIcon size="24px" />
          </LlmLink>
        </LlmTooltip>
        <LlmTooltip :content="$t('documents.tooltip.delete_document')">
          <el-button
            type="danger"
            plain
            class="delete-document-button"
            @click="emits('deleteDocument', props.document)"
          >
            <DeleteIcon size="24px" />
          </el-button>
        </LlmTooltip>
      </div>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.document-card {
  padding-inline: 0.6rem;
  padding-block: 0.8rem;

  & .document-name-type-wrapper {
    grid-column: span 7;
    align-items: center;
    text-overflow: ellipsis;
    display: flex;
    white-space: nowrap;
    overflow: hidden;
    gap: 6px;

    &:hover {
      cursor: pointer;
      opacity: 0.8;
    }

    & .document-icon {
      min-width: fit-content;
    }

    & .document-name-wrapper {
      h6 {
        font-weight: var(--font-weight-semibold);
        font-size: var(--font-size-fluid-);
        color: var(--color-primary-900);
        line-height: normal;
        margin-bottom: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
      }
      & span {
        line-height: normal;
        font-size: var(--font-size-fluid-2);
        color: var(--color-primary-700);
        white-space: nowrap;
        text-overflow: ellipsis;
      }
    }
  }

  & .document-inforamtions {
    grid-column: span 3;
    display: flex;
    gap: 22px;
    width: 100%;
    align-items: center;
  }

  & .document-actions {
    grid-column: span 2;
    display: flex;
    gap: 12px;

    & .delete-document-button {
      margin-left: 12px;
    }
  }
}

.dark {
  .document-card {
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
