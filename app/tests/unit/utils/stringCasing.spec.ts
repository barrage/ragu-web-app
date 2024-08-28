import { describe, expect, it } from 'vitest'
import {
  camelCaseToKebabCase,
  camelToSnake,
  camelToTitle,
  camelToTitleCase,
  kebabToCamel,
  kebabToSnake,
  snakeToCamel,
  snakeToKebab,
  titleToCamel,
  toCapitalize,
} from '@/utils/stringCasing'

describe('string Casing Utilities', () => {
  describe('kebabToCamel', () => {
    it('should convert kebab-case to camelCase', () => {
      expect(kebabToCamel('kebab-case')).toBe('kebabCase')
    })

    it('should handle multiple words', () => {
      expect(kebabToCamel('kebab-case-with-numbers123')).toBe('kebabCaseWithNumbers123')
    })

    it('should handle leading or trailing hyphens', () => {
      expect(kebabToCamel('-leading')).toBe('Leading')
      expect(kebabToCamel('trailing-')).toBe('trailing')
    })

    it('should handle empty string', () => {
      expect(kebabToCamel('')).toBe('')
    })
  })

  describe('camelCaseToKebabCase', () => {
    it('should convert camelCase to kebab-case', () => {
      expect(camelCaseToKebabCase('camelCase')).toBe('camel-case')
    })

    it('should handle multiple words', () => {
      expect(camelCaseToKebabCase('camelCaseWithNumbers123')).toBe('camel-case-with-numbers123')
    })

    it('should handle uppercase letters', () => {
      expect(camelCaseToKebabCase('Acronym')).toBe('acronym')
      expect(camelCaseToKebabCase('AcronymWithNumbers123')).toBe('acronym-with-numbers123')
    })

    it('should handle empty string', () => {
      expect(camelCaseToKebabCase('')).toBe('')
    })
  })

  describe('snakeToCamel', () => {
    it('should convert snake_case to camelCase', () => {
      expect(snakeToCamel('snake_case')).toBe('snakeCase')
    })

    it('should handle multiple words', () => {
      expect(snakeToCamel('snake_case_with_numbers123')).toBe('snakeCaseWithNumbers123')
    })

    it('should handle leading or trailing underscores', () => {
      expect(snakeToCamel('_leading')).toBe('Leading')
      expect(snakeToCamel('trailing_')).toBe('trailing')
    })

    it('should handle empty string', () => {
      expect(snakeToCamel('')).toBe('')
    })
  })

  describe('camelToSnake', () => {
    it('should convert camelCase to snake_case', () => {
      expect(camelToSnake('camelCase')).toBe('camel_case')
    })

    it('should handle multiple words', () => {
      expect(camelToSnake('camelCaseWithNumbers123')).toBe('camel_case_with_numbers123')
    })

    it('should handle uppercase letters', () => {
      expect(camelToSnake('Acronym')).toBe('acronym')
      expect(camelToSnake('AcronymWithNumbers123')).toBe('acronym_with_numbers123')
    })

    it('should handle empty string', () => {
      expect(camelToSnake('')).toBe('')
    })
  })

  describe('kebabToSnake', () => {
    it('should convert kebab-case to snake_case', () => {
      expect(kebabToSnake('kebab-case')).toBe('kebab_case')
    })

    it('should handle multiple words', () => {
      expect(kebabToSnake('kebab-case-with-numbers123')).toBe('kebab_case_with_numbers123')
    })

    it('should handle leading or trailing hyphens', () => {
      expect(kebabToSnake('-leading')).toBe('leading')
      expect(kebabToSnake('trailing-')).toBe('trailing')
    })

    it('should handle empty string', () => {
      expect(kebabToSnake('')).toBe('')
    })
  })

  describe('snakeToKebab', () => {
    it('should convert snake_case to kebab-case', () => {
      expect(snakeToKebab('snake_case')).toBe('snake-case')
    })

    it('should handle multiple words', () => {
      expect(snakeToKebab('snake_case_with_numbers123')).toBe('snake-case-with-numbers123')
    })

    it('should handle leading or trailing underscores', () => {
      expect(snakeToKebab('_leading')).toBe('leading')
      expect(snakeToKebab('trailing_')).toBe('trailing')
    })

    it('should handle empty string', () => {
      expect(snakeToKebab('')).toBe('')
    })
  })

  describe('camelToTitleCase', () => {
    it('should convert camelCase to Title Case', () => {
      expect(camelToTitleCase('camelCase')).toBe('Camel Case')
    })

    it('should handle multiple words', () => {
      expect(camelToTitleCase('camelCaseWithNumbers123')).toBe('Camel Case With Numbers123')
    })

    it('should handle uppercase letters', () => {
      expect(camelToTitleCase('Acronym')).toBe('Acronym')
      expect(camelToTitleCase('AcronymWithNumbers123')).toBe('Acronym With Numbers123')
    })

    it('should handle empty string', () => {
      expect(camelToTitleCase('')).toBe('')
    })
  })

  describe('titleToCamel', () => {
    it('should convert Title Case to camelCase', () => {
      expect(titleToCamel('Title Case')).toBe('titleCase')
    })

    it('should handle multiple words', () => {
      expect(titleToCamel('Title Case With Numbers123')).toBe('titleCaseWithNumbers123')
    })

    it('should handle leading or trailing spaces', () => {
      expect(titleToCamel('  Leading')).toBe('Leading')
      expect(titleToCamel('Trailing  ')).toBe('trailing')
    })

    it('should handle empty string', () => {
      expect(titleToCamel('')).toBe('')
    })
  })

  describe('camelToTitle', () => {
    it('should convert camelCase to Title Case', () => {
      expect(camelToTitle('camelCase')).toBe('Camel Case')
    })

    it('should handle multiple words', () => {
      expect(camelToTitle('camelCaseWithNumbers123')).toBe('Camel Case With Numbers123')
    })

    it('should handle uppercase letters', () => {
      expect(camelToTitle('Acronym')).toBe('Acronym')
      expect(camelToTitle('AcronymWithNumbers123')).toBe('Acronym With Numbers123')
    })

    it('should handle empty string', () => {
      expect(camelToTitle('')).toBe('')
    })
  })
  describe('toCapitalize', () => {
    it('should capitalize the first letter of each word', () => {
      expect(toCapitalize('hello world')).toBe('Hello World')
    })

    it('should handle multiple words', () => {
      expect(toCapitalize('the quick brown fox')).toBe('The Quick Brown Fox')
    })

    it('should handle mixed case input', () => {
      expect(toCapitalize('tHe QuiCK bROWN fOX')).toBe('The Quick Brown Fox')
    })

    it('should handle single words', () => {
      expect(toCapitalize('hello')).toBe('Hello')
      expect(toCapitalize('WORLD')).toBe('World')
    })

    it('should handle empty strings', () => {
      expect(toCapitalize('')).toBe('')
    })

    it('should handle null and undefined values', () => {
      expect(toCapitalize(null as unknown as string)).toBe('')
      expect(toCapitalize(undefined as unknown as string)).toBe('')
    })

    it('should handle non-string values gracefully', () => {
      expect(toCapitalize(123 as unknown as string)).toBe('')
      expect(toCapitalize(true as unknown as string)).toBe('')
    })
  })
})
