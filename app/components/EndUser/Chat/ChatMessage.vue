<script setup lang="ts">
import { marked } from 'marked'
import hljs from 'highlight.js'
import MicrophoneIcon from '~/assets/icons/svg/microphone.svg'
import LikeIcon from '~/assets/icons/svg/like.svg'
import LikeFilledIcon from '~/assets/icons/svg/like-filled.svg'
import DislikeIcon from '~/assets/icons/svg/dislike.svg'
import DislikeFilledIcon from '~/assets/icons/svg/dislike-filled.svg'
import CopyIcon from '~/assets/icons/svg/copy.svg'
import StopIcon from '~/assets/icons/svg/stop.svg'
import type { Message } from '~/types/chat'
import { sanitizeHtml } from '~/utils/sanitizeHtml'
import AgentCard from '~/components/Backoffice/Agents/AgentCard.vue'

const props = defineProps<{
  message: Message | null
  agentId: string | number | undefined
}>()

const isDark = useDark()
const loadHighlightTheme = (isDarkMode: boolean) => {
  const themeLinkId = 'highlight-theme'
  let themeLink = document.getElementById(themeLinkId) as HTMLLinkElement | null

  if (!themeLink) {
    themeLink = document.createElement('link')
    themeLink.id = themeLinkId
    themeLink.rel = 'stylesheet'
    document.head.appendChild(themeLink)
  }
  themeLink.href = isDarkMode
    ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css'
    : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-light.min.css'
}

watch(isDark, (newVal) => {
  loadHighlightTheme(newVal)
}, { immediate: true })

const { t } = useI18n()
const authStore = useAuthStore()
const chatStore = useChatStore()
const agentStore = useAgentStore()
const isAssistantMessage = computed(() => props.message?.senderType === 'assistant')
const displayedContent = ref('')
const pendingContent = ref('')

const agentAvatar = computed(() => {
  const agent = agentStore.appAgentsResponse?.items.find(agent => agent.id === props.agentId)
  return agent?.avatar || null
})

const isTable = computed(() => {
  if (!props.message?.content) {
    return false
  }
  const lines = props.message.content.split('\n')
  const tableStartIndex = lines.findIndex(line => line.trim().startsWith('|'))
  const isTableContent = tableStartIndex !== -1 && lines.slice(tableStartIndex).some(line => line.includes('|'))

  return isTableContent
})

const tableData = computed(() => {
  if (!isTable.value || !props.message?.content) {
    return null
  }

  const lines = props.message.content.split('\n')
  const tableStartIndex = lines.findIndex(line => line.trim().startsWith('|'))
  if (tableStartIndex === -1) {
    return null
  }

  const tableLines = lines.slice(tableStartIndex)
  const headers = tableLines[0]?.split('|').filter(cell => cell.trim()).map(cell => cell.trim())
  const body = tableLines.slice(2)
    .filter(line => line.includes('|') && !line.replace(/\|/g, '').trim().match(/^[-\s]+$/))
    .map(row => row.split('|').filter(cell => cell.trim()).map(cell => cell.trim()))

  const result = { headers, body }

  return result
})

marked.setOptions({
  breaks: true,
  gfm: true,
  highlight(code, lang) {
    try {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return hljs.highlightAuto(code).value
    }
    catch (error) {
      console.error('Highlight.js error:', error)
      return code
    }
  },
})

const formatContent = (content: string) => {
  if (!content) { return '' }
  const rawHtml = marked(content)
  return sanitizeHtml(rawHtml)
}

const sanitizedDisplayedContent = computed(() => formatContent(displayedContent.value))

const isAnimating = ref(false)
let animationTimeout: number | null = null

const animateNextLetter = () => {
  if (pendingContent.value.length > 0) {
    displayedContent.value += pendingContent.value[0]
    pendingContent.value = pendingContent.value.slice(1)
    isAnimating.value = true
    animationTimeout = window.setTimeout(() => {
      animateNextLetter()
    }, 10)
  }
  else {
    isAnimating.value = false
  }
}

watch(
  () => props.message?.content,
  (newContent, oldContent) => {
    if (isAssistantMessage.value && newContent && oldContent) {
      const additionalContent = newContent.slice(oldContent.length)
      pendingContent.value += additionalContent

      if (!isAnimating.value) {
        animateNextLetter()
      }
    }
    else if (newContent) {
      displayedContent.value = newContent
      pendingContent.value = ''
    }
  },
  { immediate: true },
)

