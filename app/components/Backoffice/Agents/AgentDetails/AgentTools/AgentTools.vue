<script lang="ts" setup>
// IMPORTS
import FunctionIcon from '~/assets/icons/svg/agent-function.svg'
import CheckIcon from '~/assets/icons/svg/check.svg'
import DeleteIcon from '~/assets/icons/svg/delete.svg'

// CONSTANTS
const { $api } = useNuxtApp()
const { t } = useI18n()
const route = useRoute()

// STATES
const agentId = route.params.agentId as string
const selectedTools = ref<string[]>([])
const initialTools = ref<string[]>([])
const selectedForRemoval = ref<string[]>([])
const isAvailableToolsModalVisible = ref(false)
const isConfirmationModalVisible = ref(false)
const selectedForMultiRemoval = ref<string[]>([])

// API CALLS
const { data: agentTools, execute: getAgentTools } = await useAsyncData(() => $api.agent.GetAgentsTools(agentId))
const payload = computed(() => {
  const currentTools = agentTools.value?.map(tool => tool.toolName) || []

  return {
    add: (selectedTools.value || []).filter(tool => !currentTools.includes(tool)),
    remove: selectedForRemoval.value || [],
  }
})
const { data: toolList } = await useAsyncData(() => $api.agent.GetToolList())
const { execute: assignTools, status: assignStatus, error: assignError } = await useAsyncData(() => $api.agent.AssignAgentsTools(agentId, payload.value), { immediate: false })

// FUNCTIONS

const openAvailableToolsModal = () => {
  isAvailableToolsModalVisible.value = true
}

