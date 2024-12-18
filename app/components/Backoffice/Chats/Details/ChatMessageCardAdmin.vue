<script lang="ts" setup>
import { marked } from 'marked'
import hljs from 'highlight.js'
import { useI18n } from 'vue-i18n'
import ProfileIcon from '~/assets/icons/svg/account.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import { sanitizeHtml } from '~/utils/sanitizeHtml'
import type { Message } from '~/types/chat'

const props = defineProps<{
  message: Message
}>()

const { t } = useI18n()

const relativeCreatedDate = ref(props.message?.createdAt ? useRelativeDate(props.message.createdAt) : '-')

const chatStore = useChatStore()
const selectedAgent = computed(() => {
  return chatStore.selectedBoChatDetails?.agent || null
})
const selectedUser = computed(() => {
  return chatStore.selectedBoChatDetails?.user || null
})

const messageData = computed(() => {
  const rawContent = props.message.content || ''
  const formattedContent = rawContent.replace(/\n/g, '<br>')
  const sanitizedContent = sanitizeHtml(formattedContent)

  return {
    senderType: props.message?.senderType === 'user' ? t('chat.user') : t('chat.assistant'),
    iconType: props.message?.senderType === 'user' ? 'user' : 'assistant',
    createdAt: props.message.createdAt ? formatDate(props.message.createdAt, 'dddd, MMMM D, YYYY h:mm A') : '-',
    createdAtRealtiveTime: relativeCreatedDate.value,
    content: sanitizedContent,
    sender: props.message?.senderType === 'user' ? selectedUser.value?.fullName : selectedAgent.value?.name,
  }
})

const formatContent = (content: string) => {
  if (!content) { return '' }
  const rawHtml = marked(content)
  return sanitizeHtml(rawHtml)
}
const sanitizedDisplayedContent = computed(() => formatContent(props.message.content))

marked.setOptions({
  breaks: true,
  gfm: true,
  highlight(code, lang) {
    try {
      if (lang && hljs.getLanguage(lang)) {
        return hljs.highlight(code, { language: lang }).value
      }
      return hljs.highlightAuto(code).value
    }
    catch (error) {
      console.error('Highlight.js error:', error)
      return code
    }
  },
})
const isDark = useDark()
const loadHighlightTheme = (isDarkMode: boolean) => {
  const themeLinkId = 'highlight-theme'
  let themeLink = document.getElementById(themeLinkId) as HTMLLinkElement | null

  if (!themeLink) {
    themeLink = document.createElement('link')
    themeLink.id = themeLinkId
    themeLink.rel = 'stylesheet'
    document.head.appendChild(themeLink)
  }
  themeLink.href = isDarkMode
    ? 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-dark.min.css'
    : 'https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.8.0/styles/atom-one-light.min.css'
}

watch(isDark, (newVal) => {
  loadHighlightTheme(newVal)
}, { immediate: true })

const highlightCodeBlocks = () => {
  const codeBlocks = document.querySelectorAll('pre code:not([data-highlighted])')
  codeBlocks.forEach((block) => {
    hljs.highlightElement(block)
    block.setAttribute('data-highlighted', 'yes')
  })
}

watchEffect(() => {
  nextTick(() => {
    highlightCodeBlocks()
  })
})
</script>

