/**
 * @file
 * Utility functions for validating various types of inputs.
 *
 * This file contains functions for validating:
 * - Email addresses
 * - Phone numbers
 * - Diacritical marks
 * - IP addresses
 * - Digits only
 * - Credit card numbers
 * - Dates
 * - UUIDs
 * - Non-empty values
 * - Password strength
 * - URLs
 * - Postal codes
 * - Social security numbers
 * - Hex color codes
 * - Usernames
 * - Files (e.g., size and type)
 * - Confirming passwords
 *
 * Each function is designed to handle specific validation tasks and ensure that
 * input values meet expected formats or conditions.
 */

/**
 * Validates if the input string is a valid email address.
 *
 * @param email - The email address to validate.
 * @returns `true` if the email is valid, otherwise `false`.
 *
 * @example
 * ```typescript
 * isValidEmail('test@example.com'); // returns true
 * isValidEmail('invalid-email'); // returns false
 * ```
 */
export function isValidEmail(email: string): boolean {
  const emailPattern = /^[\w.+-]+@[a-z0-9-]+\.[a-z0-9-.]+$/i
  return emailPattern.test(email)
}

/**
 * Validates if the input string is a valid phone number (digits only).
 *
 * @param phoneNumber - The phone number to validate.
 * @returns `true` if the phone number is valid, otherwise `false`.
 *
 * @example
 * ```typescript
 * isValidPhoneNumber('1234567890'); // returns true
 * isValidPhoneNumber('123-456-7890'); // returns false
 * ```
 */
export function isValidPhoneNumber(phoneNumber: string): boolean {
  const phonePattern = /^\d+$/
  return phonePattern.test(phoneNumber)
}

/**
 * Checks if the input string contains diacritical marks.
 *
 * @param value - The string to check for diacritical marks.
 * @returns `true` if the string contains diacritical marks, otherwise `false`.
 *
 * @example
 * ```typescript
 * containsDiacriticalMarks('čćšđž'); // returns true
 * containsDiacriticalMarks('abcd'); // returns false
 * ```
 */
export function containsDiacriticalMarks(value: string): boolean {
  return /[čćšđž"']/.test(value)
}

/**
 * Checks if two values are the same.
 *
 * @param value1 - The first value to compare.
 * @param value2 - The second value to compare.
 * @returns `true` if both values are the same, otherwise `false`.
 *
 * @example
 * ```typescript
 * areValuesEqual('test', 'test'); // returns true
 * areValuesEqual('test', 'different'); // returns false
 * ```
 */
export function areValuesEqual(value1: any, value2: any): boolean {
  return value1 === value2
}

/**
 * Validates if the input string is a valid IPv4 address.
 *
 * @param value - The IP address to validate.
 * @returns `true` if the IP address is valid, otherwise `false`.
 *
 * @example
 * ```typescript
 * isValidIPAddress('192.168.1.1'); // returns true
 * isValidIPAddress('999.999.999.999'); // returns false
 * ```
 */
export function isValidIPAddress(value: string): boolean {
  const ipAddressPattern
      = /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d{1,2})$/
  return ipAddressPattern.test(value)
}

/**
 * Validates if the input string or number contains only digits.
 *
 * @param value - The value to check.
 * @returns `true` if the value contains only digits, otherwise `false`.
 *
 * @example
 * ```typescript
 * isDigitsOnly('12345'); // returns true
 * isDigitsOnly('123a45'); // returns false
 * ```
 */
export function isDigitsOnly(value: string | number): boolean {
  const digitsPattern = /^\d+$/
  return digitsPattern.test(String(value))
}

/**
 * Validates if the input string is a valid date in the format YYYY-MM-DD.
 *
 * @param value - The date string to validate.
 * @returns `true` if the date is valid, otherwise `false`.
 *
 * @example
 * ```typescript
 * isValidDate('2024-07-29'); // returns true
 * isValidDate('invalid-date'); // returns false
 * ```
 */
export function isValidDate(value: string): boolean {
  const datePattern = /^\d{4}-\d{2}-\d{2}$/
  return datePattern.test(value) && !Number.isNaN(Date.parse(value))
}

/**
 * Validates if the input string is a valid UUID (version 4).
 *
 * @param value - The UUID to validate.
 * @returns `true` if the UUID is valid, otherwise `false`.
 *
 * @example
 * ```typescript
 * isValidUUID('123e4567-e89b-12d3-a456-426614174000'); // returns true
 * isValidUUID('invalid-uuid'); // returns false
 * ```
 */
export function isValidUUID(value: string): boolean {
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i
  return uuidPattern.test(value)
}

