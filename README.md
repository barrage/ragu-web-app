# Nuxt Boilerplate

## Name

Barrage Nuxt 3 Boilerplate

## Description

The Barrage Nuxt 3 Boilerplate project is designed as a foundational template for developing applications using the Nuxt 3 framework. This boilerplate provides a streamlined setup to ensure consistent and efficient development practices.

## Stack

[![Nuxt 3](https://img.shields.io/badge/Framework-Nuxt%203-399918)](https://nuxtjs.org/)
[![Vue 3](https://img.shields.io/badge/Framework-Vue%203-508D4E)](https://vuejs.org/)
[![Vitest](https://img.shields.io/badge/Testing-Vitest-F4CE14)](https://vitest.dev/)
[![Pinia](https://img.shields.io/badge/State%20Management-Pinia-0C359E)](https://pinia.vuejs.org/)

For more informations about default stack setup and coding practices please visit [Stack](https://confluence.barrage.net/display/BD/Default+Stack+Overview) page on Barrage Confluence.

## Requirements

- **Node.js**: Ensure you have Node.js version 20 or later installed. You can download and install the latest version from the [Node.js website](https://nodejs.org/). To check your current version, run `node -v` in your terminal. If you need to install or upgrade Node.js, follow the instructions provided on the website.

## Installation Steps

1. **Clone the Repository**

   Clone the boilerplate repository to your local machine using Git:

   ```bash
   git clone https://git.barrage.net/frontend-team-shared/nuxt-boilerplate
   ```

2. **Navigate to Project Directory**
   ```bash
   cd nuxt-boilerplate
   ```
3. **Install Dependencies**
   ```bash
   npm install
   ```
   This command installs all the required packages listed in the package.json file.

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build
```

Locally preview production build:

```bash
# npm
npm run preview
```

## Setting Up a New Project

If you want to start from scratch and remove all default boilerplate components, follow these steps:

### Remove Boilerplate Components

1. **Eliminate Showcase Components:**

   - Remove `<BarrageNuxtWelcome />` from the `index.vue` page.

2. **Delete Boilerplate Folder:**
   - Delete the entire `BarrageNuxtWelcome` folder located inside the `app/components` directory.

### Customize Global Styles

1. **Edit Global Styles:**
   - Navigate to the `assets/styles` directory.
   - Check `styles.scss` to see what global styles are included in the boilerplate.
   - Modify `styles.scss` as needed to fit your project’s design.

### Configure Project Variables

1. **Update Configuration Files:**
   - Modify the `.env` file or configuration files found in the `config` directory.
   - This will help you manage environment variables, API endpoints, and other configurations specific to your project.

### Update Layouts

1. **Modify Layouts:**

   - Update or create new layouts in the `app/layouts` directory to match your project's design requirements.

2. **Review and Clean Up:**
   - Review the available layouts in the `app/layouts` directory.
   - Use the layouts that fit your project needs and remove any that are not required.

### Add Components

1. **Utilize or Extend Components:**

   - Use or extend components from the Element Plus library located in the `components` directory.
   - Create new components as needed for your project.

2. **Remove Element Plus (Optional):**

   - If you decide not to use Element Plus, remove it from the project.

3. **Manage Component Styles:**
   - Place global styles for components inside `assets/styles/components`.

### Implement State Management

1. **Use Pinia:**

   - Define your store modules in the `app/stores` directory.
   - Use Pinia for state management to effectively manage your application’s state.

2. **Remove Pinia (Optional):**
   - If your project does not require state management, remove Pinia from the project.

## Repository folder

> **Note:**
> If your project's requirements do not align with the repository pattern implementation provided in this project, you can safely delete the entire `repository` folder and the `api.ts` plugin file.
> This will not affect the core functionality of your project if you do not need centralized service management for API calls.

- This repository is designed to handle all API calls in a structured, maintainable, and scalable way (customized repository pattern).
- It leverages the $fetch utility in Nuxt 3, allowing for easier environment management, testing, and extension.
- The repository also separates concerns by isolating the API logic from the rest of the application, making the codebase more modular and adaptable to change.

**Folder structure:**

```bash
repository/
│
├── fetchFactory.ts        # Base class for handling HTTP requests
└── services/
    ├── product.ts         # Service for handling product-related API requests
    └── ...                # Other service files
```

**FetchFactory:**

- The FetchFactory class serves as a base class for all services, providing a standardized way to make HTTP requests using the $fetch utility.

**API Plugin:**

- The api.ts file is a Nuxt plugin that initializes the services and injects them into the application.
- This setup allows you to manage your services centrally and ensures they are available globally throughout your application.

**Services folder:**

- The services folder contains classes responsible for handling API requests related to specific entities or features in your application.
- These services are designed to encapsulate all logic related to making HTTP requests, ensuring a clean separation of concerns between your application’s state management and API interaction layers.
- By extending a common base class, these services maintain consistency and reusability across different parts of your application.

**Usage:**

1. _Add ENV variable to your .env file to correspond your backend_

```bash
API_BASE_URL=https://mytestapi.com
```

2. _Add that env url to your nuxt config_

```bash
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL,
    }
  }
```

2. _Create a new service file inside the services directory._

```typescript
// /repository/services/example.ts
import FetchFactory from '../fetchFactory'

export default class ExampleService extends FetchFactory {
  private readonly endpoint: string = '/new-endpoint'

  async fetchData() {
    return await this.$fetch(this.endpoint)
  }
}
```

3. _Now, update the api.ts plugin file to include and initialize the ExampleService so that it can be accessed throughout the application._

```typescript
//  /plugins/api.ts
import ExampleService from '~/repository/services/example'

export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig()

  const baseApiFetcher = $fetch.create({
    baseURL: config.public.apiBaseUrl,
  })

  const exampleService = new ExampleService(baseApiFetcher)

  return {
    provide: {
      api: {
        example: exampleService,
      },
    },
  }
})
```

4. _Use the new service in your components or stores:_

   _If you want to use it without store:_

   ```vue
   <script setup>
   import { useNuxtApp } from '#app'
   const { $api } = useNuxtApp()
   const { data, status } = await useAsyncData(() => $api.example.fetchAllExamples())
   </script>
   ```

   _Store example:_

   ```typescript
   // /stores/example.ts
   import { defineStore } from 'pinia'
   import type { Example } from '~/types/example'

   export const useExampleStore = defineStore('example', () => {
   // CONSTANTS
     const { $api } = useNuxtApp()

     // STATE
     const examples = ref<Example[]>([])

     const fetchAllExamples = async () => {
       const data = await $api.example.fetchData()
       examples.value = data
       return data
     }

     return { examples, fetchAllExamples }
   })
   ```

   _Then in component:_

   ```vue
   <script setup>
   // CONSTANTS
   const exampleStore = useExampleStore()

   // API CALLS
   await useAsyncData(() => exampleStore.fetchAllExamples())
   </script>
   ```

### Localization

To add localization support for different languages, follow these steps:

1. **Create Language Files:**

   - Each language should have its own TypeScript (`.ts`) file created inside the `/locales` folder.
   - For example:
     - `en.ts` for English
     - `hr.ts` for Croatian
     - etc.

   Each file should export an object containing the translations for that language. Example:

   ```typescript
   // /locales/en.ts
   export default {
     localization_example: {
       title: 'Localization Example',
       text: 'This is a switch language example',
       current_language: 'English',
     },
   }
   ```

2. **Configure i18n in nuxt.config.js:**

After creating your language files, include them in your nuxt.config.js under the i18n section.

#### Usage

To use translations in your Vue components, use the `$t` method provided by the `@nuxtjs/i18n` module.

**Example:**

```html
<template>
  <p>{{ $t("localization_example.title") }}</p>
</template>
```

**Iterate Over Translations**

You can iterate over a translated object using $tm and $rt methods.

```html
<p
  v-for="paragraph in $tm('localization_example.section')"
  :key="paragraph.title"
>
  {{ $rt(paragraph.title) }} - {{ $rt(paragraph.description) }}
</p>
```

### NuxtIcon component

The `NuxtIcon` component offers enhanced flexibility and usability, making it easy to customize and integrate SVG icons across your application. Below are the key features and capabilities:

### Key Features

- **`currentColor` Inheritance:**
  Icons inherit `currentColor` by default through the `svg-icon--fill` class. This allows icons to automatically match the color of surrounding text or parent elements, ensuring consistent and cohesive styling.

- **Original Colors:**
  The `original` prop allows icons to retain their original SVG colors. This is useful when you want to display the icon with its default design rather than inheriting the current color.

- **Custom Color:**
  The `color` prop enables you to specify a custom color for the icons.

- **Flexible Sizing:**
  The `size` prop allows you to set both the width and height of an icon simultaneously. Additionally, separate `width` and `height` props are available for more granular control over the icon's dimensions.

### Additional Enhancements

- **Component Integration:**
  Icons can be passed into any component using the `h` JavaScript function. This feature is particularly useful for enhancing the visual appeal of notifications and other dynamic UI elements. For example:

  ```javascript
  ElNotification({
    title: 'Notification Title',
    icon: h(ArrowRight, {
      size: '32',
      color: 'red',
    }),
    message: 'Notification Message',
  })
  ```

- **Responsive Resizing:**
  Icons can be resized dynamically based on screen size using media queries. For example:

  ```css
  @media (max-width: 900px) {
    svg {
      width: 20px !important;
      height: 20px !important;
    }
  }
  ```

### Middleware

This project includes two types of middleware to handle specific conditions across pages:

1. **Global Middleware**
   The `example-global-middleware` is a global middleware that checks a condition on each page. It automatically runs on every route in the application, ensuring that the condition is enforced consistently.

2. **Named Middleware**
   The `example-named-middleware` is a named middleware that only runs on pages where it is explicitly specified. You can apply this middleware to a page by defining it in the page's `definePageMeta` function, as shown below:

   ```javascript
   definePageMeta({
     middleware: ['example-named-middleware'],
   })
   ```

For more information on middleware and its configuration in Nuxt, you can refer to the official documentation: [Nuxt Middleware Guide](https://nuxt.com/docs/guide/directory-structure/middleware).

### Error handling

### `errorHandler` Composable

The `errorHandler` composable is designed to manage error handling in your Nuxt 3 application, providing a flexible and efficient way to deal with both client-side and server-side errors.

#### Features:

- **Fatal and Non-Fatal Error Management**:

  - For **fatal errors**, the composable triggers Nuxt's global error handling, which may lead to rendering an error page or executing other global error-handling logic.
  - For **non-fatal errors** on the client-side, it displays a user-friendly toast notification from `element plus`, ensuring the error is communicated without disrupting the user experience.

- **Debounced Error Handling**:

  - Uses a debounced function to prevent the same error from being handled multiple times in quick succession, which is especially useful in large applications where rapid error occurrences can impact performance.

- **Client-Side and Server-Side Compatibility**:
  - Ensures that error handling behaves correctly whether the error occurs during client-side rendering (CSR) or server-side rendering (SSR).
  - On the client side, the toast notification is displayed only after the DOM has been updated, ensuring a smooth user experience.

#### Usage:

```vue
<script setup lang="ts">
const { execute, error, status } = await useAsyncData(() => productStore.fetchAllProducts())

// Use the errorHandler with an error reference and specify if the error should be treated as fatal.
errorHandler(error) // Non-fatal errors will show a toast
errorHandler(error, true) // Fatal errors will trigger global error handling.
</script>
```

### error-handler plugin

This plugin is designed to handle global unexpected errors in a Nuxt 3 application. It captures errors that occur within Vue components and provides a way to manage these errors, whether by logging them, notifying the user, or integrating with third-party error tracking services.

#### Features

- **Global Error Capture**: Hooks into Vue's global error handling system to capture errors that occur in any component.
- **Error Details Extraction**: Extracts detailed information about the error, including the error message, stack trace, component name, and additional context.
- **Flexible Logging**: The plugin is designed to be extendable, allowing you to integrate with third-party logging services such as Sentry or LogRocket in the future.
- **Console Logging**: By default, captured errors and their details are logged to the console.

#### Future enhancements

- Third-Party Integration: The commented-out errorHandler method can be used to integrate with services like Sentry, Datadog, or LogRocket. This would allow you to send error reports to an external service for monitoring and alerting.
- Custom Error Processing: You can modify the error handling logic to include custom processing, such as triggering notifications or logging errors to a file.

### Component error handling

If you want to handle errors which are provided from useAsyncData and render it inside component to provide user good understanding of what is happening you can make it inside component.

```vue
<script setup lang="ts">
const productStore = useProductStore()
const { error, status } = await useAsyncData('products', () => productStore.fetchAllProducts())
</script>

<template>
  <template v-if="error">
    <p>Failed to fetch products</p>
    <p>{{ error }}</p>
  </template>

  <div
    v-else
    class="product-wrapper"
  >
    <div
      v-for="product in productStore?.getFilteredProducts"
      :key="product.id"
      class="card"
    >
      <div class="title">
        {{ product.title }}
      </div>
      <div class="thumbnail">
        <img :src="product.image">
      </div>
      <div class="description">
        {{ product.description }}
      </div>
      <div class="wrapper-meta">
        <span class="price">${{ product.price }}</span>
        <span class="rate">☆ {{ product.rating.rate }}</span>
      </div>
    </div>
  </div>
</template>
```

### Error page (error.vue)

When Nuxt encounters a fatal error (any unhandled error on the server, or an error created with fatal: true on the client) it will either render a JSON response (if requested with Accept: application/json header) or trigger a full-screen error page.
By centralizing error handling, it helps maintain a consistent user experience and ensures that even when things go wrong, your users aren't left in the dark.
Whether handling server-side failures, client-side issues, or custom business logic errors, error.vue provides a flexible and customizable way to keep your application resilient.

### Testing

1. **Write and Run Tests:**
   - Write tests using Vitest and place your test files in the `app/tests` directory.
   - Run tests to ensure that your application functions correctly and remains stable.

## Additional Features

### Husky Setup for Commit Hooks

This project uses [Husky](https://typicode.github.io/husky/) to manage Git hooks, ensuring consistent commit messages and code quality. Below are details on how the hooks are configured and how to use them.

##### Hooks Configuration;

##### Commit Message Hook:

- File: .husky/commit-msg

The commit message hook ensures that all commit messages adhere to the @commitlint/config-conventional convention.
This helps maintain a consistent commit history and facilitates automated release notes and versioning.

##### Pre-commit Hook:

- File: .husky/pre-commit

The pre-commit hook runs before a commit is finalized. It executes linting and testing scripts defined in the npm run precommit command to ensure code quality and avoid committing code that might break the build or fail tests.

#### Customizing Hooks

##### Commit Message Hook:

You can customize the commit message validation by modifying the .commitlintrc or commitlint.config.js file. For example, to use a different configuration or add custom rules.

##### Pre-commit Hook

Update the npm run precommit command in the pre-commit hook to include additional scripts or change the existing ones based on your needs.

##### For more information on Husky and its configuration, refer to the [Husky documentation](https://typicode.github.io/husky/).

## Support

If you need assistance or have questions about the Barrage Nuxt 3 Boilerplate, please refer to the following resources:

### Documentation

- **Barrage Confluence Documentation**: For detailed guides, best practices, and internal documentation, visit our [Barrage Confluence](https://confluence.barrage.net/display/BD/Barrage+Nuxt+3+Boilerplate) pages.

- **Nuxt 3 Documentation**: For information on Nuxt 3 features, setup, and usage, refer to the [official Nuxt 3 documentation](https://nuxtjs.org/docs).

- **Vue 3 Documentation**: For comprehensive details on Vue 3, including its features and APIs, check out the [official Vue 3 documentation](https://vuejs.org/).

- **Vitest Documentation**: To learn more about Vitest and how to use it for testing, visit the [Vitest documentation](https://vitest.dev/).

- **Pinia Documentation**: For guidance on state management using Pinia, see the [Pinia documentation](https://pinia.vuejs.org/).

## Contributors

- **Mario Blazevic**

- **Bruno Spajic**
