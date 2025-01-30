<script lang="ts" setup>
// IMPORTS
import UserIcon from '~/assets/icons/svg/account.svg'
import AgentIcon from '~/assets/icons/svg/chat-agent.svg'
import BrainIcon from '~/assets/icons/svg/brain.svg'
import EditIcon from '~/assets/icons/svg/edit-user.svg'

// PROPS
interface Avatar {
  contentType?: string
  data?: string
}

interface Props {
  size?: number | 'large' | 'default' | 'small'
  avatar?: Avatar | null
  alt?: string
  fit?: 'fill' | 'contain' | 'cover' | 'none' | 'scale-down'
  defaultImage?: 'user' | 'agent' | 'brain'
  editable?: boolean
}

const {
  size = 'default',
  avatar = {} as Avatar,
  alt = 'Avatar',
  fit = 'cover',
  defaultImage = 'user',
  editable = false,
} = defineProps<Props>()

const emits = defineEmits<{
  (e: 'edit'): void
}>()

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

const DefaultIcon = computed(() => {
  switch (defaultImage) {
    case 'agent':
      return AgentIcon
    case 'brain':
      return BrainIcon
    case 'user':
    default:
      return UserIcon
  }
})
</script>

<template>
  <div
    class="avatar-wrapper"
    :class="{ 'is-editable': editable }"
    :style="{ width: avatarSize, height: avatarSize }"
  >
    <div class="avatar">
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
    <button
      v-if="editable"
      class="edit-button"
      @click="emits('edit')"
    >
      <EditIcon size="100%" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.avatar-wrapper {
  position: relative;
  display: inline-block;
  border-radius: 50%;

  &.is-editable {
    cursor: pointer;

    &:hover {
      .edit-button {
        opacity: 1;
        transform: translateY(0);
      }

      .avatar::after {
        opacity: 1;
      }
    }
  }
}

.avatar {
  width: 100%;
  height: 100%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  overflow: hidden;
  flex-shrink: 0;
  background-color: var(--color-primary-200);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.3);
    opacity: 0;
    transition: opacity 0.2s ease-in-out;
  }

  img {
    width: 100%;
    height: 100%;
  }
}

.edit-button {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%) translateY(20px);
  background: var(--color-primary-600);
  border: 2px solid var(--color-primary-0);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.2s ease-in-out;
  color: var(--color-primary-0);
  cursor: pointer;

  &:hover {
    background: var(--color-primary-700);
  }
}

.dark {
  .avatar {
    background-color: var(--color-primary-700);
  }

  .edit-button {
    background: var(--color-primary-400);
    border-color: var(--color-primary-800);
    color: var(--color-primary-900);

    &:hover {
      background: var(--color-primary-500);
    }
  }
}
</style>
