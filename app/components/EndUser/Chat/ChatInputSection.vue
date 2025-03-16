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

const emit = defineEmits <{
  (e: 'sendMessage', message: string): void
  (e: 'stopStream'): void
}>()

const chatStore = useChatStore()
const message = ref('')

const sendMessage = () => {
  if (!message.value.trim()) {
    return
  }

  emit('sendMessage', message.value)

  message.value = ''
}

const stopStream = () => {
  emit('stopStream')
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
      <ElInput
        v-model="message"
        v-motion-slide-bottom
        :delay="1100"
        size="large"
        :placeholder="$t('chat.chatInputPlaceholder')"
        class="barrage-chat-input"
        :disabled="disabled"
        @keyup.enter="sendMessage"
      >
        <template #suffix>
          <div
            class="input-suffix-wrapper"
            :class="{
              'input-suffix-wrapper--active':
                message.length || streaming,
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
        </template>
      </ElInput>
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
