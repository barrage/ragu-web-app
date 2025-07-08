<script lang="ts" setup>
import { useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

onMounted(() => {
  if (!route?.params?.chatId) {
    router.push('/')
  }
})
</script>

<template>
  <ChatPage>
    <template #default>
      <ChatViewWrapper />
    </template>
  </ChatPage>
</template>