/**
 * Validates if the input string is a valid credit card number.
 *
 * @param value - The credit card number to validate.
 * @returns `true` if the credit card number is valid, otherwise `false`.
 *
 * @example
 * ```typescript
 * isValidCreditCard('4111111111111111'); // returns true (for a valid card)
 * isValidCreditCard('1234567890123456'); // returns false
 * ```
 */
export function isValidCreditCard(value: string): boolean {
  const creditCardPattern = /^(?:4\d{12}(?:\d{3})?|5[1-5]\d{14}|6(?:011|5\d\d)\d{12}|3[47]\d{13}|3(?:0[0-5]|[68]\d)\d{11}|2\d{15})$/
  return creditCardPattern.test(value)
}

/**
 * Validates if the input string is non-empty.
 *
 * @param value - The value to check.
 * @returns `true` if the value is non-empty, otherwise `false`.
 *
 * @example
 * ```typescript
 * isNonEmpty('value'); // returns true
 * isNonEmpty(''); // returns false
 * ```
 */
export function isNonEmpty(value: string): boolean {
  return value.trim().length > 0
}

/**
 * Validates if the input string is a strong password.
 * The password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.
 *
 * @param value - The password to validate.
 * @returns `true` if the password is strong, otherwise `false`.
 *
 * @example
 * ```typescript
 * isStrongPassword('Password123!'); // returns true
 * isStrongPassword('password'); // returns false
 * ```
 */
export function isStrongPassword(value: string): boolean {
  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
  return passwordPattern.test(value)
}

/**
 * Validates if the input string is a valid postal code.
 *
 * @param value - The postal code to validate.
 * @returns `true` if the postal code is valid, otherwise `false`.
 *
 * @example
 * ```typescript
 * isValidPostalCode('12345'); // returns true
 * isValidPostalCode('ABCDE'); // returns false
 * ```
 */
export function isValidPostalCode(value: string): boolean {
  const postalCodePattern = /^\d{5}(?:-\d{4})?$/
  return postalCodePattern.test(value)
}

/**
 * Validates if the input string is a valid social security number (SSN).
 *
 * @param value - The SSN to validate.
 * @returns `true` if the SSN is valid, otherwise `false`.
 *
 * @example
 * ```typescript
 * isValidSSN('123-45-6789'); // returns true
 * isValidSSN('123-45-678'); // returns false
 * ```
 */
export function isValidSSN(value: string): boolean {
  const ssnPattern = /^\d{3}-\d{2}-\d{4}$/
  return ssnPattern.test(value)
}

/**
 * Validates if the input string is a valid hex color code.
 *
 * @param value - The hex color code to validate.
 * @returns `true` if the hex color code is valid, otherwise `false`.
 *
 * @example
 * ```typescript
 * isValidHexColor('#ff5733'); // returns true
 * isValidHexColor('ff5733'); // returns false
 * ```
 */
export function isValidHexColor(value: string): boolean {
  const hexColorPattern = /^#(?:[0-9a-f]{6}|[0-9a-f]{3})$/i
  return hexColorPattern.test(value)
}

/**
 * Validates if the input string is a valid username.
 * Usernames must be 3-16 characters long and can only contain letters, numbers, hyphens, and underscores.
 *
 * @param value - The username to validate.
 * @returns `true` if the username is valid, otherwise `false`.
 *
 * @example
 * ```typescript
 * isValidUsername('user_name123'); // returns true
 * isValidUsername('us'); // returns false
 * ```
 */
export function isValidUsername(value: string): boolean {
  const usernamePattern = /^[\w-]{3,16}$/
  return usernamePattern.test(value)
}

/**
 * Validates if the input file meets certain criteria.
 * This example checks for size (e.g., up to 5MB) and type (e.g., JPEG or PNG).
 *
 * @param file - The file to validate.
 * @param maxSizeMB - The maximum allowed file size in MB.
 * @param allowedTypes - Array of allowed MIME types.
 * @returns `true` if the file meets the criteria, otherwise `false`.
 *
 * @example
 * ```typescript
 * isValidFile(file, 5, ['image/jpeg', 'image/png']); // returns true or false based on file size and type
 * ```
 */
export function isValidFile(file: File, maxSizeMB: number, allowedTypes: string[]): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  const isSizeValid = file.size <= maxSizeBytes
  const isTypeValid = allowedTypes.includes(file.type)
  return isSizeValid && isTypeValid
}

/**
 * Checks if the input password matches the confirmed password.
 *
 * @param password - The original password.
 * @param confirmPassword - The confirmed password.
 * @returns `true` if both passwords match, otherwise `false`.
 *
 * @example
 * ```typescript
 * arePasswordsMatching('password123', 'password123'); // returns true
 * arePasswordsMatching('password123', 'password321'); // returns false
 * ```
 */
export function arePasswordsMatching(password: string, confirmPassword: string): boolean {
  return password === confirmPassword
}