const handleSave = async () => {
  await assignTools()
  if (assignError.value) {
    ElNotification({
      title: t('agents.tools.notification.error_title'),
      message: t('agents.tools.notification.assign_error_title'),
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
  }
  else {
    agentTools.value = toolList.value?.filter(tool =>
      selectedTools.value.includes(tool.function.name)
      && !selectedForRemoval.value.includes(tool.function.name),
    ).map(tool => ({
      toolName: tool.function.name,
      function: tool.function,
      type: tool.type,
    })) || []
    selectedForRemoval.value = []
    ElNotification({
      title: t('agents.tools.notification.success_title'),
      message: t('agents.tools.notification.assign_success_title'),
      type: 'success',
      customClass: 'success',
      duration: 2500,
    })
  }
}

const handleModalSave = async () => {
  await handleSave()
  if (!assignError.value) {
    isAvailableToolsModalVisible.value = false
  }
}

const toggleToolSelection = (toolName: string) => {
  const index = selectedForMultiRemoval.value.indexOf(toolName)
  if (index === -1) {
    selectedForMultiRemoval.value.push(toolName)
  }
  else {
    selectedForMultiRemoval.value.splice(index, 1)
  }
}

const openMultiRemoveConfirmation = () => {
  selectedForRemoval.value = [...selectedForMultiRemoval.value]
  isConfirmationModalVisible.value = true
}

const handleConfirmRemoval = async () => {
  isConfirmationModalVisible.value = false
  await handleSave()
  await getAgentTools()
  selectedForMultiRemoval.value = []
}

const handleCancelRemoval = () => {
  selectedForRemoval.value = []
  isConfirmationModalVisible.value = false
}

const handleToolSelect = (toolName: string) => {
  const index = selectedTools.value.indexOf(toolName)
  if (index === -1) {
    selectedTools.value.push(toolName)
  }
  else {
    selectedTools.value.splice(index, 1)
  }
}

// COMPUTEDS
const assignedToolNames = computed(() =>
  agentTools.value?.map(tool => tool.toolName) ?? [],
)

const isToolAssigned = computed(() => (toolName: string) => {
  return agentTools.value?.some(tool => tool.toolName === toolName) || false
})

const hasChanges = computed(() => {
  const currentSet = new Set(selectedTools.value)
  const initialSet = new Set(initialTools.value)
  const hasSelectionChanges = currentSet.size !== initialSet.size
    || [...currentSet].some(tool => !initialSet.has(tool))
    || [...initialSet].some(tool => !currentSet.has(tool))

  return hasSelectionChanges || selectedForRemoval.value.length > 0
})

const hasAssignedTools = computed(() => !!agentTools.value?.length)

// WATCHERS
watch(
  () => agentTools.value,
  (newAgentTools) => {
    if (newAgentTools) {
      const toolNames = newAgentTools.map(tool => tool.toolName)
      selectedTools.value = [...toolNames]
      initialTools.value = [...toolNames]
    }
  },
  { immediate: true },
)
</script>

<template>
  <div class="agent-tools">
    <div class="tools-header">
      <h5>{{ t('agents.titles.tools') }}</h5>
      <p class="tools-description">
        {{ t('agents.tools.description_text') }}
      </p>
    </div>

    <div class="tools-actions">
      <ElButton
        type="primary"
        @click="openAvailableToolsModal"
      >
        <FunctionIcon size="20px" /> {{ t('agents.tools.add_tool') }}
      </ElButton>
    </div>

    <div class="tools-section">
      <div class="section-title">
        <FunctionIcon size="32px" />
        <h6 class="title-heading">
          {{ t('agents.tools.current_tools') }}
        </h6>
      </div>

      <div v-if="hasAssignedTools" class="tools-grid">
        <template v-for="tool in toolList" :key="tool.function.name">
          <el-card
            v-if="isToolAssigned(tool.function.name)"
            v-motion-fade
            :duration="400"
            class="is-accent select-tool-card"
            :class="{ 'is-selected': selectedForMultiRemoval.includes(tool.function.name) }"
            @click="toggleToolSelection(tool.function.name)"
          >
            <div class="select-tool-card-body">
              <div class="icons">
                <span class="function-icon">
                  <FunctionIcon size="44px" />
                </span>

                <CheckIcon
                  v-if="selectedForMultiRemoval.includes(tool.function.name)"
                  size="20px"
                />
              </div>
              <div class="title-wrapper">
                <p class="tool-label">
                  {{ t('agents.tools.function_name') }}: {{ tool.function.name }}
                </p>
              </div>
              <span class="tool-description">
                <strong>{{ t('agents.tools.description') }}</strong>:
                {{ tool.function.description }}
              </span>
            </div>
          </el-card>
        </template>
      </div>
      <ElButton
        v-if="hasAssignedTools"

        type="primary"
        :disabled="!selectedForMultiRemoval.length"
        @click="openMultiRemoveConfirmation"
      >
        <DeleteIcon size="20px" /> {{ t('agents.tools.remove_selected') }}
      </ElButton>
      <EmptyState
        v-else
        :title="t('agents.tools.empty_state.title')"
        :description="t('agents.tools.empty_state.description')"
      >
        <template #icon>
          <FunctionIcon size="44px" />
        </template>
      </EmptyState>
    </div>
  </div>
  <teleport to="body">
    <ConformationModal
      :is-visible="isConfirmationModalVisible"
      :title="t('agents.tools.remove_tools.title')"
      :message="t('agents.tools.remove_tools.message', { count: selectedForRemoval.length })"
      :confirm-button-text="t('agents.tools.remove_tools.confirm')"
      confirm-button-type="danger"
      @confirm="handleConfirmRemoval"
      @cancel="handleCancelRemoval"
    />
  </teleport>
  <teleport to="body">
    <AgentAvailableToolsModal
      v-model="isAvailableToolsModalVisible"
      :tool-list="toolList"
      :selected-tools="selectedTools"
      :assigned-tools="assignedToolNames"
      :loading="assignStatus === 'pending'"
      :has-changes="hasChanges"
      @select="handleToolSelect"
      @save="handleModalSave"
    />
  </teleport>
</template>

<style lang="scss" scoped>
.agent-tools {
  padding: 20px;

  .tools-header {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-bottom: 30px;
  }
  .tools-actions {
    display: flex;
    margin-left: auto;
  }

  .tools-description {
    color: var(--color-primary-900);
  }

  .tools-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: auto;
    gap: 20px;
    padding-bottom: 20px;

    @include viewport-m {
      grid-template-columns: repeat(2, 1fr);
    }
    @include viewport-l {
      grid-template-columns: repeat(3, 1fr);
    }
    @include viewport-xl {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  .select-tool-card {
    border: 1.5px solid var(--color-primary-300);
    background: var(--color-primary-200);
    transition: all 0.2s ease-in-out;
    display: flex;

    &:hover {
      cursor: pointer;
      border-color: var(--color-primary-400);
    }

    &.is-selected {
      border: 1.5px solid var(--color-primary-600);
      background: var(--color-primary-100);
    }

    & .select-tool-card-body {
      display: flex;
      flex-direction: column;
      gap: 8px;

      .icons {
        display: flex;
        gap: 10px;
        align-items: center;
        justify-content: space-between;
        padding-bottom: 10px;

        .function-icon {
          padding: 8px;
          border-radius: 8px;
          border: 1px solid var(--color-primary-500);
          color: var(--color-primary-800);
        }
      }

      & .title-wrapper {
        display: flex;
        gap: 22px;
        justify-content: space-between;
        align-items: center;

        .tool-label {
          color: var(--color-primary-800);
          font-weight: var(--font-weight-semibold);
          font-size: var(--font-size-fluid-2);
        }
      }

      & .tool-description {
        color: var(--color-primary-800);
        line-height: normal;
        font-size: var(--font-size-fluid-2);
      }
    }
  }

  .tools-section {
    margin-block: 30px;

    .section-title {
      display: flex;
      gap: 8px;
      align-items: center;
      margin-bottom: 20px;

      .title-heading {
        margin: 0;
      }
    }
  }
}

html.dark {
  .select-tool-card {
    background: var(--color-primary-800);
    border: 1.5px solid var(--color-primary-600);

    &:hover {
      cursor: pointer;
    }

    &.is-selected {
      background: var(--color-primary-700);
      border: 1.5px solid var(--color-primary-0);
    }

    & .select-tool-card-body {
      & .title-wrapper {
        .tool-label {
          color: var(--color-primary-0);
        }
      }

      & .tool-description {
        color: var(--color-primary-100);
      }
      .icons {
        .function-icon {
          color: var(--color-primary-0);
        }
      }
    }
  }

  .tools-description {
    color: var(--color-primary-100);
  }
}
</style>
