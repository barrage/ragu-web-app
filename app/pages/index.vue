<script lang="ts" setup>
const messages = ref([])
</script>

<template>
  <ChatPage>
    <template #default>
      <template v-if="messages.length > 0">
        <ChatViewWrapper />
      </template>
      <template v-else>
        <NewChatPlaceholder />
      </template>
    </template>
  </ChatPage>
</template>
