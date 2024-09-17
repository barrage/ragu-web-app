<script lang="ts" setup>
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import { useScroll } from '@vueuse/core'

const chatViewWrapper = ref<HTMLElement | null>(null)

const smooth = ref<boolean>(true)
const behavior = computed<'smooth' | 'auto'>(() => (smooth.value ? 'smooth' : 'auto'))

const { y } = useScroll(chatViewWrapper, { behavior })

const displayY = computed<number>({
  get() {
    return Number(y.value)
  },
  set(val: number) {
    y.value = val
  },
})

const scrollToBottom = async () => {
  await nextTick()

  setTimeout(() => {
    if (chatViewWrapper.value) {
      const scrollHeight = chatViewWrapper.value.scrollHeight
      chatViewWrapper.value.scrollTo({
        top: scrollHeight,
        behavior: behavior.value,
      })
    }
  }, 100)
}

const chatStore = useChatStore()
const messages = computed(() => chatStore.messages)

watch(
  messages,
  () => {
    scrollToBottom()
  },
  { immediate: true, deep: true },
)
onMounted(() => {
  scrollToBottom()
})
</script>

<template>
  <div class="chat-page">
    <div
      ref="chatViewWrapper"
      class="chat-page-content"
      :class="{ chat_title_small: displayY >= 30 }"
    >
      <slot name="default" />
    </div>
    <div class="chat-page-footer">
      <ChatInputSection />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-page {
  display: flex;
  flex-direction: column;
  height: 100%;

  & .chat-page-content {
    flex: 1 0 calc(90%);
    overflow-y: auto;
    overflow-x: hidden;
    max-height: 100%;
  }

  & .chat-page-footer {
    flex: 1 0 calc(10%);
  }
}

.loading,
.error {
  text-align: center;
  margin: 20px 0;
}
</style>
