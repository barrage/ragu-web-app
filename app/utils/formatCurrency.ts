import { useI18n } from 'vue-i18n'

/**
 * Interface defining optional parameters for currency formatting.
 *
 * @interface FormatCurrencyOptions
 * @property {string} currency - The currency code to use for formatting. Defaults to 'USD'.
 * @property {string} locale - The locale to use for formatting. If not provided, the current locale from `useI18n` is used.
 */
interface FormatCurrencyOptions {
  currency?: string
  locale?: string
}

/**
 * Formats a numerical amount as a currency string based on the provided options.
 *
 * This function utilizes the `Intl.NumberFormat` API to format the amount according to the specified currency and locale.
 * The default currency is 'USD' if not provided. The default locale is determined by the `useI18n` hook.
 *
 * @param amount - The numerical amount to be formatted.
 * @param options - Optional options for currency formatting.
 * @returns A formatted currency string.
 */
export function formatCurrency(amount: number, options: FormatCurrencyOptions = {}): string {
  const { locale } = useI18n()

  // Determine the locale to use for formatting.
  const currentLocale = options.locale || locale.value

  // Determine the currency to use for formatting.
  const defaultCurrency = 'USD' // Consider replacing with a value from project configuration or store
  const currency = options.currency || defaultCurrency

  // Create a number formatter with the specified options.
  const formatter = new Intl.NumberFormat(currentLocale, {
    style: 'currency',
    currency,
  })

  // Format the amount using the formatter.
  return formatter.format(amount)
}
