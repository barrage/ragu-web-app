<script lang="ts" setup>
import type { AgentCollection } from '~/types/agent'

const props = defineProps<{
  agentCollection: AgentCollection | undefined
}>()
</script>

<template>
  <el-card>
    <p>{{ props.agentCollection?.collection }}</p>
  </el-card>
</template>

<style>

</style>