const isSpeaking = ref(false)

/* VOICE */
const stopReading = () => {
  if (speechSynthesis.speaking) {
    speechSynthesis.cancel()
    isSpeaking.value = false
  }
}

const readText = () => {
  if (isSpeaking.value) {
    stopReading()
  }
  else {
    if (props.message?.content) {
      const utterance = new SpeechSynthesisUtterance(props.message.content)
      utterance.onend = () => {
        isSpeaking.value = false
      }
      speechSynthesis.speak(utterance)
      isSpeaking.value = true
    }
  }
}

onBeforeUnmount(() => {
  if (animationTimeout) {
    clearTimeout(animationTimeout)
  }
  stopReading()
})

const { copy } = useClipboard()

const copyItem = () => {
  if (props.message?.content) {
    copy(props.message.content)
    ElNotification({
      title: t('chat.copy_title'),
      message: t('chat.copy_message'),
      type: 'info',
      customClass: 'info',
      duration: 2500,
    })
  }
}

const optimisticEvaluationUpdate = (messageId: string, status: boolean) => {
  if (!chatStore || !chatStore.messages) {
    console.error('Chat store or messages array is undefined.')
    return
  }

  const messageIndex = chatStore.messages.findIndex(message => message.id === messageId)

  if (messageIndex !== -1 && chatStore.messages[messageIndex]) {
    const message = chatStore.messages[messageIndex]

    if (message) {
      message.evaluation = status
    }
    else {
      console.error(`Message with ID ${messageId} is undefined.`)
    }
  }
  else {
    console.error(`Message with ID ${messageId} not found.`)
  }
}

const { $api } = useNuxtApp()

const evaluateMessage = async (status: boolean) => {
  const messageId = props.message?.id
  const chatId = props.message?.chatId

  if (!messageId || !chatId) {
    ElNotification({
      title: 'Error Evaluating Message',
      message: 'Message ID or Chat ID is missing.',
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })
    return
  }

  try {
    await $api.chat.PatchEvaluateChatMessage(chatId, messageId, status)

    optimisticEvaluationUpdate(messageId, status)
  }
  catch (err) {
    optimisticEvaluationUpdate(messageId, status)

    ElNotification({
      title: 'Error Evaluating Message',
      message: 'Something went wrong. Please try again later.',
      type: 'error',
      customClass: 'error',
      duration: 2500,
    })

    console.error(err)
  }
}

const handleLike = () => {
  evaluateMessage(true)
}

const handleDislike = () => {
  evaluateMessage(false)
}

const highlightCodeBlocks = () => {
  const codeBlocks = document.querySelectorAll('pre code:not([data-highlighted])')
  codeBlocks.forEach((block) => {
    hljs.highlightElement(block)
    block.setAttribute('data-highlighted', 'yes')
  })
}

watchEffect(() => {
  nextTick(() => {
    highlightCodeBlocks()
  })
})
</script>

