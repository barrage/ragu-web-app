<script lang="ts" setup>
const chatStore = useChatStore()

definePageMeta({
  layout: 'default',
})
</script>

<template>
  <ChatPage>
    <template #default>
      <!-- Use message length to determine which component to load.
      The index page should theoretically never be loaded while the store has messages.
      As soon as a message is sent, the store's messages will contain items, which means we
      will temporarily load the ChatViewWrapper component until the response is completed
      and we redirect to the chat page. -->
      <template v-if="chatStore.messages?.length">
        <ChatViewWrapper />
      </template>
      <template v-else>
        <NewChatPlaceholder />
      </template>
    </template>
  </ChatPage>
</template>
