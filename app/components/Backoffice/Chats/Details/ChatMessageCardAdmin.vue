<script lang="ts" setup>
import { marked } from 'marked'
import hljs from 'highlight.js'
import { useI18n } from 'vue-i18n'
import { sanitizeHtml } from '~/utils/sanitizeHtml'
import type { Message } from '~/types/chat'

const props = defineProps<{
  message: Message
  userName: string
}>()

const { t } = useI18n()
const relativeCreatedDate = ref(props.message?.createdAt ? useRelativeDate(props.message.createdAt) : '-')
const isAssistantMessage = computed(() => props.message?.senderType === 'assistant')

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
    sender: props.message?.senderType === 'user' ? props.userName : selectedAgent.value?.name,
  }
})

const formatContent = (content: string, isAssistantMessage: boolean) => {
  if (!content) { return '' }

  let rawHtml

  if (isAssistantMessage) {
    rawHtml = marked(content)
  }
  else {
    const escapedContent = content.replace(/[-_*~`>#+=|.!]/g, '\\$&')
    rawHtml = marked(escapedContent)
  }

  return sanitizeHtml(rawHtml)
}

const sanitizedDisplayedContent = computed(() => formatContent(props.message.content, isAssistantMessage.value))

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

const isTable = computed(() => {
  if (!props.message?.content) {
    return false
  }
  const lines = props.message.content.split('\n')
  const tableStartIndex = lines.findIndex(line => line.trim().startsWith('|'))
  const isTableContent = tableStartIndex !== -1 && lines.slice(tableStartIndex).some(line => line.includes('|'))

  return isTableContent
})

const tableData = computed(() => {
  if (!isTable.value || !props.message?.content) {
    return null
  }

  const lines = props.message.content.split('\n')
  const tableStartIndex = lines.findIndex(line => line.trim().startsWith('|'))
  if (tableStartIndex === -1) {
    return null
  }

  const tableLines = lines.slice(tableStartIndex)
  const headers = tableLines[0]?.split('|').filter(cell => cell.trim()).map(cell => cell.trim())
  const body = tableLines.slice(2)
    .filter(line => line.includes('|') && !line.replace(/\|/g, '').trim().match(/^[-\s]+$/))
    .map(row => row.split('|').filter(cell => cell.trim()).map(cell => cell.trim()))

  const result = { headers, body }

  return result
})
</script>

<template>
  <div>
    <div class="message-card">
      <LlmLink
        :to="message?.senderType === 'user' ? `${useRuntimeConfig().public.userEndpointBase}/${selectedUser?.id}` : `/admin/agents/${selectedAgent?.id}`"
        class="message-profile-item"
      >
        <LlmAvatar
          v-if="messageData.iconType === 'user'"
          :avatar="selectedUser?.avatar"
          :alt="t('agents.user_avatar')"
          fit="cover"
          default-image="user"
          :size="36"
        />

        <LlmAvatar
          v-else-if="messageData.iconType === 'assistant'"
          :avatar="selectedAgent?.avatar"
          :alt="t('agents.agent_avatar')"
          fit="cover"
          default-image="brain"
          :size="36"
        />

        <div class="messagename-mail-wrapper">
          <p class="messagename">
            {{ `${messageData.sender}` }}
          </p>
          <span class="message-mail">{{ messageData.createdAt }}</span>
        </div>
      </LlmLink>
      <template v-if="isTable && tableData">
        <div class="table-message-container">
          <p v-if="props.message.content.includes('\n\n')">
            {{ props.message.content.split('\n\n')[0] }}
          </p>
          <div class="table-container">
            <table>
              <thead>
                <tr>
                  <th v-for="header in tableData.headers" :key="header">
                    {{ header || '&nbsp;' }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(row, index) in tableData.body" :key="index">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex">
                    {{ cell || '&nbsp;' }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </template>
      <div
        v-else
        class="message-content"
        v-html="sanitizedDisplayedContent"
      />
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
      padding-left: 1rem;

      li {
        margin-block: 12px;
      }
    }

    :deep(ul) {
      list-style: circle;

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
.table-message-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-block: 15px;
  overflow: hidden;
}
.table-container {
  overflow-x: auto;
}
:deep(table) {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  font-size: var(--font-size-fluid-2);
  overflow-x: auto;
  overflow: auto;
  border-radius: var(--radius-4);
  box-shadow: 0 0 0 1px var(--color-primary-200);
}

:deep(th, td) {
  border: 1px solid var(--color-primary-300);
  padding: 0.75rem 1rem;
  text-align: left;
}

:deep(th) {
  background-color: var(--color-primary-100);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-900);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-size: var(--font-size-fluid-1);
}

:deep(td) {
  background-color: var(--color-primary-0);
  color: var(--color-primary-800);
  padding-left: 1rem;
}

:deep(tr:nth-child(even) td) {
  background-color: var(--color-primary-subtle);
}

// Round corners for first and last cells in first and last rows
:deep(tr:first-child th:first-child) {
  border-top-left-radius: var(--radius-4);
}

:deep(tr:first-child th:last-child) {
  border-top-right-radius: var(--radius-4);
}

:deep(tr:last-child td:first-child) {
  border-bottom-left-radius: var(--radius-4);
}

:deep(tr:last-child td:last-child) {
  border-bottom-right-radius: var(--radius-4);
}

// Remove double borders
:deep(tr:not(:last-child) th),
:deep(tr:not(:last-child) td) {
  border-bottom: none;
}

:deep(th:not(:last-child)),
:deep(td:not(:last-child)) {
  border-right: 1px solid var(--color-primary-300);
}

// Hover effect
:deep(tr:hover td) {
  background-color: var(--color-primary-100);
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
    font-weight: var(--font-weight-semibold);
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
  & .table-message-container {
    :deep(table) {
      box-shadow: 0 0 0 1px var(--color-primary-700);
    }

    :deep(th, td) {
      border-color: var(--color-primary-700);
    }

    :deep(th) {
      background-color: var(--color-primary-800);
      color: var(--color-primary-100);
    }

    :deep(td) {
      background-color: var(--color-primary-900);
      color: var(--color-primary-100);
    }

    :deep(tr:nth-child(even) td) {
      background-color: var(--color-primary-800);
    }

    :deep(tr:hover td) {
      background-color: var(--color-primary-700);
    }
  }
}
</style>
