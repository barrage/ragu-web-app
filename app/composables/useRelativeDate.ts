import { computed, ref, watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/de'
import 'dayjs/locale/hr'
import 'dayjs/locale/en'
import 'dayjs/locale/it'
import 'dayjs/locale/es'
import 'dayjs/locale/pt'
import 'dayjs/locale/ja'
import 'dayjs/locale/fr'

dayjs.extend(relativeTime)

export function useRelativeDate(date?: string | Date | null) {
  const { t, locale } = useI18n()
  const relativeDate = ref<string>(t('timePeriod.unknown_date'))

  const calculateRelativeDate = () => {
    if (date) {
      relativeDate.value = dayjs(date).fromNow()
    }
    else {
      relativeDate.value = t('unknown_date')
    }
  }

  watchEffect(() => {
    dayjs.locale(locale.value)
    calculateRelativeDate()
  })

  return computed(() => relativeDate.value)
}
