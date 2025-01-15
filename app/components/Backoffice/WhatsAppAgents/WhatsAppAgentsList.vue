<script lang="ts" setup>
import type { WhatsAppAgent } from '~/types/whatsapp'
import type { Pagination } from '~/types/pagination'

// PROPS & EMITS

const props = defineProps<{
  whatsAppAgents: WhatsAppAgent[] | null | undefined
  pagination: Pagination
}>()

const emits = defineEmits<{
  (event: 'pageChange', page: number): number
  (event: 'refreshWhatsAppAgents'): void
}>()
</script>

<template>
  <div class="agents-list-container">
    <div class="agents-list">
      <div
        v-for="whatsAppAgent in props.whatsAppAgents"
        :key="whatsAppAgent.id"
      >
        <WhatsAppAgentCard
          :single-whats-app-agent="whatsAppAgent"
          @refresh-whats-app-agents="emits('refreshWhatsAppAgents')"
        />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.agents-list-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  border-radius: 10px;
  overflow: hidden;
}

.agents-list {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}
</style>