<template>
  <div>
    <div class="message-card">
      <LlmLink
        :to="message?.senderType === 'user' ? `/admin/users/${message?.sender}` : `/admin/agents/${message?.sender}`"
        class="message-profile-item"
      >
        <ProfileIcon v-if="messageData.iconType === 'user'" size="36px" />
        <BrainIcon v-else-if="messageData.iconType === 'assistant'" size="36px" />
        <div class="messagename-mail-wrapper">
          <p class="messagename">
            {{ `${messageData.sender}` }}
          </p>
          <span class="message-mail">{{ messageData.createdAt }}</span>
        </div>
      </LlmLink>
      <div class="message-content" v-html="sanitizedDisplayedContent" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.message-card {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 22px;
  border: 0.5px solid var(--color-primary-300);
  background: var(--color-primary-0);
  box-shadow: 0 0.2rem 0.3rem var(--color-primary-100);
  border-radius: 16px;
  padding: 1rem;

  & .message-content {
    width: 100%;
    margin-right: 1.5rem;
    background: var(--color-primary-100);
    padding: 22px;
    border-radius: 10px;
    white-space: pre-wrap;

    pre,
    :deep(pre) {
      background-color: var(--color-primary-100);
      border: 2px solid var(--color-primary-200);
      border-radius: 4px;
      font-family: monospace;
      font-size: var(--font-size-fluid-2);
      overflow-x: auto;

      & .hljs {
        background: var(--color-primary-subtle);
      }
    }

    :deep(a) {
      color: var(--color-blue-600);
      text-decoration: underline;

      &:hover {
        text-decoration: none;
        color: var(--color-blue-300);
      }
    }
    :deep(ol),
    :deep(ul) {
      color: var(--color-primary-900);

      li {
        margin-block: 12px;
      }
    }

    :deep(ul) {
      list-style: circle inside;

      > li {
        list-style-type: inherit;
      }
    }

    :deep(h1) {
      color: var(--color-primary-900);
      line-height: normal;
      font-size: var(--font-size-fluid-8);
    }
    :deep(h2) {
      color: var(--color-primary-800);
      line-height: normal;
      font-size: var(--font-size-fluid-7);
    }
    :deep(h3) {
      color: var(--color-primary-800);
      line-height: normal;
      font-size: var(--font-size-fluid-6);
    }
    :deep(h4) {
      color: var(--color-primary-800);
      line-height: normal;
      font-size: var(--font-size-fluid-5);
    }
    :deep(h5) {
      color: var(--color-primary-700);
      line-height: normal;
      font-size: var(--font-size-fluid-4);
    }
    :deep(h6) {
      color: var(--color-primary-700);
      line-height: normal;
      font-size: var(--font-size-fluid-3);
    }

    &.content {
      overflow: hidden;
    }
  }
}

.message-actions {
  display: flex;
  gap: 12px;
  justify-self: flex-end;

  & .delete-action {
    margin-left: 2rem;
  }
}

.message-profile-item {
  display: flex;
  gap: 0.5rem;
  align-items: center;
  justify-content: flex-start;
  margin-right: 1rem;
  text-overflow: ellipsis;
  flex: 0 0 calc(30% - 22px);
  color: var(--color-primary-900);

  &:hover {
    opacity: 0.8;
    cursor: pointer;
  }
}

.messagename-mail-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  & .messagename {
    margin: 0;
    font-size: var(--font-size-fluid-2);
    line-height: normal;
    font-weight: var(--font-weight-bold);
    color: var(--color-primary-900);
  }
  & .message-mail {
    margin: 0;
    line-height: normal;
    font-size: var(--font-size-fluid-1);
    color: var(--color-primary-800);
  }
}

.dark {
  .message-card {
    border: 0.5px solid var(--color-primary-700);
    background: var(--color-primary-900);
    box-shadow: 0 0.2rem 0.3rem var(--color-primary-800);
  }
  .messagename-title-wrapper {
    color: var(--color-primary-0);
    & .messagename {
      color: var(--color-primary-0);
    }
  }
  .message-content {
    background: var(--color-primary-800);
    pre,
    :deep(pre) {
      background-color: var(--color-primary-800);
      border: 1px solid var(--color-primary-600);
      & .hljs {
        background: var(--color-primary-900);
      }
    }

    :deep(a) {
      color: var(--color-blue-200);

      &:hover {
        color: var(--color-blue-100);
      }
    }

    :deep(ul),
    :deep(ol) {
      color: var(--color-primary-0);
    }
    :deep(h1) {
      color: var(--color-primary-subtle);
    }
    :deep(h2) {
      color: var(--color-primary-0);
    }
    :deep(h3) {
      color: var(--color-primary-0);
    }
    :deep(h4) {
      color: var(--color-primary-0);
    }
    :deep(h5) {
      color: var(--color-primary-100);
    }
    :deep(h6) {
      color: var(--color-primary-100);
    }
  }
  .message-profile-item {
    color: var(--color-primary-0);
  }
  .messagename-mail-wrapper {
    & .messagename {
      color: var(--color-primary-0);
    }
    & .message-mail {
      color: var(--color-primary-100);
    }
  }
}
</style>
