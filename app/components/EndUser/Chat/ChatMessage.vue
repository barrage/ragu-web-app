<script setup lang="ts">
import BrainIcon from '~/assets/icons/svg/brain.svg'
import ProfileIcon from '~/assets/icons/svg/account.svg'
import MicrophoneIcon from '~/assets/icons/svg/microphone.svg'
import LikeIcon from '~/assets/icons/svg/like.svg'
import DislikeIcon from '~/assets/icons/svg/dislike.svg'
import CopyIcon from '~/assets/icons/svg/copy.svg'
import StopIcon from '~/assets/icons/svg/stop.svg'
import { sanitizeHtml } from '~/utils/sanitizeHtml'
import type { Message } from '~/types/chat'

const props = defineProps<{
  message: Message | null
}>()

const { t } = useI18n()

const chatStore = useChatStore()
const isAssistantMessage = computed(() => props.message?.senderType === 'assistant')
const displayedContent = ref('')
const pendingContent = ref('')
const sanitizedContent = computed(() => {
  return props.message?.content ? sanitizeHtml(props.message.content.replace(/\n/g, '<br>')) : ''
})

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
  () => sanitizedContent.value,
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
</script>

<template>
  <div v-if="props.message">
    <div

      class="message"
      :class="[props.message.senderType]"
    >
      <div class="sender">
        <BrainIcon
          v-if="props.message.senderType === 'assistant'"
          size="32px"
        />
        <ProfileIcon v-else size="32px" />
      </div>
      <template v-if="props.message.senderType === 'assistant' && chatStore.isWebSocketStreaming && !props.message.content">
        <MeetUpLoader class="assistant-message-loader" />
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
        <span v-html="displayedContent" />
        <span v-if="isAnimating" class="cursor" />
      </p>
    </div>
    <div v-if="props.message.senderType === 'assistant' && !chatStore.isWebSocketStreaming" class="agent-message-actions">
      <ElTooltip
        v-if="!isSpeaking"
        content="Read aloud"
        :show-after="50"
        :enterable="false"
        placement="top"
      >
        <MicrophoneIcon size="18px" @click="readText" />
      </ElTooltip>
      <ElTooltip
        v-else
        content="Stop reading"
        :show-after="50"
        :enterable="false"
        placement="top"
      >
        <StopIcon size="18px" @click="stopReading" />
      </ElTooltip>
      <ElTooltip
        content="Copy message"
        :show-after="50"
        :enterable="false"
        placement="top"
      >
        <CopyIcon size="18px" @click="copyItem()" />
      </ElTooltip>
      <ElTooltip
        content="Good answer"
        :show-after="50"
        :enterable="false"
        placement="top"
      >
        <LikeIcon size="18px" />
      </ElTooltip>
      <ElTooltip
        content="Bad answer"
        :show-after="50"
        :enterable="false"
        placement="top"
      >
        <DislikeIcon size="18px" />
      </ElTooltip>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message {
  border-radius: 15px;
  display: flex;
  gap: 24px;
  color: var(--color-primary-900);
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
  max-width: max-content;
  position: relative;
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
}

.assistant-message-loader {
  margin: auto;
}
</style>
