<script lang="ts" setup>
import OpenFolderIcon from '~/assets/icons/svg/open-folder.svg'
</script>

<template>
  <section class="button-showcase-section">
    <h5 class="button-section-title">
      Button
    </h5>
    <article class="button-showcase-article">
      <div class="button-subsection">
        <h6>Sizes</h6>
        <el-button size="large">
          Large
        </el-button>
        <el-button size="medium">
          Medium
        </el-button>
        <el-button size="small">
          Small
        </el-button>
      </div>
      <div class="button-subsection">
        <h6>Types</h6>
        <el-button type="primary">
          Primary
        </el-button>
        <el-button type="success">
          Success
        </el-button>
        <el-button type="warning">
          Warning
        </el-button>
        <el-button type="danger">
          Danger
        </el-button>
        <el-button type="info">
          Info
        </el-button>
      </div>
      <div class="button-subsection">
        <h6>Disabled</h6>
        <el-button type="primary" disabled>
          Primary
        </el-button>
        <el-button type="success" disabled>
          Success
        </el-button>
        <el-button type="warning" disabled>
          Warning
        </el-button>
        <el-button type="danger" disabled>
          Danger
        </el-button>
        <el-button type="info" disabled>
          Info
        </el-button>
      </div>
      <div class="button-subsection">
        <h6>Icon only</h6>
        <el-button
          type="primary"
          :icon="OpenFolderIcon"
        />
        <el-button
          type="success"
          :icon="OpenFolderIcon"
        />

        <el-button
          type="warning"
          :icon="OpenFolderIcon"
        />

        <el-button
          type="danger"
          :icon="OpenFolderIcon"
        />

        <el-button
          type="info"
          :icon="OpenFolderIcon"
        />
      </div>
      <div class="button-subsection">
        <h6>Rounded</h6>
        <el-button
          type="primary"
          circle
          :icon="OpenFolderIcon"
        />

        <el-button
          type="success"
          circle
          :icon="OpenFolderIcon"
        />

        <el-button
          type="warning"
          circle
          :icon="OpenFolderIcon"
        />

        <el-button
          type="danger"
          circle
          :icon="OpenFolderIcon"
        />

        <el-button
          type="info"
          circle
          :icon="OpenFolderIcon"
        />
      </div>
    </article>
  </section>
</template>

<style lang="scss" scoped>
.button-showcase-section {
  border-top: 1px solid var(--color-primary-500);
  padding: 12px;
  & .button-section-title {
    font-weight: var(--font-weight-bold);
    margin-bottom: 22px;
  }
  .button-showcase-article {
    display: flex;
    gap: 32px;
    justify-content: space-between;
    padding-inline: 42px;

    & .button-subsection {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
  }
}
</style>
