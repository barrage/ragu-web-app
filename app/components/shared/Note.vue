<script setup lang="ts">
interface Props {
  title: string
  items: string[]
  icon?: any
}

defineProps<Props>()
</script>

<template>
  <div class="notes">
    <div class="note-title">
      <component
        :is="icon"
        v-if="icon"
        size="32px"
      />
      <h6>{{ title }}</h6>
    </div>
    <div class="note-body">
      <ul>
        <li v-for="(item, index) in items" :key="index">
          {{ item }}
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.notes {
  padding: 10px;
  margin-block: 16px;
  background-color: var(--color-primary-100);
  border-radius: 12px;
  margin-left: 12px;

  .note-title {
    display: flex;
    gap: 10px;
    align-items: center;
    color: var(--color-primary-800);
  }

  .note-body {
    padding-left: 2em;
    margin-top: 10px;

    ul {
      list-style: square;
      margin: 16px;

      li {
        margin-block: 4px;
      }
    }
  }
}

html.dark {
  .notes {
    background-color: var(--color-primary-700);
    color: var(--color-primary-0);

    .note-title {
      h6 {
        color: var(--color-primary-0);
      }
      &:deep(svg) {
        color: var(--color-primary-100);
      }
    }
  }
}
</style>
