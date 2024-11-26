<script lang="ts" setup>
import { nextTick } from 'vue'
import ArrowUpIcon from '~/assets/icons/svg/arrow-up.svg'
import StopStreamIcon from '~/assets/icons/svg/stop-stream.svg'
import { useNuxtApp } from '#app'

const { $getWs, $wsConnect, $wsSendChatMessage, $wsConnectionState, $wsSendInitialMessage, $wsStopStream, $wsAddMessageHandler } = useNuxtApp()

const agentStore = useAgentStore()
const chatStore = useChatStore()
const isTokenFetching = ref(false)
const message = ref('')
const router = useRouter()

const currentChatId = computed(() => {
  return chatStore.currentChatId
})

const route = useRoute()

const handleServerMessage = (data: string) => {
  let parsedData
  const assistantMessage = chatStore?.messages?.find(
    msg => msg.id === 'currentlyStreaming',
  )
  try {
    parsedData = JSON.parse(data)
  }
  catch (error) {
    if (chatStore.isWebSocketStreaming && assistantMessage) {
      assistantMessage.content += data
    }
    return
  }
  if (parsedData) {
    if (chatStore.isWebSocketStreaming && assistantMessage) {
      if (typeof parsedData === 'number' || !Number.isNaN(Number(parsedData))) {
        assistantMessage.content += String(parsedData)
      }
      else if (parsedData.content) {
        assistantMessage.content += parsedData.content
      }
    }
  }

  switch (parsedData?.type) {
    case 'chat_title':
      handleChatTitleEvent(parsedData)
      break
    case 'chat_closed':
      chatStore.isWebSocketStreaming = false
      if (assistantMessage) {
        assistantMessage.id = ''
      }
      break
    case 'chat_stop_stream':
      chatStore.isWebSocketStreaming = false
      if (assistantMessage) {
        assistantMessage.id = ''
      }
      if (route.params.chatId) {
        chatStore.GET_ChatMessages(parsedData.chatId)
      }
      break
    case 'finish_event':
      chatStore.isWebSocketStreaming = false
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
    case 'API':
      chatStore.isWebSocketStreaming = false
      if (assistantMessage) {
        assistantMessage.id = ''
      }
      break
    case 'error':
      chatStore.isWebSocketStreaming = false
      if (assistantMessage) {
        assistantMessage.id = ''
      }
      break
    default:
      break
  }
}

const agentId = computed(() => {
  if (route.params.chatId) {
    return ''
  }
  else {
    return agentStore.selectedAgent?.id
  }
})

const handleAgentOrChatChange = async () => {
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

      $getWs().onopen = async () => {
        $wsConnectionState.value = 'open'
        await handleAgentOrChatChange()
      }
      $getWs().onmessage = event => handleServerMessage(event.data)
      $getWs().onclose = async () => {
        console.warn('WebSocket closed unexpectedly. Clearing token and attempting reconnection...')
        $wsConnectionState.value = 'closed'
        isTokenFetching.value = false
        chatStore.wsToken = ''
        await ensureWsTokenAndConnect()
      }
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
    handleAgentOrChatChange()
  }
}

const sendMessage = () => {
  if (!($wsConnectionState.value === 'open') || chatStore.isWebSocketStreaming) { return }
  if (!message.value.trim()) { return }
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
  if (!Array.isArray(chatStore.messages)) {
    chatStore.messages = []
  }

  chatStore.messages.unshift(userMessage)
  chatStore.messages.unshift(assistantMessage)

  $wsSendChatMessage(message.value)
  chatStore.isWebSocketStreaming = true
  message.value = ''
}

const isWatcherActive = ref(false)

watch(
  [agentId, currentChatId],
  async ([newAgentId, newChatId], [oldAgentId, oldChatId]) => {
    if (!isWatcherActive.value) { return }
    if (newAgentId !== oldAgentId || newChatId !== oldChatId) {
      await handleAgentOrChatChange()
    }
  },
  { immediate: true },
)

onBeforeMount(async () => {
  await ensureWsTokenAndConnect()
  $wsAddMessageHandler(handleServerMessage)
  isWatcherActive.value = true
})

const stopStream = () => {
  if (chatStore.isWebSocketStreaming) {
    $wsStopStream()
    chatStore.isWebSocketStreaming = false
  }
}

const hasActiveAgents = computed(() => {
  return agentStore.appAgents.filter(agent => agent.active).length > 0
})

const isSelectedAgentActive = computed(() => {
  if (route.params.chatId) {
    return chatStore.selectedChat?.agent?.active
  }
  else {
    return true
  }
})
const { error } = await useAsyncData(() => agentStore.GET_AllAppAgents())
errorHandler(error)

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
    <el-card v-if="chatStore.selectedChat?.chat?.id && !(chatStore?.selectedChat?.agent?.active)" class="inactive-agent-card is-accent">
      <p>
        {{ $t('chat.inactive_agent') }}
      </p>
    </el-card>
    <div v-else class="input-button-wrapper">
      <el-input
        v-model="message"
        size="large"
        :placeholder="$t('chat.chatInputPlaceholder')"
        class="barrage-chat-input"
        :disabled="!hasActiveAgents || !isSelectedAgentActive"
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
          :disabled="!hasActiveAgents || !isSelectedAgentActive"
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
.inactive-agent-card {
  width: fit-content;
  height: fit-content;
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
