// In your component
<script lang="ts" setup>
import ArrowUp from '~/assets/icons/svg/arrow-up.svg'
import { useNuxtApp } from '#app'

const agentStore = useAgentStore()
const chatStore = useChatStore()
const { $getWs, $wsConnect, $wsSendMessage, $wsConnectionState } = useNuxtApp()
const message = ref('')
const route = useRoute()
const router = useRouter()
const chatId = route.params.chatId || null

const handleServerMessage = (data: string) => {
  const assistantMessage = chatStore?.messages?.find(
    msg => msg.id === 'currentlyStreaming',
  )
  if (chatStore.isWebSocketStreaming && assistantMessage) {
    if (assistantMessage && data !== '##STOP##') {
      assistantMessage.content += data
    }
    else if (data === '##STOP##') {
      chatStore.isWebSocketStreaming = false
      assistantMessage.id = ''
    }
  }
  else {
    const jsonObject = JSON.parse(data)

    if (chatId) {
      if (jsonObject?.body?.chatId) {
        chatStore.GET_ChatMessages(jsonObject?.body?.chatId)
      }
    }
    else {
      if (jsonObject?.body?.chatId && jsonObject?.header === 'chat_response') {
        router.push(`c/${jsonObject?.body?.chatId}`)
        chatStore.GET_AllChats(chatStore.userId)
      }
    }
  }
}

const agentId = computed(() => {
  if (chatId) {
    const selectedChatAgent = chatStore.getChatById(chatId)
    return selectedChatAgent?.agentId
  }
  else {
    return agentStore.selectedAgent?.id
  }
})

watch(
  agentId,
  () => {
    $wsConnect(chatId, agentId.value)
    const ws = $getWs()
    ws.onmessage = (event) => {
      handleServerMessage(event.data)
    }
  },
  { immediate: true, deep: true },
)

const sendMessage = () => {
  chatStore.isWebSocketStreaming = true
  const userMessage = {
    id: '',
    sender: '1',
    senderType: 'user',
    content: message.value,
    chatId: chatId || '',
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
    chatId: chatId || '',
    responseTo: '',
    evaluation: null,
    createdAt: '',
    updatedAt: '',
  }
  chatStore.messages?.unshift(userMessage)
  chatStore.messages?.unshift(assistantMessage)

  $wsSendMessage(message.value)
  message.value = ''
}
</script>

<template>
  <section class="chat-input-section">
    <el-input
      v-model="message"
      size="large"
      :placeholder="$t('chat.chatInputPlaceholder')"
      :disabled="!($wsConnectionState === 'open')"
      class="barrage-chat-input"
      @keyup.enter="sendMessage"
    >
      <template #suffix>
        <div class="suffix-icon" @click="sendMessage">
          <ArrowUp size="32" />
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
