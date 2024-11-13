/**
 * Utility function to format a string to a specified maximum length.
 * If the input string exceeds the given length, it truncates the string
 * and appends an ellipsis (`...`) at the end.
 *
 * @param {string | null | undefined} value - The string to be formatted.
 *                                         If `value` is `null` or `undefined`, the function returns an empty string.
 * @param {number} maxLength - The maximum length of the returned string.
 *                             Must be a non-negative finite number.
 * @returns {string} - The formatted string, truncated with `...` if it exceeds `maxLength`.
 *
 * @throws {Error} - If `maxLength` is not a valid non-negative number.
 */
export function formatStringMaxLenght(value: string | null | undefined, maxLength: number): string {
  if (!value || typeof value !== 'string') {
    return ''
  }
  if (!Number.isFinite(maxLength) || maxLength < 0) {
    throw new Error('Invalid maxLength. It should be a non-negative number.')
  }

  return value.length <= maxLength ? value : `${value.slice(0, maxLength)}...`
}
