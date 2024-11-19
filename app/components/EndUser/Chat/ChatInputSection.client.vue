<script lang="ts" setup>
import { nextTick } from 'vue'
import ArrowUpIcon from '~/assets/icons/svg/arrow-up.svg'
import StopStreamIcon from '~/assets/icons/svg/stop-stream.svg'
import { useNuxtApp } from '#app'

/* SETUP */
/* Ws plugin */
const { $getWs, $wsConnect, $wsSendChatMessage, $wsConnectionState, $wsSendInitialMessage, $wsStopStream, $wsAddMessageHandler } = useNuxtApp()

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

const route = useRoute()

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
    return
  }

  switch (parsedData?.type) {
    case 'chat_title':
      if (parsedData?.chatId && parsedData?.title && chatStore.selectedChat?.chat) {
        if (chatStore.selectedChat?.chat) {
          chatStore.selectedChat.chat.title = parsedData.title
        }
      }
      break

    case 'chat_closed':
      chatStore.isWebSocketStreaming = false
      break

    case 'chat_stop_stream':
      chatStore.isWebSocketStreaming = false
      if (route.params.chatId) {
        chatStore.GET_ChatMessages(parsedData.chatId)
      }
      break

    case 'finish_event':
      if (parsedData.chatId) {
        nextTick()
        if (route.params.chatId) {
          chatStore.GET_ChatMessages(parsedData.chatId)
        }
        else {
          chatStore.GET_AllChats()
          router.push(`/c/${parsedData.chatId}`)
        }
      }
      break

    case 'error':
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

      $getWs().onmessage = event => handleServerMessage(event.data)
      $getWs().onclose = async () => {
        console.warn('WebSocket closed unexpectedly. Clearing token and attempting reconnection...')
        $wsConnectionState.value = 'closed'
        isTokenFetching.value = false
        chatStore.wsToken = ''
        await ensureWsTokenAndConnect()
      }
      await handleAgentOrChatChange()
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

watch(
  [agentId, currentChatId],
  async ([newAgentId, newChatId], [oldAgentId, oldChatId]) => {
    if (newAgentId !== oldAgentId || newChatId !== oldChatId) {
      await handleAgentOrChatChange()
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