<template>
  <div v-if="props.message">
    <div
      class="message"
      :class="[props.message.senderType]"
    >
      <div class="sender">
        <LlmAvatar
          v-if="props.message.senderType === 'assistant'"
          :avatar="agentAvatar"
          :alt="t('agents.agent_avatar')"
          fit="cover"
          default-image="brain"
          :size="32"
        />
        <LlmAvatar
          v-else
          :avatar="authStore.user?.avatar"
          :alt="t('agents.user_avatar')"
          fit="cover"
          default-image="user"
          :size="32"
        />
      </div>
      <template v-if="props.message.senderType === 'assistant' && chatStore.isWebSocketStreaming && !props.message.content">
        <MeetUpLoader class="assistant-message-loader" />
      </template>
      <template v-else-if="isTable && tableData">
        <div class="table-message-container">
          <p v-if="props.message.content.includes('\n\n')">
            {{ props.message.content.split('\n\n')[0] }}
          </p>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th v-for="header in tableData.headers" :key="header">
                    {{ header || '&nbsp;' }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in tableData.body" :key="index">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                    {{ cell || '&nbsp;' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
      <p
        v-else
        :class="{
          usermessage: !isAssistantMessage,
          assistantmessage: isAssistantMessage,
          animating: isAnimating,
        }"
        class="content"
      >
        <span v-html="sanitizedDisplayedContent" />
        <span v-if="isAnimating" class="cursor" />
      </p>
    </div>
    <div v-if="props.message.senderType === 'assistant' && !chatStore.isWebSocketStreaming" class="agent-message-actions">
      <LlmTooltip
        v-if="!isSpeaking"
        :content="$t('chat.quick_action_tooltip.read_aloud')"
      >
        <div
          tabindex="0"
          @click="readText"
          @keyup.enter="readText"
        >
          <MicrophoneIcon
            size="18px"
          />
        </div>
      </LlmTooltip>
      <LlmTooltip
        v-else
        :content="$t('chat.quick_action_tooltip.stop_reading')"
      >
        <div
          tabindex="0"
          @click="stopReading"
          @keyup.enter="stopReading"
        >
          <StopIcon size="18px" />
        </div>
      </LlmTooltip>
      <LlmTooltip :content="$t('chat.quick_action_tooltip.copy_message')">
        <div
          tabindex="0"
          @click="copyItem"
          @keyup.enter="copyItem"
        >
          <CopyIcon size="18px" />
        </div>
      </LlmTooltip>
      <LlmTooltip :content="$t('chat.quick_action_tooltip.good_answer')">
        <div
          v-if="message?.evaluation === null || message?.evaluation === false"
          tabindex="0"
          @click="handleLike"
          @keyup.enter="handleLike"
        >
          <LikeIcon size="18px" />
        </div>
        <div v-else>
          <div
            tabindex="0"
            @click="handleLike"
            @keyup.enter="handleLike"
          >
            <LikeFilledIcon
              v-motion-pop-visible-once
              size="18px"
            />
          </div>
        </div>
      </LlmTooltip>
      <LlmTooltip :content="$t('chat.quick_action_tooltip.bad_answer')">
        <div
          v-if="message?.evaluation === null || message?.evaluation === true"
          tabindex="0"
          @click="handleDislike"
          @keyup.enter="handleDislike"
        >
          <DislikeIcon size="18px" />
        </div>
        <div v-else>
          <div
            tabindex="0"
            @click="handleLike"
            @keyup.enter="handleLike"
          >
            <DislikeFilledIcon v-motion-pop-visible-once size="18px" />
          </div>
        </div>
      </LlmTooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.table-message-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block: 15px;
  overflow: hidden;
}
.table-container {
  overflow-x: auto;
}
:deep(table) {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: var(--font-size-fluid-2);
  overflow-x: auto;
  overflow: auto;
  border-radius: var(--radius-4);
  box-shadow: 0 0 0 1px var(--color-primary-200);
}

:deep(th, td) {
  border: 1px solid var(--color-primary-300);
  padding: 0.75rem 1rem;
  text-align: left;
}

:deep(th) {
  background-color: var(--color-primary-100);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-900);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: var(--font-size-fluid-1);
}

:deep(td) {
  background-color: var(--color-primary-0);
  color: var(--color-primary-800);
  padding-left: 1rem;
}

:deep(tr:nth-child(even) td) {
  background-color: var(--color-primary-subtle);
}

// Round corners for first and last cells in first and last rows
:deep(tr:first-child th:first-child) {
  border-top-left-radius: var(--radius-4);
}

:deep(tr:first-child th:last-child) {
  border-top-right-radius: var(--radius-4);
}

:deep(tr:last-child td:first-child) {
  border-bottom-left-radius: var(--radius-4);
}

:deep(tr:last-child td:last-child) {
  border-bottom-right-radius: var(--radius-4);
}

// Remove double borders
:deep(tr:not(:last-child) th),
:deep(tr:not(:last-child) td) {
  border-bottom: none;
}

:deep(th:not(:last-child)),
:deep(td:not(:last-child)) {
  border-right: 1px solid var(--color-primary-300);
}

// Hover effect
:deep(tr:hover td) {
  background-color: var(--color-primary-100);
}

.message {
  border-radius: 15px;
  display: flex;
  gap: 24px;
  color: var(--color-primary-900);
  max-width: 100%;
}

.sender {
  font-weight: bold;
  min-width: max-content;
  margin-top: 8px;
  color: var(--color-primary-800);
}

.usermessage {
  max-width: max-content;
  background-color: var(--color-primary-100);
  border-radius: 8px;
  position: relative;
}

