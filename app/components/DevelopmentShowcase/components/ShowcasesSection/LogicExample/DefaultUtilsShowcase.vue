<script lang="ts" setup>
import { ref } from 'vue'

/* stringCasing.ts */
const stringCasingUtilsList = ref([
  {
    name: 'kebabToCamel',
    description: 'Converts a kebab-case string to camelCase.',
  },
  {
    name: 'camelCaseToKebabCase',
    description: 'Converts a camelCase string to kebab-case.',
  },
  {
    name: 'snakeToCamel',
    description: 'Converts a snake_case string to camelCase.',
  },
  {
    name: 'camelToSnake',
    description: 'Converts a camelCase string to snake_case.',
  },
  {
    name: 'kebabToSnake',
    description: 'Converts a kebab-case string to snake_case.',
  },
  {
    name: 'snakeToKebab',
    description: 'Converts a snake_case string to kebab-case.',
  },
  {
    name: 'camelToTitleCase',
    description: 'Converts a camelCase string to Title Case.',
  },
  {
    name: 'titleToCamel',
    description: 'Converts a Title Case string to camelCase.',
  },
  {
    name: 'camelToTitle',
    description: 'Converts a camelCase string to Title Case.',
  },
  {
    name: 'toCapitalize',
    description: 'Capitalizes the first letter of each word in a given string.',
  },
])

/* useValidation.ts */
const useValidationUtilsList = ref([
  {
    name: 'isValidEmail',
    description: 'Validates if the input string is a valid email address.',
  },
  {
    name: 'isValidPhoneNumber',
    description: 'Validates if the input string is a valid phone number (digits only).',
  },
  {
    name: 'containsDiacriticalMarks',
    description: 'Checks if the input string contains diacritical marks.',
  },
  {
    name: 'areValuesEqual',
    description: 'Checks if two values are the same.',
  },
  {
    name: 'isValidIPAddress',
    description: 'Validates if the input string is a valid IPv4 address.',
  },
  {
    name: 'isDigitsOnly',
    description: 'Validates if the input string or number contains only digits.',
  },
  {
    name: 'isValidDate',
    description: 'Validates if the input string is a valid date in the format YYYY-MM-DD.',
  },
  {
    name: 'isValidUUID',
    description: 'Validates if the input string is a valid UUID (version 4).',
  },
  {
    name: 'isValidCreditCard',
    description: 'Validates if the input string is a valid credit card number.',
  },
  {
    name: 'isNonEmpty',
    description: 'Validates if the input string is non-empty.',
  },
  {
    name: 'isStrongPassword',
    description: 'Validates if the input string is a strong password.',
  },
  {
    name: 'isValidPostalCode',
    description: 'Validates if the input string is a valid postal code.',
  },
  {
    name: 'isValidSSN',
    description: 'Validates if the input string is a valid social security number (SSN).',
  },
  {
    name: 'isValidHexColor',
    description: 'Validates if the input string is a valid hex color code.',
  },
  {
    name: 'isValidUsername',
    description: 'Validates if the input string is a valid username.',
  },
  {
    name: 'isValidFile',
    description: 'Validates if the input file meets certain criteria.',
  },
  {
    name: 'arePasswordsMatching',
    description: 'Checks if the input password matches the confirmed password.',
  },
])
/* objectUtils.ts */
const objectUtilsList = ref([
  {
    name: 'isObjectEmpty',
    description: 'Checks if an object is empty. An empty object is considered to have no own enumerable properties.',
  },
  {
    name: 'deepEqual',
    description: 'Deeply compares two objects for equality.',
  },
  {
    name: 'mergeObjects',
    description: 'Merges multiple objects into one, with later objects overwriting earlier ones.',
  },
  {
    name: 'cloneObject',
    description: 'Creates a shallow clone of an object.',
  },
  {
    name: 'objectValues',
    description: 'Returns an array of the values of an object’s own enumerable properties.',
  },
  {
    name: 'removeProperty',
    description: 'Removes a specified property from an object.',
  },
])
/* formatDate.ts */
const formatDateList = ref([
  {
    name: 'formatDate',
    description: 'Formats a date based on a provided format string and optional locale.',
  },
])
/* formatCurrency.ts */
const formatCurrencyList = ref([
  {
    name: 'formatCurrency',
    description: 'Formats a numerical amount as a currency string based on the provided options.',
  },
])

const utilsLists = [
  { title: 'Date formater', file: 'formatDate.ts', redirectUrl: 'https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/blob/master/app/utils/formatDate.ts', list: formatDateList.value },
  { title: 'Currency formater', file: 'formatCurrency.ts', redirectUrl: 'https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/blob/master/app/utils/formatCurrency.ts', list: formatCurrencyList.value },
  { title: 'String Casing Utilities', file: 'stringCasing.ts', redirectUrl: 'https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/blob/master/app/utils/stringCasing.ts', list: stringCasingUtilsList.value },
  { title: 'Object Utilities', file: 'objectUtils.ts', redirectUrl: 'https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/blob/master/app/utils/objectUtils.ts', list: objectUtilsList.value },
  { title: 'Validation Utilities', file: 'useValidation.ts', redirectUrl: 'https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/blob/master/app/utils/useValidation.ts', list: useValidationUtilsList.value },

]
</script>

<template>
  <section class="utils-showcase-section">
    <TabTtitleContainer
      title="Utils"
      file="app/utils"
      redirect-url="https://git.barrage.net/frontend-team-shared/nuxt-boilerplate/-/tree/master/app/utils"
    />

    <div class="info-wrapper">
      <template v-for="utils in utilsLists" :key="utils.file">
        <div class="util-file">
          <FileRedirect
            :file="utils.file"
            :redirect-url="utils.redirectUrl"
          />
        </div>

        <div
          v-for="util in utils.list"
          :key="util.name"
        >
          <InfoRow :name="util.name" :description="util.description" />
        </div>
      </template>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.utils-showcase-section {
  display: flex;
  flex-direction: column;

  & .info-wrapper {
    padding: 32px;
    padding-top: 0;
    & .util-file {
      margin: 42px 0px 18px;
    }
  }
}
</style>
