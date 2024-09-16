<script setup lang="ts">
import BrainIcon from '~/assets/icons/svg/brain.svg'
import ProfileIcon from '~/assets/icons/svg/account.svg'

import type { Message } from '~/types/chat'

const props = defineProps<{
  message: Message | null
}>()

const chatStore = useChatStore()
const isAssistantMessage = computed(() => props.message?.senderType === 'assistant')
const displayedContent = ref('')
const pendingContent = ref('')
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
      pendingContent.value += newContent.slice(oldContent.length)

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

onBeforeUnmount(() => {
  if (animationTimeout) {
    clearTimeout(animationTimeout)
  }
})
</script>

<template>
  <template v-if="props.message">
    <div class="message" :class="[props.message.senderType]">
      <div class="sender">
        <BrainIcon v-if="props.message.senderType === 'assistant'" size="32" />
        <ProfileIcon v-else size="32" />
      </div>
      <template v-if="props.message.senderType === 'assistant' && chatStore.isWebSocketStreaming && !props.message.content">
        <LlmLoader class="assistant-message-loader" />
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
        {{ displayedContent }}
        <span v-if="isAnimating" class="cursor" />
      </p>
    </div>
  </template>
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
  background-color: var(--color-primary-100);
  border-radius: 8px;
}

.assistantmessage {
  max-width: max-content;
  position: relative;

  & span {
    opacity: 0;
    animation: fadeInChar 0.5s forwards;
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
}

.content {
  margin: 5px 0;
  padding: 8px;
  font-size: var(--font-size-fluid-3);
  line-height: var(--font-line-height-base);
}

@keyframes fadeInChar {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
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
}

.assistant-message-loader {
  margin: auto;
}
</style>
