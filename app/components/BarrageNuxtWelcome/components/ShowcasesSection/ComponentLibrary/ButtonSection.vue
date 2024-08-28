<script lang="ts" setup>
import UpIcon from '~/assets/icons/svg/up-navigation.svg'
</script>

<template>
  <section class="button-section-showcase">
    <a
      href="https://element-plus.org/en-US/component/button.html"
      target="_blank"
      class="element-plus-redirect"
    >  Button documentation </a>
    <div class="button-example-group">
      <h6>Sizes</h6>
      <el-button size="large">
        Large
      </el-button>
      <el-button>Medium</el-button>
      <el-button size="small">
        Small
      </el-button>
    </div>
    <div class="button-example-group">
      <h6>Types</h6>
      <el-button>
        Default
      </el-button>
      <el-button type="primary">
        Primary
      </el-button>
      <el-button type="info">
        Info
      </el-button>
      <el-button type="success">
        Success
      </el-button>
      <el-button type="danger">
        Danger
      </el-button>
      <el-button type="warning">
        Warning
      </el-button>
    </div>
    <div class="button-example-group">
      <h6>Disabled</h6>
      <el-button disabled>
        Default
      </el-button>
      <el-button type="primary" disabled>
        Primary
      </el-button>
      <el-button type="info" disabled>
        Info
      </el-button>
      <el-button type="success" disabled>
        Success
      </el-button>
      <el-button type="danger" disabled>
        Danger
      </el-button>
      <el-button type="warning" disabled>
        Warning
      </el-button>
    </div>
    <div class="button-example-group">
      <h6>Icon only</h6>

      <el-button
        type="primary"
        :icon="UpIcon"
        circle
      />
      <el-button
        type="info"
        :icon="UpIcon"
        circle
      />
      <el-button
        type="success"
        :icon="UpIcon"
        circle
      />
      <el-button
        type="danger"
        :icon="UpIcon"
        circle
      />
      <el-button
        type="warning"
        :icon="UpIcon"
        circle
      />
    </div>
  </section>
</template>

<style lang="scss" scoped>
.button-section-showcase {
  display: flex;
  flex-direction: column;
  gap: 42px;

  & .button-example-group {
    display: flex;
    align-items: center;
    gap: 22px;
  }
}
.element-plus-redirect {
  color: var(--color-blue-300);
}
</style>