.agent-message-actions {
  display: flex;
  gap: 8px;
  align-items: center;
  color: var(--color-primary-600);
  padding-left: 2px;
  position: absolute;
  pointer-events: visible;
  & svg {
    &:hover {
      color: var(--color-primary-900);
      cursor: pointer;
    }
  }
}

.assistantmessage {
  width: 100%;
  position: relative;

  pre,
  :deep(pre) {
    background-color: var(--color-primary-100);
    border: 2px solid var(--color-primary-200);
    border-radius: 4px;
    font-family: monospace;
    font-size: var(--font-size-fluid-2);
    overflow-x: auto;

    & .hljs {
      background: var(--color-primary-subtle);
    }
  }

  :deep(a) {
    color: var(--color-blue-600);
    text-decoration: underline;

    &:hover {
      text-decoration: none;
      color: var(--color-blue-300);
    }
  }
  :deep(ol),
  :deep(ul) {
    color: var(--color-primary-900);
    padding-left: 1rem;

    li {
      margin-block: 12px;
    }
  }

  :deep(ul) {
    list-style: circle;

    > li {
      list-style-type: inherit;
    }
  }

  :deep(h1) {
    color: var(--color-primary-900);
    line-height: normal;
    font-size: var(--font-size-fluid-8);
  }
  :deep(h2) {
    color: var(--color-primary-800);
    line-height: normal;
    font-size: var(--font-size-fluid-7);
  }
  :deep(h3) {
    color: var(--color-primary-800);
    line-height: normal;
    font-size: var(--font-size-fluid-6);
  }
  :deep(h4) {
    color: var(--color-primary-800);
    line-height: normal;
    font-size: var(--font-size-fluid-5);
  }
  :deep(h5) {
    color: var(--color-primary-700);
    line-height: normal;
    font-size: var(--font-size-fluid-4);
  }
  :deep(h6) {
    color: var(--color-primary-700);
    line-height: normal;
    font-size: var(--font-size-fluid-3);
  }

  &.content {
    overflow: hidden;
  }
}

.cursor {
  display: inline-block;
  width: 2px;
  height: 1em;
  background-color: currentColor;
  margin-left: 2px;
  animation: blink 0.7s step-end infinite;
}

.user {
  flex-direction: row-reverse;
  word-break: break-word;
}

.content {
  margin: 5px 0;
  padding: 8px;
  font-size: var(--font-size-fluid-3);
  line-height: var(--font-line-height-base);
}

@keyframes blink {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
}

.dark {
  & .table-message-container {
    :deep(table) {
      box-shadow: 0 0 0 1px var(--color-primary-700);
    }

    :deep(th, td) {
      border-color: var(--color-primary-700);
    }

    :deep(th) {
      background-color: var(--color-primary-800);
      color: var(--color-primary-100);
    }

    :deep(td) {
      background-color: var(--color-primary-900);
      color: var(--color-primary-100);
    }

    :deep(tr:nth-child(even) td) {
      background-color: var(--color-primary-800);
    }

    :deep(tr:hover td) {
      background-color: var(--color-primary-700);
    }
  }

  & .usermessage {
    background-color: var(--color-primary-800);
    color: var(--color-primary-0);
  }

  & .sender {
    color: var(--color-primary-100);
  }

  & .content {
    color: var(--color-primary-0);
  }
  & .agent-message-actions {
    color: var(--color-primary-300);
    & svg {
      &:hover {
        color: var(--color-primary-0);
      }
    }
  }

  & .assistantmessage {
    pre,
    :deep(pre) {
      background-color: var(--color-primary-800);
      border: 1px solid var(--color-primary-600);
      & .hljs {
        background: var(--color-primary-900);
      }
    }

    :deep(a) {
      color: var(--color-blue-200);

      &:hover {
        color: var(--color-blue-100);
      }
    }

    :deep(ul),
    :deep(ol) {
      color: var(--color-primary-0);
    }
    :deep(h1) {
      color: var(--color-primary-subtle);
    }
    :deep(h2) {
      color: var(--color-primary-0);
    }
    :deep(h3) {
      color: var(--color-primary-0);
    }
    :deep(h4) {
      color: var(--color-primary-0);
    }
    :deep(h5) {
      color: var(--color-primary-100);
    }
    :deep(h6) {
      color: var(--color-primary-100);
    }
  }
}

.assistant-message-loader {
  margin: auto;
}
</style>
