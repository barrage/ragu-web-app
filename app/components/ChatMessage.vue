<script setup lang="ts">
import { defineProps } from 'vue'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import ProfileIcon from '~/assets/icons/svg/account.svg'
import type { Message } from '~/types/chat'

const props = defineProps<{
  message: Message | null
}>()
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
      <p :class="{ usermessage: props.message.senderType === 'user' }" class="content">
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

.message.assistant {
  background-color: transparent;
}

.message.user {
  /*   background-color: var(--color-primary-100); */
}

.sender {
  font-weight: bold;
  min-width: max-content;
  margin-top: 8px;
  color: var(--color-primary-800);
}

.usermessage {
  background-color: var(--color-primary-100);
  padding: 8px;
  border-radius: 8px;
}

.content {
  margin: 5px 0;
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
</style>
