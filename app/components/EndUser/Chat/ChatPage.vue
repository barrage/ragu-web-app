<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import type { RaguWebSocket } from '~/utils/websocket'
import { RaguWebSocketState } from '~/utils/websocket'

const { t } = useI18n()

const { $ws }: { $ws: RaguWebSocket } = useNuxtApp() as any

const route = useRoute()

const currentChatId = computed(() => {
  const id = route.params.chatId
  if (!id) { return undefined }
  if (Array.isArray(id)) { return id[0] }
  return id.toString()
})
const router = useRouter()
const agentStore = useAgentStore()
const chatStore = useChatStore()

const { selectedChat, messages, isWebSocketStreaming } = storeToRefs(chatStore)
const { selectedAgent } = storeToRefs(agentStore)

const isSelectedAgentActive = computed(() => {
  if (selectedChat.value) {
    return selectedChat?.value.agent?.active
  }
  else {
    return true
  }
})

const chatViewWrapper = ref<HTMLElement | null>(null)
const smooth = ref<boolean>(true)
const behavior = computed<'smooth' | 'auto'>(() =>
  smooth.value ? 'smooth' : 'auto',
)

const { y } = useScroll(chatViewWrapper, { behavior })

const displayY = computed<number>({
  get() {
    return Number(y.value)
  },
  set(val: number) {
    y.value = val
  },
})

const scrollToBottom = async () => {
  await nextTick()

  setTimeout(() => {
    if (chatViewWrapper.value) {
      const scrollHeight = chatViewWrapper.value.scrollHeight
      chatViewWrapper.value.scrollTo({
        top: scrollHeight,
        behavior: behavior.value,
      })
    }
  }, 100)
}

async function handleIncomingMessage(event: MessageEvent) {
  let parsedData

  try {
    parsedData = JSON.parse(event.data)
  }
  catch (error) {
    console.error('Error parsing WebSocket message:', error)
    return
  }

  if (parsedData.errorType) {
    handleErrorMessage(parsedData)
    return
  }

  switch (parsedData?.type) {
    case 'workflow.closed':
      isWebSocketStreaming.value = false
      break
    case 'chat.title':
      handleChatTitleEvent(parsedData)
      break
    case 'workflow.stream_complete':
      // This means we have errored and do not want to redirect
      if (!isWebSocketStreaming.value) {
        return
      }

      isWebSocketStreaming.value = false

      if (parsedData.workflowId && parsedData.messageGroupId) {
        const lastAssistantMessage = messages.value[messages.value.length - 1]

        if (
          lastAssistantMessage
          && lastAssistantMessage.senderType === 'assistant'
        ) {
          lastAssistantMessage.messageGroupId = parsedData.messageGroupId
        }

        // Only present in case when workflow is not streaming
        if (parsedData.content) {
          lastAssistantMessage.content = parsedData.content
        }

        if (!selectedChat.value) {
          await chatStore.GET_AllChats()
        }

        nextTick()
        router.push(`/c/${parsedData.workflowId}`)
      }

      break
    case 'workflow.stream_chunk':
      if (!isWebSocketStreaming.value) {
        return
      }

      const assistantMessage = messages.value[messages.value.length - 1]

      if (assistantMessage) {
        console.assert(
          assistantMessage?.senderType === 'assistant',
          'Assistant message not found',
        )
        assistantMessage.content += parsedData.chunk
      }

      break
    default:
      break
  }
}

function handleErrorMessage(error: any) {
  console.error('received error from ws:', error)

  isWebSocketStreaming.value = false

  const assistantMessage = messages.value?.[messages.value.length - 1]

  if (assistantMessage) {
    console.assert(
      assistantMessage?.senderType === 'assistant',
      'Assistant message not found',
    )
    assistantMessage.content = error.displayMessage
  }

  if (error.errorType === 'API' && error.errorReason === 'EntityDoesNotExist') {
    const agentId = error.errorDescription.split('\'')[1]
    agentStore.updateAgentStatus(agentId, false)
  }
}

function handleChatTitleEvent(parsedData: { chatId: string, title: string }) {
  const { chatId, title } = parsedData

  if (!chatId || !title) {
    console.error('Invalid data for chat_title event:', parsedData)
    return
  }

  if (selectedChat.value && selectedChat.value.chat.id === chatId) {
    selectedChat.value.chat.title = title
  }

  const chatToUpdate = chatStore.chats.find(chat => chat.id === chatId)
  if (chatToUpdate) {
    chatToUpdate.title = title
  }
}

