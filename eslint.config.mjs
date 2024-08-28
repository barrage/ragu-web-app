// eslint.config.js
import antfu from '@antfu/eslint-config'

export default antfu({
  lessOpinionated: true,
  formatters: {
    /**
     * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
     * By default uses Prettier
     */
    css: true,
    /**
     * Format HTML files
     * By default uses Prettier
     */
    html: true,
    /**
     * Format Markdown files
     * Supports Prettier and dprint
     * By default uses Prettier
     */
    markdown: 'prettier',
  },
  rules: {
    'n/prefer-global/process': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 2, // Adjust the maximum number of attributes per line as needed
        },
        multiline: {
          max: 1, // Force multi-line attributes
        },
      },
    ],
    'no-useless-catch': 'off',
  },
})
