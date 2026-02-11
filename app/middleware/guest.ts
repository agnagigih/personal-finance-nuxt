import { defineNuxtRouteMiddleware, navigateTo } from 'nuxt/app'

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return

  const auth = useAuthStore()
  auth.init()

  if (auth.isAuthenticated) {
    return navigateTo('/transactions')
  }
})
