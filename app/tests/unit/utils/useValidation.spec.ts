import { describe, expect, it } from 'vitest'
import {
  arePasswordsMatching,
  areValuesEqual,
  containsDiacriticalMarks,
  isDigitsOnly,
  isNonEmpty,
  isStrongPassword,
  isValidCreditCard,
  isValidDate,
  isValidEmail,
  isValidFile,
  isValidHexColor,
  isValidIPAddress,
  isValidPhoneNumber,
  isValidPostalCode,
  isValidSSN,
  isValidUUID,
  isValidUsername,
} from '@/utils/useValidation'

describe('useValidation', () => {
  describe('isValidEmail', () => {
    it('should validate correct email addresses', () => {
      expect(isValidEmail('test@example.com')).toBe(true)
      expect(isValidEmail('user.name+tag+sorting@example.com')).toBe(true)
    })

    it('should invalidate incorrect email addresses', () => {
      expect(isValidEmail('plainaddress')).toBe(false)
      expect(isValidEmail('@missingusername.com')).toBe(false)
      expect(isValidEmail('username@.com')).toBe(false)
    })
  })

  describe('isValidPhoneNumber', () => {
    it('should validate correct phone numbers', () => {
      expect(isValidPhoneNumber('1234567890')).toBe(true)
    })

    it('should invalidate incorrect phone numbers', () => {
      expect(isValidPhoneNumber('123-456-7890')).toBe(false)
      expect(isValidPhoneNumber('abc123')).toBe(false)
    })
  })

  describe('containsDiacriticalMarks', () => {
    it('should detect diacritical marks', () => {
      expect(containsDiacriticalMarks('čćšđž')).toBe(true)
      expect(containsDiacriticalMarks('naïve')).toBe(true)
    })

    it('should not detect diacritical marks', () => {
      expect(containsDiacriticalMarks('hello')).toBe(false)
    })
  })

  describe('areValuesEqual', () => {
    it('should return true for equal values', () => {
      expect(areValuesEqual('test', 'test')).toBe(true)
      expect(areValuesEqual(123, 123)).toBe(true)
      expect(areValuesEqual({}, {})).toBe(false)
    })

    it('should return false for unequal values', () => {
      expect(areValuesEqual('test', 'different')).toBe(false)
      expect(areValuesEqual(123, 456)).toBe(false)
    })
  })

  describe('isValidIPAddress', () => {
    it('should validate correct IPv4 addresses', () => {
      expect(isValidIPAddress('192.168.1.1')).toBe(true)
      expect(isValidIPAddress('0.0.0.0')).toBe(true)
    })

    it('should invalidate incorrect IPv4 addresses', () => {
      expect(isValidIPAddress('999.999.999.999')).toBe(false)
      expect(isValidIPAddress('192.168.1')).toBe(false)
    })
  })

  describe('isDigitsOnly', () => {
    it('should validate strings with digits only', () => {
      expect(isDigitsOnly('12345')).toBe(true)
      expect(isDigitsOnly(67890)).toBe(true)
    })

    it('should invalidate strings with non-digit characters', () => {
      expect(isDigitsOnly('123a45')).toBe(false)
      expect(isDigitsOnly('12 345')).toBe(false)
    })
  })

  describe('isValidDate', () => {
    it('should validate correct dates', () => {
      expect(isValidDate('2024-07-29')).toBe(true)
      expect(isValidDate('2000-02-29')).toBe(true)
    })

    it('should invalidate incorrect dates', () => {
      expect(isValidDate('2024-02-30')).toBe(false)
      expect(isValidDate('invalid-date')).toBe(false)
    })
  })

  describe('isValidUUID', () => {
    it('should validate correct UUIDs', () => {
      expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000')).toBe(true)
    })

    it('should invalidate incorrect UUIDs', () => {
      expect(isValidUUID('invalid-uuid')).toBe(false)
      expect(isValidUUID('123e4567-e89b-12d3-a456-426614174000-extra')).toBe(false)
    })
  })

  describe('isValidCreditCard', () => {
    it('should validate correct credit card numbers', () => {
      expect(isValidCreditCard('4111111111111111')).toBe(true)
    })

    it('should invalidate incorrect credit card numbers', () => {
      expect(isValidCreditCard('1234567890123456')).toBe(false)
    })
  })

  describe('isNonEmpty', () => {
    it('should validate non-empty strings', () => {
      expect(isNonEmpty('value')).toBe(true)
      expect(isNonEmpty('   ')).toBe(true)
    })

    it('should invalidate empty strings', () => {
      expect(isNonEmpty('')).toBe(false)
    })
  })

  describe('isStrongPassword', () => {
    it('should validate strong passwords', () => {
      expect(isStrongPassword('Password123!')).toBe(true)
      expect(isStrongPassword('StrongP@ssw0rd')).toBe(true)
    })

    it('should invalidate weak passwords', () => {
      expect(isStrongPassword('password')).toBe(false)
      expect(isStrongPassword('12345678')).toBe(false)
    })
  })

  describe('isValidPostalCode', () => {
    it('should validate correct postal codes', () => {
      expect(isValidPostalCode('12345')).toBe(true)
      expect(isValidPostalCode('12345-6789')).toBe(true)
    })

    it('should invalidate incorrect postal codes', () => {
      expect(isValidPostalCode('ABCDE')).toBe(false)
      expect(isValidPostalCode('123456')).toBe(false)
    })
  })

  describe('isValidSSN', () => {
    it('should validate correct SSNs', () => {
      expect(isValidSSN('123-45-6789')).toBe(true)
    })

    it('should invalidate incorrect SSNs', () => {
      expect(isValidSSN('123-45-678')).toBe(false)
      expect(isValidSSN('123-456-7890')).toBe(false)
    })
  })

  describe('isValidHexColor', () => {
    it('should validate correct hex color codes', () => {
      expect(isValidHexColor('#ff5733')).toBe(true)
      expect(isValidHexColor('#FfF')).toBe(true)
    })

    it('should invalidate incorrect hex color codes', () => {
      expect(isValidHexColor('ff5733')).toBe(false)
      expect(isValidHexColor('#ff573')).toBe(false)
    })
  })

  describe('isValidUsername', () => {
    it('should validate correct usernames', () => {
      expect(isValidUsername('user_name123')).toBe(true)
      expect(isValidUsername('user-name')).toBe(true)
    })

    it('should invalidate incorrect usernames', () => {
      expect(isValidUsername('us')).toBe(false)
      expect(isValidUsername('user!name')).toBe(false)
    })
  })

  describe('isValidFile', () => {
    it('should validate correct files', () => {
      const file = new File([''], 'example.png', { type: 'image/png' })
      expect(isValidFile(file, 5, ['image/jpeg', 'image/png'])).toBe(true)
    })

    it('should invalidate incorrect files', () => {
      const file = new File([''], 'example.txt', { type: 'text/plain' })
      expect(isValidFile(file, 5, ['image/jpeg', 'image/png'])).toBe(false)
      expect(isValidFile(file, 10, ['image/jpeg', 'image/png'])).toBe(false)
    })
  })

  describe('arePasswordsMatching', () => {
    it('should validate matching passwords', () => {
      expect(arePasswordsMatching('password123', 'password123')).toBe(true)
    })

    it('should invalidate non-matching passwords', () => {
      expect(arePasswordsMatching('password123', 'password321')).toBe(false)
    })
  })
})
