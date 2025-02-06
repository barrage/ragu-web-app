<script lang="ts" setup>
import type { SingleAgent } from '~/types/agent.ts'
import { StatusType } from '~/types/statusTypes'

const props = defineProps<{
  agent: SingleAgent
}>()

const emits = defineEmits<Emits>()
const oAuthStore = useAuthStore()

const { t } = useI18n()
interface Emits {
  (event: 'agentSelectedForChat', agent: SingleAgent): void
}

const agentData = computed(() => {
  return {
    id: props.agent?.id,
    name: props.agent?.name || t('agents.agent_card.unknown_agentname'),
    status: props.agent?.active ? t('agents.agent_card.active_status') : t('agents.agent_card.inactive_status'),
    statusType: props.agent?.active ? StatusType.Success : StatusType.Danger,
    createdAt: props.agent?.createdAt ? useRelativeDate(props.agent.createdAt) : t('agents.agent_card.created_at'),
    language: props.agent?.language || '-',
    avatar: props.agent?.avatar || undefined,
  }
})

const router = useRouter()
const redirectToAgentEdit = () => {
  if (props.agent?.id && oAuthStore.isAdmin) { router.push(`/admin/agents/${props.agent.id}/edit`) }
}
</script>

<template>
  <el-card class="is-accent agent-card">
    <div class="agent-card-header">
      <LlmAvatar
        :avatar="props.agent?.avatar"
        :alt="t('agents.agent_avatar')"
        :size="62"
        fit="cover"
        default-image="agent"
        :content-type="agent?.avatar?.contentType"
      />
      <div class="agent-name-status-wrapper">
        <p class="agent-name-text">
          {{ formatStringMaxLenght(agent?.name, 60) }}
        </p>
        <el-tag
          :type="agentData.statusType"
          size="small"
        >
          <span class="status-dot" /> {{ agentData?.status }}
        </el-tag>
      </div>
    </div>

    <el-divider class="is-weak" />
    <div class="agent-card-body">
      <div class="scrollable-content">
        <p class="agent-description">
          {{ agent?.description }}
        </p>
      </div>
    </div>

    <div class="agent-card-footer">
      <el-button
        size="small"
        type="primary"
        class="agent-card-footer-button"
        @click="emits('agentSelectedForChat', props.agent)"
      >
        {{ t('chat_now') }}
      </el-button>
      <el-button
        v-if="oAuthStore.isAdmin"
        size="small"
        type="primary"
        class="agent-card-footer-button"
        @click="redirectToAgentEdit"
      >
        {{ t('settings.edit') }}
      </el-button>
    </div>
  </el-card>
</template>

<style lang="scss" scoped>
.agent-card {
  &:deep(.barrage-card__body) {
    min-height: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    overflow: hidden;
  }

  &-header {
    display: flex;
    align-items: center;
    gap: 0.75rem;

    & .agent-name-status-wrapper {
      display: flex;
      flex-direction: column;
      gap: 0px;
    }
  }

  &-body {
    height: 132px;
    position: relative;

    .scrollable-content {
      height: 100%;
      overflow-y: auto;
      padding-right: 0.5rem;
      padding-bottom: 22px;
    }
    &::after {
      content: '';
      position: absolute;
      right: 0;
      bottom: 0;
      width: 100%;
      height: 32px;
      background: linear-gradient(
        to top,
        var(--color-primary-200),
        transparent
      );
    }
  }

  & .agent-description {
    font-size: var(--font-size-fluid-2);
    color: var(--color-primary-700);
    line-height: normal;
  }

  &-footer {
    margin-top: auto;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}

.agent-card-footer-button {
  padding-block: 0;
}

.dark {
  & .agent-card {
    &-body {
      &::after {
        background: linear-gradient(
          to top,
          var(--color-primary-800),
          transparent
        );
      }
    }

    & .agent-description {
      color: var(--color-primary-100);
    }

    &-footer {
      margin-top: auto;
    }
  }
}
</style>
