<script setup lang="ts">
import DocumentIcon from '~/assets/icons/svg/document.svg'
import ChatIcon from '~/assets/icons/svg/chat-icon.svg'
import ArrowLeftIcon from '~/assets/icons/svg/arrow-left.svg'
import RocketIcon from '~/assets/icons/svg/rocket.svg'
import UserIcon from '~/assets/icons/svg/team.svg'
import AgentIcon from '~/assets/icons/svg/agents.svg'
import CollectionIcon from '~/assets/icons/svg/folder-icon.svg'
import QuestionIcon from '~/assets/icons/svg/question.svg'
import ChatBubbleIcon from '~/assets/icons/svg/chat-multiple.svg'
import GetHelpCard from '~/components/EndUser/GetHelpCard.vue'

definePageMeta({
  layout: 'get-help-layout',
})

const route = useRoute()
const { t } = useI18n()

const docsUrl = useRuntimeConfig().public.docsUrl

const backNavigation = computed(() => {
  const referrer = route.query.from as string

  return referrer === 'user'
    ? {
        path: '/',
        label: t('app.title'),
      }
    : {
        path: '/admin',
        label: t('admin.title'),
      }
})

const helpCards = computed(() => [
  {
    icon: QuestionIcon,
    title: t('help.whatWeDo.title'),
    description: t('help.whatWeDo.description'),
  },
  {
    icon: RocketIcon,
    title: t('help.gettingStarted.title'),
    description: t('help.gettingStarted.description'),
  },
  {
    icon: ChatIcon,
    title: t('help.howChatWorks.title'),
    description: t('help.howChatWorks.description'),
  },
  {
    icon: UserIcon,
    title: t('help.users.title'),
    description: t('help.users.description'),
  },
  {
    icon: DocumentIcon,
    title: t('help.documents.title'),
    description: t('help.documents.description'),
  },
  {
    icon: AgentIcon,
    title: t('help.agents.title'),
    description: t('help.agents.description'),
  },
  {
    icon: CollectionIcon,
    title: t('help.collections.title'),

    description: t('help.collections.description'),
  },
  {
    icon: ChatBubbleIcon,
    title: t('help.chats.title'),
    description: t('help.chats.description'),
  },
])
</script>

<template>
  <LlmLink
    v-motion-slide-right
    :to="backNavigation.path"
    type="link"
    class="back-button"
  >
    <ArrowLeftIcon size="20px" />
    {{ t('common.backTo', { page: backNavigation.label }) }}
  </LlmLink>
  <div v-motion-slide-bottom class="page-header">
    <h1 class="title">
      {{ t('help.title') }}
    </h1>
    <p class="subtitle">
      {{ t('help.subtitle') }}
      <LlmLink
        :to="docsUrl"
        type="link"
      >
        {{ t('help.full_documentation') }}
      </LlmLink>
    </p>
  </div>

  <GetHelpCard
    v-for="(card, index) in helpCards"
    :key="index"
    v-motion-slide-bottom
    :delay="200 * (index + 1)"
    :icon="card.icon"
    :title="card.title"
    :description="card.description"
  />
</template>

<style lang="scss" scoped>
.back-button {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  grid-column: 1 / -1;

  &:hover {
    color: var(--color-primary-700);
  }
}

.page-header {
  text-align: center;
  margin-bottom: 2rem;
  grid-column: 1 / -1;
  width: 100%;

  .title {
    color: var(--color-primary-900);
    margin-bottom: 2rem;
    font-size: var(--font-size-fluid-8);
  }

  .subtitle {
    color: var(--color-primary-700);
    font-size: var(--font-size-fluid-3);
  }

  a {
    text-decoration: underline;
  }
}

html.dark {
  .page-header {
    .title {
      color: var(--color-primary-0);
    }

    .subtitle {
      color: var(--color-primary-100);
    }
  }
  .back-button {
    &:hover {
      color: var(--color-primary-200);
    }
  }
}
</style>