function stopStream() {
  if (isWebSocketStreaming.value) {
    $ws.cancelStream()
    isWebSocketStreaming.value = false
  }
}

function sendMessage(message: string) {
  $ws.sendTextMessage(message)
  isWebSocketStreaming.value = true

  const userMessage = {
    senderType: 'user' as const,
    content: message,
  }

  const assistantMessage = {
    senderType: 'assistant' as const,
    content: '',
  }

  messages.value.push(userMessage)
  messages.value.push(assistantMessage)
}

watch(selectedAgent, async (newAgent, oldAgent) => {
  if (selectedChat.value || currentChatId.value) {
    return
  }
  if (selectedAgent.value?.id && newAgent?.id !== oldAgent?.id) {
    $ws.openNewWorkflow('CHAT', selectedAgent.value.id)
  }
})

watch(messages, scrollToBottom, { immediate: true, deep: true })

// Watch for WS state changes to send the open request

let openingMessageSent = false

watch($ws.state, (newState) => {
  // Retrigger the opening message in cases where we disconnected.
  // Workflows on the server are removed on disconnection, so we need to reinitialize the
  // chat again when we reconnect.
  if (openingMessageSent && newState !== RaguWebSocketState.INITIALIZED) {
    openingMessageSent = false
    return
  }

  if (newState !== RaguWebSocketState.INITIALIZED || openingMessageSent) {
    return
  }

  if (currentChatId.value) {
    $ws.openExistingWorkflow('CHAT', currentChatId.value)
    openingMessageSent = true
    return
  }

  if (selectedAgent.value) {
    $ws.openNewWorkflow('CHAT', selectedAgent.value.id)
    openingMessageSent = true
  }
})

onMounted(async () => {
  scrollToBottom()
  $ws.onMessage(handleIncomingMessage)
  // Load the chat and its messages
  if (currentChatId.value) {
    // Always fetch the chat, since we need it both when redirecting from / and
    // when loading the chat from /c/:chatId
    await getChat()
    // Only load messages if we are on /c/:chatId
    // Redirections from / will ensure that messages are loaded beforehand
    if (!messages.value?.length) {
      await getChatMessages()
    }

    if ($ws.state.value === RaguWebSocketState.INITIALIZED) {
      $ws.openExistingWorkflow('CHAT', currentChatId.value)
      openingMessageSent = true
    }
  }
  else if (selectedAgent.value) {
    if ($ws.state.value === RaguWebSocketState.INITIALIZED) {
      $ws.openNewWorkflow('CHAT', selectedAgent.value?.id)
      openingMessageSent = true
    }
  }
})

onBeforeUnmount(() => {
  if (selectedChat.value) {
    messages.value = []
    selectedChat.value = null
  }
})

const {
  error: messagesError,
  execute: getChatMessages,
  status: loadingMessages,
} = await useAsyncData(`messages-${currentChatId.value}`, () => chatStore.GET_ChatMessages(route.params?.chatId), { immediate: false, lazy: true })

errorHandler(messagesError)

const {
  error: chatError,
  execute: getChat,
  status: loadingChat,
} = await useAsyncData(`${currentChatId.value}`, () => chatStore.GET_Chat(route.params?.chatId), { immediate: false, lazy: true })

errorHandler(chatError)

const showLoadingState = computed(
  () =>
    !messages.value?.length
    && (loadingChat.value === 'pending' || loadingMessages.value === 'pending'),
)
</script>

<template>
  <div class="chat-page">
    <div
      v-if="!showLoadingState"
      ref="chatViewWrapper"
      class="chat-page-content"
      :class="{ chat_title_small: displayY >= 30 }"
    >
      <slot name="default" />
    </div>
    <div v-else class="chat-loading-container">
      <MeetUpLoader />
    </div>
    <div class="chat-page-footer">
      <ChatInputSection
        :show="!!agentStore.appAgents.length || !!selectedChat"
        :disabled="!isSelectedAgentActive"
        :streaming="isWebSocketStreaming"
        @stop-stream="stopStream"
        @send-message="sendMessage"
      />
      <p class="chat-page-footer__text">
        {{ t("global_disclaimer") }}
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  & .chat-page-content {
    overflow-y: auto;
    overflow-x: hidden;
    height: 100%;
    scrollbar-width: none;
    -ms-overflow-style: none;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  & .chat-page-footer {
    flex: 1 0 calc(10%);

    &__text {
      color: var(--color-primary-500);
      font-size: var(--font-size-fluid-2);
      text-align: center;
    }
  }
}

.loading,
.error {
  text-align: center;
  margin: 20px 0;
}

.chat-loading-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}
</style>
