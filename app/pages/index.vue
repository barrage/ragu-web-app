<script lang="ts" setup>
const chatStore = useChatStore()
const messages = computed(() => chatStore.messages)

onMounted(() => {
  chatStore.messages = []
})
definePageMeta({
  layout: 'default',
})
</script>

<template>
  <ChatPage>
    <template #default>
      <template
        v-if="messages && messages.length > 0"
      >
        <ChatViewWrapper />
      </template>
      <template v-else>
        <NewChatPlaceholder />
      </template>
    </template>
  </ChatPage>
</template>
