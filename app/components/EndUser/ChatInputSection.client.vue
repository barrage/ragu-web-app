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
    const jsonObject = JSON?.parse(data)

    if (jsonObject?.chatId && jsonObject?.type === 'finish_event') {
      if (currentChatId.value) {
        chatStore.GET_ChatMessages(jsonObject.chatId)
      }
      else {
        chatStore.GET_AllChats()
        router.push(`/c/${jsonObject.chatId}`)
      }
    }
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

  if (chatStore?.messages) {
    chatStore?.messages.push(userMessage)
    chatStore?.messages.push(assistantMessage)
  }

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
    {{ }}
    <el-input
      v-model="message"
      size="large"
      :placeholder="$t('chat.chatInputPlaceholder')"
      class="barrage-chat-input"
      @keyup.enter="sendMessage"
    >
      <template #suffix>
        <div
          v-if="chatStore.isWebSocketStreaming"
          class="suffix-icon"
          @click="stopStream"
        >
          <StopStreamIcon size="32" />
        </div>
        <div
          v-else
          class="suffix-icon"
          @click="sendMessage"
        >
          <ArrowUpIcon size="32" />
        </div>
      </template>
    </el-input>
  </section>
</template>

<style lang="scss" scoped>
.chat-input-section {
  height: 84px;
  width: 100%;
  background: transparent;
  display: flex;
  align-items: start;
  justify-content: space-around;
  & .barrage-chat-input {
    width: 100%;
    max-width: 768px;
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
