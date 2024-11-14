<script lang="ts" setup>
import ArrowUpIcon from '~/assets/icons/svg/arrow-up.svg'
import StopStreamIcon from '~/assets/icons/svg/stop-stream.svg'
import { useNuxtApp } from '#app'

/* SETUP */
/* Ws plugin */
const { $getWs, $wsConnect, $wsSendChatMessage, $wsCloseChat, $wsDisconnect, $wsConnectionState, $wsSendInitialMessage, $wsStopStream, $wsAddMessageHandler } = useNuxtApp()

/* Stores */
const agentStore = useAgentStore()
const chatStore = useChatStore()

/* Data */
const isTokenFetching = ref(false)
const message = ref('')
const router = useRouter()

const currentChatId = computed(() => {
  return chatStore.currentChatId
})

const handleServerMessage = (data: string) => {
  let parsedData

  try {
    parsedData = JSON.parse(data)
  }
  catch (error) {
    const assistantMessage = chatStore?.messages?.find(
      msg => msg.id === 'currentlyStreaming',
    )

    if (chatStore.isWebSocketStreaming && assistantMessage) {
      if (data !== '##STOP##') {
        assistantMessage.content += data
      }
      else {
        chatStore.isWebSocketStreaming = false
        assistantMessage.id = ''
      }
    }
    else {
      console.warn('Received non-JSON data:', data)
    }
    return
  }

  switch (parsedData?.type) {
    case 'chat_open':
      if (parsedData.chatId) {
        console.log(`Chat opened with ID: ${parsedData?.chatId}`)
      }
      break

    case 'chat_title':
      // Handle chat title update.
      console.log('CHAT_TITLE')
      if (parsedData.chatId && parsedData.title) {
        const existingChat = chatStore.chats.find(chat => chat.id === parsedData.chatId)
        if (existingChat) {
          existingChat.title = parsedData.title
        }
        else {
          console.warn('Received chat title update for unknown chatId:', parsedData.chatId)
        }
      }
      break

    case 'chat_closed':
      // Handle chat closed message.
      console.log('Chat closed.')
      chatStore.isWebSocketStreaming = false
      break

    case 'finish_event':
      console.log('fiNISH EVENT')
      if (parsedData.chatId) {
        if (currentChatId.value) {
          chatStore.GET_ChatMessages(parsedData.chatId)
        }
        else {
          chatStore.GET_AllChats()
          router.push(`/c/${parsedData.chatId}`)
        }

        // Optionally handle any content sent along with the finish event.
        if (parsedData.content) {
          const assistantMessage = chatStore.messages?.find(
            msg => msg.id === 'currentlyStreaming',
          )
          if (assistantMessage) {
            assistantMessage.content += parsedData.content
            chatStore.isWebSocketStreaming = false
            assistantMessage.id = ''
          }
        }
      }
      break

    case 'error':
      console.error(`Error occurred: ${parsedData.reason}`, parsedData.description || '')
      break

    default:
      console.warn('Received unknown message type:', parsedData)
      break
  }
}

const agentId = computed(() => {
  if (currentChatId.value) {
    return ''
  }
  else {
    return agentStore.selectedAgent?.id
  }
})

const handleAgentOrChatChange = async (newAgentId: string | null | undefined, newChatId: string | null | undefined) => {
  if ($wsConnectionState.value === 'open') {
    await $wsSendInitialMessage(currentChatId?.value, agentId.value)
  }
  else {
    await ensureWsTokenAndConnect()
  }
}

const ensureWsTokenAndConnect = async () => {
  if (isTokenFetching.value) { return }
  if ($wsConnectionState.value !== 'open') {
    try {
      isTokenFetching.value = true
      await chatStore.GET_WsToken()

      await $wsConnect(chatStore.wsToken)

      $getWs().onmessage = event => handleServerMessage(event.data)
      $getWs().onclose = async () => {
        console.warn('WebSocket closed unexpectedly. Clearing token and attempting reconnection...')
        $wsConnectionState.value = 'closed'
        isTokenFetching.value = false
        chatStore.wsToken = ''
        await ensureWsTokenAndConnect()
      }
      await handleAgentOrChatChange(currentChatId?.value, agentId.value)
    }
    catch (error) {
      isTokenFetching.value = false
      console.error('Error fetching WebSocket token or connecting:', error)
    }
    finally {
      isTokenFetching.value = false
    }
  }
  else {
    handleAgentOrChatChange(currentChatId.value, agentId.value)
  }
}

const sendMessage = () => {
  if (!($wsConnectionState.value === 'open') || chatStore.isWebSocketStreaming) { return }
  if (!message.value.trim()) { return }
  console.log('tu sam sendo message')
  const userMessage = {
    id: '',
    sender: '1',
    senderType: 'user',
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
    senderType: 'assistant',
    content: '',
    chatId: currentChatId.value || '',
    responseTo: '',
    evaluation: null,
    createdAt: '',
    updatedAt: '',
  }

  // Ensure messages array is initialized
  if (!Array.isArray(chatStore.messages)) {
    chatStore.messages = []
  }

  chatStore.messages.unshift(userMessage)
  chatStore.messages.unshift(assistantMessage)

  $wsSendChatMessage(message.value)
  chatStore.isWebSocketStreaming = true
  message.value = ''
}

watch(
  [agentId, currentChatId],
  async ([newAgentId, newChatId], [oldAgentId, oldChatId]) => {
    if (newAgentId !== oldAgentId || newChatId !== oldChatId) {
      await handleAgentOrChatChange(currentChatId.value, agentId.value)
    }
  },
  { immediate: true },
)

onMounted(async () => {
  await ensureWsTokenAndConnect()
  $wsAddMessageHandler(handleServerMessage)
})

const stopStream = () => {
  if (chatStore.isWebSocketStreaming) {
    $wsStopStream()
    chatStore.isWebSocketStreaming = false
  }
}
</script>

<template>
  <section class="chat-input-section">
    <div class="input-button-wrapper">
      <el-input
        v-model="message"
        size="large"
        :placeholder="$t('chat.chatInputPlaceholder')"
        class="barrage-chat-input"
        @keyup.enter="sendMessage"
      />
      <template v-if="chatStore.isWebSocketStreaming">
        <el-button
          circle
          small
          class="start-stop-chat-button"
          @click="stopStream"
        >
          <StopStreamIcon size="32" />
        </el-button>
      </template>
      <template v-else>
        <el-button
          circle
          small
          class="start-stop-chat-button"
          @click="sendMessage"
        >
          <ArrowUpIcon size="32" />
        </el-button>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.chat-input-section {
  height: 84px;
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;

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
    }

    & .start-stop-chat-button {
      max-height: min-content;
    }
  }
}

.suffix-icon {
  color: var(--color-primary-100);
  background: var(--color-primary-800);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  &:hover {
    color: var(--color-primary-0);
    background: var(--color-primary-900);
  }
}
.dark {
  & .suffix-icon {
    color: var(--color-primary-700);
    background: var(--color-primary-100);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
