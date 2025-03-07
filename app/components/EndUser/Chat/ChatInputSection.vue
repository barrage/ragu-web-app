<script lang="ts" setup>
import { nextTick } from 'vue'
import ArrowUpIcon from '~/assets/icons/svg/arrow-up.svg'
import StopStreamIcon from '~/assets/icons/svg/stop-stream.svg'
import type { RaguWebSocket } from '~/plugins/websocket.client'

const { $ws }: { $ws: RaguWebSocket } = useNuxtApp() as any

const router = useRouter()
const agentStore = useAgentStore()
const chatStore = useChatStore()
const { currentChatId, isWebSocketStreaming, messages }
  = storeToRefs(useChatStore())
const message = ref('')

// Should be undefined only when a chat is currently selected.
const agentId: Ref<string | undefined> = computed(() => {
  if (currentChatId.value) {
    return
  }
  return agentStore.selectedAgent?.id
})

const { error: chatError, execute: getChat } = await useAsyncData(() =>
  chatStore.GET_Chat(currentChatId.value!.toString()), { immediate: false })

errorHandler(chatError)

const { error: agentsError } = useAsyncData(() => agentStore.GET_AllAppAgents(), { lazy: true })

errorHandler(agentsError)

async function handleServerMessage(event: MessageEvent) {
  let parsedData
  // FIXME: This jank is glorious, but should be reconsidered
  const assistantMessage = messages.value?.find(
    msg => msg.id === 'currentlyStreaming',
  )

  try {
    parsedData = JSON.parse(event.data)
  }
  catch (error) {
    console.error('Error parsing WebSocket message:', error)
    return
  }

  if (parsedData.errorType) {
    isWebSocketStreaming.value = false
    if (assistantMessage) {
      assistantMessage.id = ''
      assistantMessage.content = parsedData.displayMessage
    }

    if (parsedData.errorType === 'API' && parsedData.errorReason === 'EntityDoesNotExist') {
      const agentId = parsedData.errorDescription.split('\'')[1]
      agentStore.updateAgentStatus(agentId, false)
    }

    if (currentChatId.value) {
      getChat()
      chatStore.GET_ChatMessages(currentChatId.value)
    }

    return
  }

  switch (parsedData?.type) {
    case 'chat.title':
      handleChatTitleEvent(parsedData)
      break
    case 'workflow.closed':
      isWebSocketStreaming.value = false
      if (assistantMessage) {
        assistantMessage.id = ''
      }
      break
    case 'chat.stream_complete':
      isWebSocketStreaming.value = false
      if (assistantMessage) {
        assistantMessage.id = ''
      }
      if (parsedData.chatId) {
        nextTick()
        chatStore.GET_ChatMessages(parsedData.chatId)
        chatStore.GET_AllChats()
        router.push(`/c/${parsedData.chatId}`)
      }
      break
    case 'chat.stream_chunk':
      if (assistantMessage) {
        assistantMessage.content += parsedData.chunk
      }
      break
    default:
      break
  }
}

const sendMessage = () => {
  if (!($ws.wsState() === WebSocket.OPEN) || isWebSocketStreaming.value) {
    return
  }

  if (!message.value.trim()) {
    return
  }

  const userMessage = {
    id: '',
    sender: '1',
    senderType: 'user' as const,
    content: message.value,
    chatId: currentChatId.value || '',
    responseTo: '',
    evaluation: null,
    createdAt: '',
    updatedAt: '',
  }
  const assistantMessage = {
    id: 'currentlyStreaming',
    sender: '1',
    senderType: 'assistant' as const,
    content: '',
    chatId: currentChatId.value || '',
    responseTo: '',
    evaluation: null,
    createdAt: '',
    updatedAt: '',
  }
  if (!Array.isArray(messages.value)) {
    messages.value = []
  }

  messages.value.unshift(userMessage)
  messages.value.unshift(assistantMessage)

  $ws.sendTextMessage(message.value)

  isWebSocketStreaming.value = true
  message.value = ''
}

const isWatcherActive = ref(false)

watch(agentId, async (newAgentId, oldAgentId) => {
  if (!isWatcherActive.value) {
    return
  }

  if (agentId.value && newAgentId !== oldAgentId) {
    $ws.openNewWorkflow('CHAT', agentId.value)
  }
}, { immediate: true })

