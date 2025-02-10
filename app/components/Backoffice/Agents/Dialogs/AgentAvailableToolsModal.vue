<script lang="ts" setup>
// IMPORTS
import FunctionIcon from '~/assets/icons/svg/agent-function.svg'
import CheckIcon from '~/assets/icons/svg/check.svg'
import AgentTool from '~/assets/icons/svg/tools.svg'
import CloseCircleIcon from '~/assets/icons/svg/close-circle.svg'

// PROPS & EMITS
interface Props {
  toolList: any[] | undefined
  selectedTools: string[]
  assignedTools: string[]
  loading?: boolean
  hasChanges?: boolean
}

const props = defineProps<Props>()

const emit = defineEmits<Emits>()

interface Emits {
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', toolName: string): void
  (e: 'save'): void
}

// CONSTANTS & STATES
const { t } = useI18n()
const isOpen = defineModel<boolean>()

// HELPERS

const availableTools = computed(() => {
  if (!props.toolList) { return [] }
  return props.toolList.filter(tool => !props.assignedTools.includes(tool.function.name))
})

const isToolSelected = (toolName: string) => props.selectedTools.includes(toolName)

const toggleTool = (toolName: string) => {
  emit('select', toolName)
}

const closeModal = () => {
  isOpen.value = false
}

const handleSave = () => {
  emit('save')
}
</script>

<template>
  <ElDialog
    v-model="isOpen"
    destroy-on-close
    align-center
    class="barrage-dialog--large available-tools-modal"
    :close-icon="() => h(CloseCircleIcon, { size: '20px' })"
    @close="closeModal"
  >
    <div class="modal-header">
      <h4 class="modal-title">
        {{ t('agents.tools.modal.title') }}
      </h4>
      <h6 class="modal-subtitle">
        {{ t('agents.tools.modal.subtitle') }}
      </h6>
    </div>
    <div v-if="availableTools.length" class="available-tools-container">
      <div class="tools-grid">
        <template v-for="(tool, index) in availableTools" :key="tool.function.name">
          <el-card
            v-motion-fade
            :delay="index * 100"
            :duration="400"
            class="is-accent select-tool-card"
            :class="{ selected: isToolSelected(tool.function.name) }"
            :data-testid="`agent-tool-card-${tool.function.name}`"
            tabindex="0"
            @click="toggleTool(tool.function.name)"
            @keyup.enter="toggleTool(tool.function.name)"
            @keyup.space="toggleTool(tool.function.name)"
          >
            <div class="select-tool-card-body">
              <div class="icons">
                <span class="function-icon">
                  <FunctionIcon size="44px" />
                </span>
                <CheckIcon
                  v-if="isToolSelected(tool.function.name)"
                  size="22px"
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
    </div>
    <template #footer>
      <div class="dialog-footer">
        <ElButton @click="closeModal">
          {{ t('agents.buttons.cancel') }}
        </ElButton>
        <ElButton
          type="primary"
          :loading="loading"
          :disabled="!hasChanges"
          @click="handleSave"
        >
          {{ t('agents.buttons.save') }}
        </ElButton>
      </div>
    </template>
    <EmptyState
      v-if="!availableTools.length"
      :title="t('agents.tools.empty_state.title')"
      :description="t('agents.tools.empty_state.description')"
    >
      <template #icon>
        <AgentTool size="44px" />
      </template>
    </EmptyState>
  </ElDialog>
</template>

<style lang="scss" scoped>
.available-tools-modal {
  .modal-header {
    text-align: center;
    margin-bottom: 24px;

    .modal-title {
      color: var(--color-primary-900);
      margin-bottom: 8px;
    }

    .modal-subtitle {
      color: var(--color-primary-600);
    }
  }
  .dialog-footer {
    display: flex;
    justify-content: space-between;
    width: 100%;
    gap: 12px;
    padding-top: 20px;
  }
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

  &.selected {
    border: 1.5px solid var(--color-primary-600);
    background: var(--color-primary-100);
  }

  .select-tool-card-body {
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

    .title-wrapper {
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

    .tool-description {
      color: var(--color-primary-800);
      line-height: normal;
      font-size: var(--font-size-fluid-2);
    }
  }
}

html.dark {
  .available-tools-modal {
    .modal-header {
      .modal-title {
        color: var(--color-primary-100);
      }

      .modal-subtitle {
        color: var(--color-primary-400);
      }
    }
  }

  .select-tool-card {
    background: var(--color-primary-800);
    border: 1.5px solid var(--color-primary-600);

    &:hover {
      cursor: pointer;
    }

    &.selected {
      background: var(--color-primary-700);
      border: 1.5px solid var(--color-primary-0);
    }

    .select-tool-card-body {
      .title-wrapper {
        .tool-label {
          color: var(--color-primary-0);
        }
      }

      .tool-description {
        color: var(--color-primary-100);
      }

      .icons {
        .function-icon {
          color: var(--color-primary-0);
        }
      }
    }
  }
}
</style>
