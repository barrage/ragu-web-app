<script lang="ts" setup>
import { nextTick } from 'vue'
import ArrowUpIcon from '~/assets/icons/svg/arrow-up.svg'
import StopStreamIcon from '~/assets/icons/svg/stop-stream.svg'
import { useNuxtApp } from '#app'

const {
  $getWs,
  $wsConnect,
  $wsSendChatMessage,
  $wsConnectionState,
  $wsSendInitialMessage,
  $wsStopStream,
  $wsAddMessageHandler,
} = useNuxtApp()

const agentStore = useAgentStore()
const chatStore = useChatStore()
const { currentChatId, isWebSocketStreaming, messages, wsToken }
  = storeToRefs(useChatStore())
const isTokenFetching = ref(false)
const message = ref('')
const router = useRouter()

const route = useRoute()

async function ensureWsTokenAndConnect() {
  if (isTokenFetching.value) {
    return
  }
  if ($wsConnectionState.value !== 'open') {
    try {
      isTokenFetching.value = true
      await chatStore.GET_WsToken()

      await $wsConnect(wsToken.value)

      $getWs().onopen = async () => {
        $wsConnectionState.value = 'open'
        await handleAgentOrChatChange()
      }
      $getWs().onmessage = event => handleServerMessage(event.data)
      $getWs().onclose = async () => {
        console.warn(
          'WebSocket closed unexpectedly. Clearing token and attempting reconnection...',
        )
        $wsConnectionState.value = 'closed'
        isTokenFetching.value = false
        wsToken.value = ''
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

async function handleServerMessage(data: string) {
  let parsedData
  const assistantMessage = messages.value?.find(
    msg => msg.id === 'currentlyStreaming',
  )

  try {
    parsedData = JSON.parse(data)
  }
  catch (error) {
    console.error('Error parsing WebSocket message:', error)
    return
  }

  // Check if the parsed JSON is an error
  if (parsedData.errorType) {
    isWebSocketStreaming.value = false
    if (assistantMessage) {
      assistantMessage.id = ''
    }
    await ensureWsTokenAndConnect()
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
      assistantMessage.content += parsedData.chunk
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

async function handleAgentOrChatChange() {
  if ($wsConnectionState.value === 'open') {
    await $wsSendInitialMessage(route.params.chatId, agentId.value)
  }
  else {
    await ensureWsTokenAndConnect()
  }
}

const sendMessage = () => {
  if (!($wsConnectionState.value === 'open') || isWebSocketStreaming.value) {
    return
  }
  if (!message.value.trim()) {
    return
  }
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
  if (!Array.isArray(messages.value)) {
    messages.value = []
  }

  messages.value.push(userMessage)
  messages.value.push(assistantMessage)

  $wsSendChatMessage(message.value)
  isWebSocketStreaming.value = true
  message.value = ''
}

const isWatcherActive = ref(false)

watch(
  [agentId, currentChatId],
  async ([newAgentId, newChatId], [oldAgentId, oldChatId]) => {
    if (!isWatcherActive.value) {
      return
    }
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
  if (isWebSocketStreaming.value) {
    $wsStopStream()
    isWebSocketStreaming.value = false
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
const { error } = await useAsyncData(() => agentStore.GET_AllAppAgents(), {
  lazy: true,
})
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
        :disabled="!hasActiveAgents || !isSelectedAgentActive"
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
