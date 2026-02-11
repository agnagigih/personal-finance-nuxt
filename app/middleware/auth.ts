import { defineNuxtRouteMiddleware, navigateTo } from "nuxt/app";

export default defineNuxtRouteMiddleware(() => {
  // Server has no localStorage; only enforce auth after client hydrates from it
  if (import.meta.server) return

  const auth = useAuthStore()
  // if (!auth.accessToken) {
    auth.init()
  // }

  if (!auth.isAuthenticated) {
    return navigateTo('/login')
  }
})
