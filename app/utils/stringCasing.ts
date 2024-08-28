/**
 * @file
 * Utility functions for various string casing conversions.
 *
 * This file contains functions for converting between different string case formats such as:
 * - kebab-case to camelCase
 * - camelCase to kebab-case
 * - title case to camelCase
 * - camelCase to title case
 * - Capitalizing the first letter of each word in a string
 *
 */

/**
 * Converts a kebab-case string to camelCase.
 *
 * @param str The kebab-case string to convert.
 * @returns The converted camelCase string.
 * @example
 * ```typescript
 * kebabToCamel('my-variable'); // returns 'myVariable'
 * kebabToCamel('another-example'); // returns 'anotherExample'
 * ```
 */
export function kebabToCamel(str: string): string {
  return str.replace(/-(\w)/g, (_, c) => c.toUpperCase())
}

/**
 * Converts a camelCase string to kebab-case.
 *
 * @param str The camelCase string to convert.
 * @returns The converted kebab-case string.
 * @example
 * ```typescript
 * camelCaseToKebabCase('myVariable'); // returns 'my-variable'
 * camelCaseToKebabCase('anotherExample'); // returns 'another-example'
 * ```
 */
export function camelCaseToKebabCase(str: string): string {
  return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase()
}

/**
 * Converts a snake_case string to camelCase.
 *
 * @param str The snake_case string to convert.
 * @returns The converted camelCase string.
 * @example
 * ```typescript
 * snakeToCamel('my_variable'); // returns 'myVariable'
 * snakeToCamel('another_example'); // returns 'anotherExample'
 * ```
 */
export function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, c) => c.toUpperCase())
}

/**
 * Converts a camelCase string to snake_case.
 *
 * @param str The camelCase string to convert.
 * @returns The converted snake_case string.
 * @example
 * ```typescript
 * camelToSnake('myVariable'); // returns 'my_variable'
 * camelToSnake('anotherExample'); // returns 'another_example'
 * ```
 */
export function camelToSnake(str: string): string {
  return str.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase()
}

/**
 * Converts a kebab-case string to snake_case.
 *
 * @param str The kebab-case string to convert.
 * @returns The converted snake_case string.
 * @example
 * ```typescript
 * kebabToSnake('my-variable'); // returns 'my_variable'
 * kebabToSnake('another-example'); // returns 'another_example'
 * ```
 */
export function kebabToSnake(str: string): string {
  return str.replace(/-/g, '_')
}

/**
 * Converts a snake_case string to kebab-case.
 *
 * @param str The snake_case string to convert.
 * @returns The converted kebab-case string.
 * @example
 * ```typescript
 * snakeToKebab('my_variable'); // returns 'my-variable'
 * snakeToKebab('another_example'); // returns 'another-example'
 * ```
 */
export function snakeToKebab(str: string): string {
  return str.replace(/_/g, '-')
}

/**
 * Converts a camelCase string to Title Case.
 *
 * @param str The camelCase string to convert.
 * @returns The converted Title Case string.
 * @example
 * ```typescript
 * camelToTitleCase('myVariable'); // returns 'My Variable'
 * camelToTitleCase('anotherExample'); // returns 'Another Example'
 * ```
 */
export function camelToTitleCase(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/(^\w|\s\w)/g, match => match.toUpperCase())
}

/**
 * Converts a Title Case string to camelCase.
 *
 * @param str The Title Case string to convert.
 * @returns The converted camelCase string.
 * @example
 * ```typescript
 * titleToCamel('My Variable'); // returns 'myVariable'
 * titleToCamel('Another Example'); // returns 'anotherExample'
 * ```
 */
export function titleToCamel(str: string): string {
  return str
    .toLowerCase()
    .replace(/^\w|[A-Z]|\b\w|\s+/g, (_, index) => index === 0 ? _ : _.toUpperCase())
}

/**
 * Converts a camelCase string to Title Case.
 *
 * @param str The camelCase string to convert.
 * @returns The converted Title Case string.
 * @example
 * ```typescript
 * camelToTitle('myVariable'); // returns 'My Variable'
 * camelToTitle('anotherExample'); // returns 'Another Example'
 * ```
 */
export function camelToTitle(str: string): string {
  return str
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/^./, match => match.toUpperCase())
}

/**
 * Capitalizes the first letter of each word in a given string.
 *
 * Handles empty strings, null, undefined, and non-string values by returning an empty string.
 *
 * @param text - The input string to capitalize.
 * @returns The capitalized string.
 *
 * @example
 * toCapitalize('barrage util') // returns 'Barrage Util';
 */
export function toCapitalize(text: string): string {
  if (!text) {
    return ''
  }

  return text.toLowerCase().replace(/(^|\s)\w/g, c => c.toUpperCase())
}
