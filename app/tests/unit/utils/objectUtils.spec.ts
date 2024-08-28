import { describe, expect, it } from 'vitest'
import {
  cloneObject,
  deepEqual,
  isObjectEmpty,
  mergeObjects,
  objectValues,
  removeProperty,
} from '@/utils/objectUtils'

describe('object Utilities', () => {
  // Test for isObjectEmpty function
  describe('isObjectEmpty', () => {
    it('should return true for an empty object', () => {
      expect(isObjectEmpty({})).toBe(true)
    })

    it('should return false for a non-empty object', () => {
      expect(isObjectEmpty({ key: 'value' })).toBe(false)
    })

    it('should return false for an object with properties', () => {
      expect(isObjectEmpty({ key1: 'value1', key2: 'value2' })).toBe(false)
    })
  })

  // Test for deepEqual function
  describe('deepEqual', () => {
    it('should return true for deeply equal objects', () => {
      const obj1 = { a: 1, b: { c: 2 } }
      const obj2 = { a: 1, b: { c: 2 } }
      expect(deepEqual(obj1, obj2)).toBe(true)
    })

    it('should return false for objects with different structures', () => {
      const obj1 = { a: 1, b: { c: 2 } }
      const obj2 = { a: 1, b: { d: 2 } }
      expect(deepEqual(obj1, obj2)).toBe(false)
    })

    it('should return false for objects with different types', () => {
      const obj1 = { a: 1 }
      const obj2 = [1]
      expect(deepEqual(obj1, obj2)).toBe(false)
    })

    it('should return true for identical objects', () => {
      const obj1 = { a: 1, b: 2 }
      const obj2 = obj1
      expect(deepEqual(obj1, obj2)).toBe(true)
    })
  })

  // Test for mergeObjects function
  describe('mergeObjects', () => {
    it('should merge multiple objects into one', () => {
      const obj1: Record<string, any> = { a: 1 }
      const obj2: Record<string, any> = { b: 2 }
      const obj3: Record<string, any> = { c: 3 }
      expect(mergeObjects(obj1, obj2, obj3)).toEqual({ a: 1, b: 2, c: 3 })
    })

    it('should overwrite properties with later objects', () => {
      const obj1: Record<string, any> = { a: 1 }
      const obj2: Record<string, any> = { a: 2 }
      expect(mergeObjects(obj1, obj2)).toEqual({ a: 2 })
    })

    it('should handle merging objects with the same key', () => {
      const obj1: Record<string, any> = { a: 1, b: 2 }
      const obj2: Record<string, any> = { b: 3, c: 4 }
      expect(mergeObjects(obj1, obj2)).toEqual({ a: 1, b: 3, c: 4 })
    })
  })

  // Test for cloneObject function
  describe('cloneObject', () => {
    it('should create a shallow clone of an object', () => {
      const obj = { a: 1, b: { c: 2 } }
      const clone = cloneObject(obj)
      expect(clone).toEqual(obj)
      expect(clone).not.toBe(obj) // Ensure it's a new object
    })

    it('should not deeply clone nested objects', () => {
      const obj = { a: 1, b: { c: 2 } }
      const clone = cloneObject(obj)
      expect(clone.b).toBe(obj.b) // Ensure the nested object is the same reference
    })
  })

  // Test for objectValues function
  describe('objectValues', () => {
    it('should return an array of object values', () => {
      const obj = { a: 1, b: 2, c: 3 }
      expect(objectValues(obj)).toEqual([1, 2, 3])
    })

    it('should return an empty array for an empty object', () => {
      expect(objectValues({})).toEqual([])
    })
  })

  // Test for removeProperty function
  describe('removeProperty', () => {
    it('should remove a property from an object', () => {
      const obj = { a: 1, b: 2, c: 3 }
      const newObj = removeProperty(obj, 'b')
      expect(newObj).toEqual({ a: 1, c: 3 })
      expect('b' in newObj).toBe(false) // Check that the property 'b' no longer exists
    })

    it('should return the original object if property does not exist', () => {
      const obj = { a: 1, b: 2 }
      const newObj = removeProperty(obj, 'c')
      expect(newObj).toEqual({ a: 1, b: 2 })
    })
  })
})
