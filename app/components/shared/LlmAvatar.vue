<script lang="ts" setup>
// IMPORTS
import UserIcon from '~/assets/icons/svg/account.svg'
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'

// PROPS
interface Avatar {
  contentType?: string
  data?: string
}

interface Props {
  size?: number | 'large' | 'default' | 'small'
  avatar?: Avatar
  alt?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  defaultImage?: 'user' | 'agent'
}

const {
  size = 'default',
  avatar = {} as Avatar,
  alt = 'Avatar',
  fit = 'cover',
  defaultImage = 'user',
} = defineProps<Props>()

// STATES

const sizeMap = {
  large: 66,
  default: 40,
  small: 22,
}

// COMPUTEDS

const avatarSize = computed(() => {
  if (typeof size === 'number') {
    return `${size}px`
  }
  return `${sizeMap[size]}px`
})

const avatarSrc = computed(() => {
  if (avatar && avatar.contentType && avatar.data) {
    return `data:${avatar.contentType};base64,${avatar.data}`
  }

  return ''
})

const showImage = computed(() => Boolean(avatarSrc.value))

const DefaultIcon = computed(() => defaultImage === 'user' ? UserIcon : AgentIcon)
</script>

<template>
  <div class="avatar" :style="{ width: avatarSize, height: avatarSize }">
    <img
      v-if="showImage"
      :src="avatarSrc"
      :alt="alt"
      :style="{ objectFit: fit }"
    >
    <component
      :is="DefaultIcon"
      v-else
      :size="avatarSize"
    />
  </div>
</template>

<style lang="scss" scoped>
.avatar {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
  }
}

.dark {
  .avatar {
    background-color: var(--color-primary-700);
  }
}
</style>
