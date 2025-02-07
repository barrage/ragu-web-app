<script lang="ts" setup>
import { useClipboard } from '@vueuse/core'
import LinkIcon from '~/assets/icons/svg/link.svg'

const { copy } = useClipboard()
const { t } = useI18n()

const copyItem = () => {
  const currentUrl = window.location.href

  copy(currentUrl)
  ElNotification({
    title: t('chat.copy_title'),
    message: t('chat.copy_message'),
    type: 'info',
    customClass: 'info',
    duration: 2500,
  })
}
</script>

<template>
  <el-button size="small" @click="copyItem">
    <LinkIcon /> {{ t('link') }}
  </el-button>
</template>