watch(
  currentChatId,
  async (newChatId, oldChatId) => {
    if (!isWatcherActive.value) {
      return
    }
    if (currentChatId.value && newChatId !== oldChatId) {
      $ws.openExistingWorkflow(currentChatId.value)
    }
  },
  { immediate: true },
)

onMounted(async () => {
  $ws.onMessage(handleServerMessage)
  if (currentChatId.value) {
    $ws.openExistingWorkflow(currentChatId.value)
  }
  isWatcherActive.value = true
})

const stopStream = () => {
  if (isWebSocketStreaming.value) {
    $ws.cancelStream()
    isWebSocketStreaming.value = false
  }
}

const hasActiveAgents = computed(() => {
  return agentStore.appAgents.filter(agent => agent.active).length > 0
})

const isSelectedAgentActive = computed(() => {
  if (currentChatId.value) {
    return chatStore.selectedChat?.agent?.active
  }
  else {
    return true
  }
})

function handleChatTitleEvent(parsedData: { chatId: string, title: string }) {
  const { chatId, title } = parsedData

  if (!chatId || !title) {
    console.error('Invalid data for chat_title event:', parsedData)
    return
  }

  const selectedChat = chatStore.selectedChat?.chat
  if (selectedChat && selectedChat.id === chatId) {
    selectedChat.title = title
  }

  const chatToUpdate = chatStore.chats.find(chat => chat.id === chatId)
  if (chatToUpdate) {
    chatToUpdate.title = title
  }
}
</script>

<template>
  <section class="chat-input-section">
    <ElCard
      v-if="
        chatStore.selectedChat?.chat?.id
          && !chatStore?.selectedChat?.agent?.active
      "
      class="inactive-agent-card is-accent"
    >
      {{ $t("chat.inactive_agent") }}
    </ElCard>
    <div v-else-if="agentStore.appAgents.length" class="input-button-wrapper">
      <ElInput
        v-model="message"
        v-motion-slide-bottom
        :delay="1100"
        size="large"
        :placeholder="$t('chat.chatInputPlaceholder')"
        class="barrage-chat-input"
        :disabled="!hasActiveAgents || !isSelectedAgentActive "
        @keyup.enter="sendMessage"
      >
        <template #suffix>
          <div
            class="input-suffix-wrapper"
            :class="{
              'input-suffix-wrapper--active':
                message.length || isWebSocketStreaming,
            }"
          >
            <StopStreamIcon
              v-if="isWebSocketStreaming"
              size="32px"
              tabindex="0"
              @click="stopStream"
              @keyup.enter="stopStream"
            />
            <ArrowUpIcon
              v-else-if="hasActiveAgents && isSelectedAgentActive"
              :tabindex="message.length ? 0 : -1"
              size="32px"
              @click="sendMessage"
              @keyup.enter="sendMessage"
            />
          </div>
        </template>
      </ElInput>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.chat-input-section {
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  & .input-button-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 6px;
    max-width: 768px;
    max-height: 62px;

    & .barrage-chat-input {
      width: 100%;
      max-width: 768px;

      ::v-deep(.barrage-input__inner) {
        background-color: var(--color-primary-100);
      }

      .input-suffix-wrapper {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 20%;
        width: 40px;
        height: 40px;
        color: var(--color-primary-300);
        border: var(--border-size-1) var(--border-type-solid)
          var(--color-primary-300);

        transition:
          color 0.3s ease-in-out,
          border-color 0.3s ease-in-out;

        &--active {
          color: var(--color-primary-700);
          border-color: var(--color-primary-700);
        }
      }
    }
  }
}

.inactive-agent-card {
  width: fit-content;
  height: fit-content;
}

html.dark {
  .chat-input-section {
    & .input-button-wrapper {
      & .barrage-chat-input {
        ::v-deep(.barrage-input__inner) {
          background-color: var(--color-primary-800);
        }

        .input-suffix-wrapper {
          color: var(--color-primary-700);
          border-color: var(--color-primary-700);

          &--active {
            color: var(--color-primary-400);
            border-color: var(--color-primary-400);
          }
        }
      }
    }
  }
}
</style>
