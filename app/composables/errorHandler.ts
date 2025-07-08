import { createError } from 'nuxt/app'
import type { NuxtError } from 'nuxt/app'
import type { Ref } from 'vue'
import { debounce } from 'lodash-es'
import { type FetchContext, FetchError } from 'ofetch'

export const useApiErrorHandler = async (
  context: FetchContext<any, any>,
): Promise<void> => {
  const { response } = context
  const authStore = useAuthStore()
  const router = useRouter()

  if (!response) {
    throw new FetchError('API request failed, no response available', {
      cause: 'No response',
    })
  }
  const status = response.status
  const data = response._data

  switch (status) {
    case 401:
      console.error('Unauthorized access - redirecting to login...')
      authStore.POST_Logout().then(() => {
        router.push('/login')
      })

      break

    case 404:
      console.error('Page not found')
      throw createError({
        statusCode: 404,
        message: 'Page not found. Please check the URL.',
      })

    case 500:
      console.error('Server error occurred', data)
      throw createError({
        statusCode: 500,
        message: 'Internal server error. Please try again later.',
      })

    default:
      console.error(`Error ${status}: ${data?.message || 'Unknown error'}`)
      throw new FetchError(`API request failed with status ${status}`, {
        cause: `Error status: ${status}`,
      })
  }
}

/**
 * Handles errors by either displaying a notification for non-fatal client-side errors
 * or triggering Nuxt's global error handling mechanism for fatal errors or server-side errors.
 *
 * @param error - A reactive reference to an error object or undefined.
 * @param fatal - A boolean indicating if the error should be treated as fatal. Defaults to false.
 */
export const errorHandler = (error: Ref<NuxtError | undefined>, fatal: boolean = false) => {
  const { $i18n } = useNuxtApp()
  const t = $i18n.t

  // Debounced function to display error notifications, preventing multiple notifications from being shown in quick succession.
  const debouncedNotify = debounce((currentError: NuxtError) => {
    if (import.meta.client) {
      // Determine the error message based on the status code
      let errorMessage = t('error_notifications.default') // Default message

      switch (currentError.statusCode) {
        case 400:
          errorMessage = t('error_notifications.status_400')
          break
        case 401:
          errorMessage = t('error_notifications.status_401')
          break
        case 403:
          errorMessage = t('error_notifications.status_403')
          break
        case 404:
          errorMessage = t('error_notifications.status_404')
          break
        case 422:
          errorMessage = t('error_notifications.status_422')
          break
        case 500:
          console.error(currentError)
          errorMessage = t('error_notifications.status_500')
          break
        case 503:
          errorMessage = t('error_notifications.status_503')
          break
      }

      // Show the notification with the specific message for each error
      ElNotification({
        title: 'Error',
        message: errorMessage,
        type: 'error',
        customClass: 'error',
        duration: 2500,
      })
    }
  }, 500) // 500ms delay to space out the notifications.

  // Main error handling function.
  const handleError = (currentError: NuxtError | undefined) => {
    if (!currentError) { return }

    if (fatal) {
      // For fatal errors, throw the error immediately to trigger Nuxt's global error handling.
      throw createError({
        statusCode: currentError.statusCode || 500,
        statusMessage: currentError.message || 'An unknown error occurred',
        fatal,
      })
    }
    else {
      // Handle non-fatal errors by displaying a notification, using the throttled function to manage frequency.
      debouncedNotify(currentError)
    }
  }

  // Watch the `error` reference for changes and handle the error when it occurs.
  watch(error, handleError, { immediate: true })
}
