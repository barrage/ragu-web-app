import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Placeholder for a global error handler that could be integrated with a third-party service in the future.
  // This is where you could send errors to an external logging service, like Sentry or LogRocket.
  /*
  nuxtApp.vueApp.config.errorHandler = (error, instance, info) => {
    // handle error, e.g., report to a service
    // Example:
    // myLoggingService.logError({
    //   error,
    //   instance,
    //   info,
    // })
  }
  */

  // Hook into Vue's error handling mechanism. This will allow us to capture and handle errors
  // that occur within Vue components. The hook `vue:error` is called whenever an error
  // bubbles up to the global Vue instance.
  nuxtApp.hook('vue:error', (error, instance, info) => {
    // These will be used in case the actual error object, stack trace, component name,
    // or additional info are not available, ensuring that the error logs are always complete.
    const defaultErrorMessage = 'An unknown error occurred'
    const defaultStackTrace = 'No stack trace available'
    const defaultComponentName = 'Unknown component'
    const defaultErrorInfo = 'No additional info'

    // Start with the default values and then override them as we extract more specific details.
    let errorMessage = defaultErrorMessage
    let stackTrace = defaultStackTrace
    let componentName = defaultComponentName
    let errorInfo = defaultErrorInfo

    // This allows us to extract the message and stack trace from the error, which are standard properties of JavaScript errors.
    if (error instanceof Error) {
      errorMessage = error.message || defaultErrorMessage
      stackTrace = error.stack || defaultStackTrace
    }

    // `instance.$options.__name` is a convention in Vue to get the name of a component.
    // If the component name is not available, we fall back to the default name.
    if (instance && instance.$options) {
      componentName = instance.$options.__name || defaultComponentName
    }

    // This could be a string describing where the error occurred, or an object with more details.
    // We check the type of `info` and extract the relevant details accordingly.
    if (typeof info === 'string') {
      errorInfo = info
    }
    else if (typeof info === 'object' && info && 'component' in info) {
      errorInfo = (info as any).component || defaultErrorInfo
    }

    const errorDetails = {
      'Error Message': errorMessage,
      'Stack Trace': stackTrace,
      'Component Name': componentName,
      'Additional Info': errorInfo,
    }

    console.error('Vue Error Captured:', errorDetails)
  })
})
