import { beforeAll, describe, expect, it, vi } from 'vitest'
import { formatCurrency } from '@/utils/formatCurrency'

// Mock the useI18n function from vue-i18n
vi.mock('vue-i18n', () => ({
  useI18n: () => ({
    locale: { value: 'en-US' },
  }),
}))

describe('formatCurrency', () => {
  let amount: number
  beforeAll(() => {
    amount = 1234.56
  })
  it('should format currency with default locale and USD', () => {
    const formattedCurrency = formatCurrency(amount)

    expect(formattedCurrency).toBe('$1,234.56')
  })

  it('should format currency with a specific locale', () => {
    const formattedCurrency = formatCurrency(amount, { locale: 'fr-FR' })

    expect(formattedCurrency).toBe('1 234,56 $US')
  })

  it('should format currency with a specific currency', () => {
    const formattedCurrency = formatCurrency(amount, { currency: 'EUR' })

    expect(formattedCurrency).toBe('€1,234.56')
  })

  it('should format currency with both specific locale and currency', () => {
    const formattedCurrency = formatCurrency(amount, { locale: 'de-DE', currency: 'EUR' })

    expect(formattedCurrency).toBe('1.234,56 €')
  })

  it('should use default locale if no locale is provided', () => {
    const formattedCurrency = formatCurrency(amount)

    expect(formattedCurrency).toBe('$1,234.56')
  })

  it('should use provided currency if no currency is provided', () => {
    const formattedCurrency = formatCurrency(amount, { currency: 'JPY' })

    expect(formattedCurrency).toBe('¥1,235')
  })
})
