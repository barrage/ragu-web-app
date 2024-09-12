<script setup lang="ts">
import { defineProps } from 'vue'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import ProfileIcon from '~/assets/icons/svg/account.svg'
import type { Message } from '~/types/chat'

const props = defineProps<{
  message: Message | null
}>()

const chatStore = useChatStore()
</script>

<template>
  <template v-if="props.message">
    <div

      class="message"
      :class="[props.message.senderType]"
    >
      <div class="sender">
        <BrainIcon v-if="props.message.senderType === 'assistant'" size="32" />
        <ProfileIcon v-else size="32" />
      </div>
      <template v-if="props.message.senderType === 'assistant' && chatStore.isWebSocketStreaming && !(props.message.content)">
        <LlmLoader class="assistant-message-loader" />
      </template>

      <p
        v-else
        :class="{ usermessage: props.message.senderType === 'user', assistantmessage: props.message.senderType === 'assistant' }"
        class="content"
      >
        {{ props.message.content }}
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
  &::after {
    content: '';
    position: absolute;
    bottom: 16;
    right: 0;
    height: 18px;
    border-radius: 50%;
    width: 18px;
    background: var(--color-primary-900);
    /* animation: blink 1s step-end infinite; */
  }
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
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0; // Make the cursor disappear halfway through the cycle
  }
  100% {
    opacity: 1;
  }
}
</style>
