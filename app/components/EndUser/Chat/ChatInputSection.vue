<script lang="ts" setup>
import ArrowUpIcon from '~/assets/icons/svg/arrow-up.svg'
import StopStreamIcon from '~/assets/icons/svg/stop-stream.svg'

defineProps<{
  // Whether to show the input at all
  show: boolean

  // Whether to disable the input and button
  disabled: boolean

  // Whether to show the stop stream button
  streaming: boolean
}>()

const emit = defineEmits<{
  (e: 'sendMessage', message: string): void
  (e: 'stopStream'): void
}>()

const chatStore = useChatStore()
const message = ref('')
const textareaRef = ref<HTMLTextAreaElement | null>(null)

const resetTextareaHeight = () => {
  if (textareaRef.value) {
    textareaRef.value.style.height = '62px'

    textareaRef.value.style.overflow = 'hidden'
    void textareaRef.value.offsetHeight
    textareaRef.value.style.overflow = 'auto'
  }
}

const sendMessage = () => {
  if (!message.value.trim()) {
    return
  }

  emit('sendMessage', message.value)

  message.value = ''

  resetTextareaHeight()
}

const stopStream = () => {
  emit('stopStream')
}

const autoResize = (e: Event) => {
  const textarea = e.target as HTMLTextAreaElement
  textarea.style.height = 'auto'
  textarea.style.height = `${Math.min(textarea.scrollHeight, 115)}px`
}

const handleEnterKey = (e: KeyboardEvent) => {
  if (e.shiftKey) {
    return
  }
  e.preventDefault()
  sendMessage()
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
    <div v-else-if="show" class="input-button-wrapper">
      <div class="textarea-container">
        <textarea
          ref="textareaRef"
          v-model="message"
          class="barrage-chat-input"
          :placeholder="$t('chat.chatInputPlaceholder')"
          :disabled="disabled"
          rows="1"
          @keydown.enter="handleEnterKey"
          @input="autoResize"
        />
        <div
          v-motion-slide-bottom
          class="input-suffix-wrapper"
          :delay="1100"
          :class="{
            'input-suffix-wrapper--active': message.length || streaming,
          }"
        >
          <StopStreamIcon
            v-if="streaming"
            size="32px"
            tabindex="0"
            @click="stopStream"
            @keyup.enter="stopStream"
          />
          <ArrowUpIcon
            v-else-if="!disabled"
            :tabindex="message.length ? 0 : -1"
            size="32px"
            @click="sendMessage"
            @keyup.enter="sendMessage"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.chat-input-section {
  width: 100%;
  background: transparent;
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  & .input-button-wrapper {
    display: flex;
    align-items: center;
    width: 100%;
    gap: 6px;
    max-width: 768px;
    max-height: 62px;
  }
  .textarea-container {
    position: relative;
    width: 100%;
    max-width: 768px;
    display: flex;
    align-items: flex-end;

    .barrage-chat-input {
      width: 100%;
      min-height: 62px;
      height: 62px;
      max-height: 115px;
      padding: 14px 56px 14px 16px;
      outline: none;
      border: none;
      border-radius: 8px;
      background-color: var(--color-primary-100);
      resize: none;
      outline: none;
      font-family: inherit;
      font-size: var(--font-size-fluid-3);
      line-height: 1.5;
      overflow-y: auto;

      &:disabled {
        background-color: var(--color-primary-200);
        cursor: not-allowed;
      }

      &:focus {
        outline: 1px solid var(--color-primary-300);
        border-color: var(--color-primary-500);
      }

      &::placeholder {
        font-size: var(--font-size-fluid-3);
        color: var(--color-primary-400);
      }
    }

    .input-suffix-wrapper {
      position: absolute;
      right: 15px;
      bottom: 10px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 20%;
      width: 40px;
      height: 40px;
      color: var(--color-primary-300);
      border: var(--border-size-1) var(--border-type-solid)
        var(--color-primary-300);
      background-color: var(--color-primary-100);

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

.inactive-agent-card {
  width: fit-content;
  height: fit-content;
}

html.dark {
  .chat-input-section {
    .textarea-container {
      .barrage-chat-input {
        background-color: var(--color-primary-800);
        color: var(--color-primary-100);

        &:disabled {
          background-color: var(--color-primary-700);
        }
      }

      .input-suffix-wrapper {
        background-color: var(--color-primary-800);
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
</style>
