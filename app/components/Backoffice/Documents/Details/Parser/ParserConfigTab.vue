<script lang="ts" setup>
import ParseDocumentIcon from '~/assets/icons/svg/parse-document.svg'
</script>

<template>
  <section class="edit-parser-section">
    <div class="parse-title-wrapper">
      <ParseDocumentIcon size="32px" />
      <h6> <b>{{ $t('documents.parser.title') }}</b> </h6>
    </div>

    <div class="document-parser-config-container">
      <div class="document-parser-config-wrapper">
        <EditParserConfig />
      </div>
      <PreviewParser />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.range-checkbox {
  display: flex;
  align-items: center;
  gap: 22px;
}
.edit-parser-section {
  margin: 2.5rem 0rem;
}
.parse-title-wrapper {
  display: flex;
  gap: 6px;
}

.document-parser-config-container {
  display: flex;
  gap: 22px;
  width: 100%;
  overflow: hidden;

  & .document-parser-config-wrapper {
    padding-inline: 22px;
    flex: 0 0 calc(50% - 22px);
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
}
</style>
