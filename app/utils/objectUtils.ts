/**
 * Utility functions for manipulating and comparing objects.
 *
 * This module provides various helper functions to work with objects, including:
 * - Checking if an object is empty.
 * - Deeply comparing two objects for equality.
 * - Merging multiple objects.
 * - Cloning an object.
 * - Getting the values of an object as an array.
 * - Removing a property from an object.
 */

/**
 * Checks if an object is empty.
 *
 * An empty object is considered to have no own enumerable properties.
 *
 * @param {Record<string, any>} obj - The object to check.
 * @returns {boolean} `true` if the object is empty, `false` otherwise.
 */
export function isObjectEmpty(obj: Record<string, any>): boolean {
  return Object.keys(obj).length === 0
}

/**
 * Deeply compares two objects for equality.
 *
 * This function performs a recursive comparison of all properties to determine if the two objects are deeply equal.
 *
 * @param {any} obj1 - First object to compare.
 * @param {any} obj2 - Second object to compare.
 * @returns {boolean} `true` if objects are deeply equal, `false` otherwise.
 */
export function deepEqual(obj1: any, obj2: any): boolean {
  if (obj1 === obj2) {
    return true
  }

  if (obj1 == null || obj2 == null) {
    return false
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false
  }

  for (const key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false
    }
  }

  return true
}

/**
 * Merges multiple objects into one.
 *
 * Later objects overwrite properties of earlier objects with the same key.
 *
 * @param {...T[]} objects - The objects to merge.
 * @returns {T} A new object that is a combination of all the input objects.
 * @template T - The type of the objects to merge.
 */
export function mergeObjects<T extends Record<string, any>>(...objects: T[]): T {
  return Object.assign({}, ...objects)
}

/**
 * Creates a shallow clone of the provided object.
 *
 * This function performs a shallow copy of the object. Nested objects or arrays are not deeply cloned.
 *
 * @param {T} obj - The object to clone.
 * @returns {T} A new object that is a shallow copy of the input object.
 * @template T - The type of the object to clone.
 */
export function cloneObject<T extends Record<string, any>>(obj: T): T {
  return { ...obj }
}

/**
 * Gets the values of an object as an array.
 *
 * This function returns an array containing all the values of the object's own enumerable properties.
 *
 * @param {T} obj - The object to get values from.
 * @returns {any[]} An array of the object's values.
 * @template T - The type of the object to get values from.
 */
export function objectValues<T extends Record<string, any>>(obj: T): any[] {
  return Object.values(obj)
}

/**
 * Removes a specified property from an object.
 *
 * @param obj - The object from which to remove the property.
 * @param prop - The property key to remove.
 * @returns A new object without the specified property.
 */
export function removeProperty<T extends Record<string, any>>(obj: T, prop: string): Omit<T, typeof prop> {
  const { [prop]: _, ...rest } = obj
  return rest as Omit<T, typeof prop>
}
