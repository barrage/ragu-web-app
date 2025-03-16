<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'
import type { RaguWebSocket } from '~/plugins/websocket.client'

const { t } = useI18n()

const { $ws }: { $ws: RaguWebSocket } = useNuxtApp() as any
const route = useRoute()

const router = useRouter()
const agentStore = useAgentStore()
const chatStore = useChatStore()

const { selectedChat, messages } = storeToRefs(chatStore)
const { selectedAgent } = storeToRefs(agentStore)

const isWebSocketStreaming = ref(false)
const isWatcherActive = ref(false)

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
const behavior = computed<'smooth' | 'auto'>(() => (smooth.value ? 'smooth' : 'auto'))

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
    case 'chat.stream_complete':
      isWebSocketStreaming.value = false
      if (parsedData.chatId) {
        nextTick()
        router.push(`/c/${parsedData.chatId}`)
        if (!selectedChat.value) {
          chatStore.GET_AllChats()
        }
      }
      break
    case 'chat.stream_chunk':
      if (!isWebSocketStreaming.value) {
        return
      }

      const assistantMessage = messages.value[messages.value.length - 1]

      if (assistantMessage) {
        console.assert(assistantMessage?.senderType === 'assistant', 'Assistant message not found')
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
    console.assert(assistantMessage?.senderType === 'assistant', 'Assistant message not found')
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
  if (selectedChat.value) {
    return
  }
  if (selectedAgent.value?.id && newAgent?.id !== oldAgent?.id) {
    $ws.openNewWorkflow('CHAT', selectedAgent.value.id)
  }
}, { immediate: true })

watch(
  messages,
  scrollToBottom,
  { immediate: true, deep: true },
)

onMounted(() => {
  scrollToBottom()
  $ws.onMessage(handleIncomingMessage)
  isWatcherActive.value = true
})

/* Chat messages */
const { error: messagesError, execute: getChatMessages, status: loadingMessages } = await useAsyncData(() =>
  chatStore.GET_ChatMessages(route.params.chatId!.toString()), { immediate: false })
errorHandler(messagesError)

/* Chat data */
const { error: chatError, execute: getChat, status: loadingChat } = await useAsyncData(() =>
  chatStore.GET_Chat(route.params.chatId!.toString()), { immediate: false })

errorHandler(chatError)

const showLoadingState = computed(() => !messages.value?.length && (loadingChat.value === 'pending' || loadingMessages.value === 'pending'))

onBeforeMount(async () => {
  // Check if we are loading an existing chat
  const route = useRoute()
  const chatId = route.params.chatId

  const currentChatId = Array.isArray(chatId) ? chatId[0] : chatId

  // Load the chat and its messages
  if (currentChatId) {
    // Always fetch the chat, since we need it both when redirecting from / and
    // when loading the chat from /c/:chatId
    await getChat()

    // Only load messages if we are on /c/:chatId
    // Redirections from / will ensure that messages are loaded beforehand
    if (!messages.value?.length) {
      await getChatMessages()
    }
    $ws.openExistingWorkflow(currentChatId)
  }
  else if (selectedAgent.value) {
    $ws.openNewWorkflow('CHAT', selectedAgent.value.id)
  }
})

onBeforeUnmount(() => {
  if (selectedChat.value) {
    messages.value = []
    selectedChat.value = null
  }
})
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
        {{ t('global_disclaimer') }}
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
