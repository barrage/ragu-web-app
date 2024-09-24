import { useDateFormat } from '@vueuse/core'

/**
 * Formats a date based on a provided format string and optional locale.
 *
 * @param date - The date to format. Can be a Date object, a ref to a Date, a number representing a timestamp, or a string representing a date in a parsable format.
 * @param format - A string representing the desired date format. Defaults to 'DD/MMMM/YYYY'.
 * @param locales - An optional object of locale-specific formatting rules. Overrides the default locale provided by `useI18n`.
 *
 * @returns A computed ref containing the formatted date string.
 */
export function formatDate(
  date: Date | number | string,
  format: string = 'DD/MMMM/YYYY',
  locales?: string,
): ComputedRef<string> {
  const { $i18n } = useNuxtApp()
  const locale = $i18n.locale

  return useDateFormat(date, format, {
    locales: locales || locale.value,
  })
}
