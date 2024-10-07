<script lang="ts" setup>
const chatStore = useChatStore()
const messages = computed(() => {
  return [...(chatStore.messages || [])].reverse()
})

const selectedChat = computed(() => {
  return chatStore.selectedChat
})
</script>

<template>
  <div
    class="chat-view-wrapper"
  >
    <div class="chat-wrapper">
      <Chat :chat="selectedChat" :messages="messages" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.chat-view-wrapper {
  max-height: 100%;
  & .chat-wrapper {
    height: 100%;
    max-width: 48rem;
    margin-inline: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    background: transparent;
    position: relative;
  }
}
</style>
