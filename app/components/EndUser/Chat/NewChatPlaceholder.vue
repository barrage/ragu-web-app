<script lang="ts" setup>
import type { ElCarousel } from 'element-plus'
import BrainIcon from '~/assets/icons/svg/Ragu_logo_dark.svg'
import AccountWarningIcon from '~/assets/icons/svg/account-warning.svg'
import PersonAddIcon from '~/assets/icons/svg/person-add.svg'
import type { SingleAgent } from '~/types/agent'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'

const agentStore = useAgentStore()
const { selectedRole } = storeToRefs(useAuthStore())
const { error, status } = await useAsyncData(() => agentStore.GET_AllAppAgents(), { lazy: true })
const { t } = useI18n()
errorHandler(error)

const carouselRef = ref<InstanceType<typeof ElCarousel> | null>(null)
const setActiveSlide = (index: number, agent: SingleAgent) => {
  if (carouselRef.value) {
    agentStore.setSelectedAgent(agent)
    carouselRef.value.setActiveItem(index)
  }
}

const handleCarouselChange = (currentIndex: number) => {
  const selectedAgent = agentStore.appAgents[currentIndex]
  if (selectedAgent) {
    agentStore.setSelectedAgent(selectedAgent)
  }
}

const isAgentSelected = (id: string) => {
  return id === agentStore.selectedAgent?.id
}

/* Agent */
const isAgentsModalVisible = ref(false)
const openAgentsModal = () => {
  isAgentsModalVisible.value = true
}

const findAgentIndex = (agentId: string): number => {
  return agentStore.appAgents.findIndex(agent => agent.id === agentId)
}

const selectAgentForChat = (agent: SingleAgent) => {
  isAgentsModalVisible.value = false
  const index = findAgentIndex(agent.id)
  setActiveSlide(index, agent)
}
</script>

<template>
  <div class="new-chat-placeholder-container">
    <BrainIcon
      width="72px"
      height="72px"
      class="ai-logo"
    />
    <h1
      v-motion-fade
      :delay="100"
      :duration="800"
      class="new-chat-title"
    >
      {{ $t('chat.llm_chat') }}
    </h1>
    <p
      class="description typing-effect"
    >
      {{ $t('chat.newChat.description') }}
    </p>
    <div
      v-motion-fade
      :delay="1100"
      class="choose-agent-wrapper"
    >
      <p>
        {{ $t('chat.newChat.choseFrom') }}
      </p>
      <el-button
        class="view-all-button"
        size="small"
        @click="openAgentsModal"
      >
        {{ $t('view_all') }}
      </el-button>
    </div>

    <div class="about-container">
      <template v-if="status === 'pending'">
        <div class="skeleton-wrapper">
          <template v-for="i in 10" :key="i">
            <SelectAgentCardSkeleton
              v-motion-fade
              :delay="(i * 100)"
              :duration="400"
            />
          </template>
        </div>
      </template>
      <template v-else-if="agentStore.appAgents.length">
        <ElCarousel
          ref="carouselRef"
          :autoplay="false"
          type="card"
          height="180px"
          :card-scale="0.8"
          indicator-position="none"
          @change="handleCarouselChange"
        >
          <ElCarouselItem
            v-for="(agent, index) in agentStore.appAgents"
            :key="agent.id"
            v-motion-fade
            :name="agent.id"
            :delay="(index * 100)"
            :duration="400"
            @keyup.enter="setActiveSlide(index, agent)"
            @keyup.space="setActiveSlide(index, agent)"
          >
            <AgentCarouselInfo
              :data-testid="`agent-carousel-card-${index + 1}`"
              :is-selected="isAgentSelected(agent.id)"
              :agent="agent"
            />
          </ElCarouselItem>
        </ElCarousel>
      </template>
      <EmptyState
        v-else
        :title="$t('chat.newChat.empty_title')"
        :description="$t('chat.newChat.empty')"
      >
        <template #icon>
          <AccountWarningIcon size="44px" />
        </template>
        <template v-if="selectedRole === 'admin'" #cta>
          <LlmLink to="/admin/agents" type="button">
            <PersonAddIcon /> {{ $t('chat.newChat.empty_cta') }}
          </LlmLink>
        </template>
      </EmptyState>
    </div>
  </div>

  <ElDialog
    v-model="isAgentsModalVisible"
    align-center
    class="barrage-dialog--large"
    :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
  >
    <template #header>
      <h4>{{ t('profileDropdown.agents') }}</h4>
    </template>
    <p>{{ t('profileDropdown.browse_agents') }}</p>
    <ChatAgentsOverview @agent-selected-for-chat="selectAgentForChat" />
  </ElDialog>
</template>

<style lang="scss" scoped>
.new-chat-placeholder-container {
  height: 100%;
  max-width: 48rem;
  margin-inline: auto;
  justify-content: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: transparent;
  & .new-chat-title {
    color: var(--color-primary-800);
    font-size: var(--font-size-fluid-6);
    line-height: normal;
  }
}

.ai-logo {
  color: var(--color-primary-1000);
  padding: 0.5rem;
  border: 0.0625rem solid var(--color-primary-400);
  border-radius: 0.625rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.2);
  margin-block: 3.375rem 1rem;
  min-height: 64px;
  background: linear-gradient(
    to top,
    var(--color-primary-100),
    var(--color-primary-200)
  );
}

.about-container {
  text-align: center;
  width: 100%;
  z-index: 0;
  overflow-x: auto;
  overflow-y: hidden;
  padding-bottom: 1rem;
}

.choose-agent-wrapper {
  display: flex;
  position: relative;
  width: 100%;
  padding-block: 0.75rem;

  & p {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  & .view-all-button {
    margin-left: auto;
  }
}

.suggestions-container {
  display: flex;
  flex-wrap: nowrap;
  width: 100%;
  gap: 1rem;
  margin-bottom: 1rem;
  color: var(--color-primary-800);
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
}

.dark {
  .new-chat-placeholder-container {
    & .new-chat-title {
      color: var(--color-primary-0);
    }
  }
  .ai-logo {
    color: var(--color-primary-0);
    border: 0.0625rem solid var(--color-primary-600);
    background: linear-gradient(
      to top,
      var(--color-primary-700),
      var(--color-primary-900)
    );
  }
  .description {
    color: var(--color-primary-100);
  }
  .about-container {
    text-align: center;

    p {
      color: var(--color-primary-100);
    }
  }
  .suggestions-container {
    color: var(--color-primary-100);
  }
}

.skeleton-wrapper {
  display: flex;
  gap: 1rem;
}
</style>
