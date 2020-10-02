const ToastType = {
  SUCCESS: 'success',
  WARNING: 'warning',
  DANGER: 'danger',
  INFO: 'info'
}

function createResponseToast (title, message, type) {
  Liferay.Util.openToast({ title, message, type })
}

function createInfoToast (message) {
  createResponseToast('Info', message, ToastType.INFO)
}

function createSuccessToast (message) {
  createResponseToast('Success', message, ToastType.SUCCESS)
}

function createErrorToast (message) {
  createResponseToast('Error', message, ToastType.DANGER)
}

function createWarningToast (message) {
  createResponseToast('Warning', message, ToastType.WARNING)
}

// Export to use toast in rest methods
export { createErrorToast }

// Export to use toast globally in Vue
export default {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        createResponseToast,
        createInfoToast,
        createSuccessToast,
        createErrorToast,
        createWarningToast
      }
    })
  }
}
