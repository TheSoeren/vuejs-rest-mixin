import { createErrorToast } from './toast'

let baseUrl = ''
export function setBaseUrl (url) {
  if (!url) { return }
  baseUrl = url
  if (!url.endsWith('/')) {
    baseUrl += '/'
  }
}

async function getResponse (requestUrl, withBaseUrl = true, config = {}) {
  const defaultConfig = { headers: {} }

  if (withBaseUrl) {
    requestUrl = baseUrl + requestUrl
  }

  if (process.env.NODE_ENV !== 'production') {
    // LIFERAY_USER & LIFERAY_PASSWORD from liferay.portlet.config.js
    defaultConfig.headers.Authorization = 'Basic ' + btoa(LIFERAY_USER + ':' + LIFERAY_PASSWORD)
  } else {
    defaultConfig.headers['X-CSRF-TOKEN'] = Liferay.authToken
  }

  const finalConfig = Object.assign(defaultConfig, config)
  try {
    return await fetch(requestUrl, finalConfig)
  } catch (e) {
    createErrorToast(`Error while fetching request with url ${requestUrl}! ${e}`)
  }

  return null
}

async function sendPostRequest (body, url) {
  return getResponse(
    `${url}?p_auth=${Liferay.authToken}`,
    true,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: body
    }
  )
}

// Export to use in customer specific rest methods
export { getResponse, sendPostRequest }

// Export to use toast globally in Vue
export default {
  install (Vue, options) {
    Vue.mixin({
      methods: {
        getResponse,
        sendPostRequest
      }
    })
  }
}
