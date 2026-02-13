import { useRuntimeConfig } from '#app'
import { useAuthStore } from '~/stores/authStore'

/** Matches BE error shape: { Success, Data, Error: { Code, Message, Details } } */
export interface ApiErrorResponse {
  Success: false
  Data: null
  Error: {
    Code: string
    Message: string
    Details: unknown
  }
}

export const useApi = () => {
  const config = useRuntimeConfig()
  const auth = useAuthStore()

  return $fetch.create({
    baseURL: config.public.apiBase,

    onRequest({ options }) {
      if (auth.accessToken) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${auth.accessToken}`,
        }
      }
    },

    async onResponseError({ response, request, options }) {
      const body = (response as any)._data as ApiErrorResponse | undefined
      const throwApiError = () => {
        const err = new Error(body?.Error?.Message ?? 'Request failed') as Error & { data: ApiErrorResponse }
        err.data = body ?? { Success: false, Data: null, Error: { Code: 'Unknown', Message: 'Request failed', Details: null } }
        throw err
      }

      if (response.status !== 401) {
        throwApiError()
      }

      // Don't try refresh on login endpoint (invalid credentials → show error on page)
      const reqUrl = typeof request === 'string' ? request : (request as Request)?.url ?? ''
      const isLogin = reqUrl.endsWith('/auth/login')

      if (isLogin) {
        throwApiError()
      }

      type RetryFetchOptions = typeof options & { _retry?: boolean }
      const opts = options as RetryFetchOptions

      // prevent infinite loop
      if(options._retry) {
        auth.logout()
        return await navigateTo('/login')
      }

      options._retry = true

      try{
        await auth.refresh()
      } catch{
        auth.logout()
        return await navigateTo('/login')
      }

      return $fetch(request, options)
    }
  })
}
