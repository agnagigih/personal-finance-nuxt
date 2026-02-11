import { defineStore } from 'pinia'
import type { ApiResponse } from '~/types/api/ApiResponse'

interface AuthResponse {
  accessToken: string
  refreshToken: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    accessToken: null as string | null,
    refreshToken: null as string | null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.accessToken,
  },

  actions: {
    init() {
      if (import.meta.client) {
        this.accessToken = localStorage.getItem('accessToken')
        this.refreshToken = localStorage.getItem('refreshToken')
      }
    },

    async login(email: string, password: string) {
      const api = useApi()
      const res = await api<ApiResponse<AuthResponse>>('/auth/login', {
        method: 'POST',
        body: { email, password },
      })

      this.accessToken = res.data?.accessToken ?? null
      this.refreshToken = res.data?.refreshToken ?? null

      localStorage.setItem('accessToken', this.accessToken ?? '')
      localStorage.setItem('refreshToken', this.refreshToken ?? '')
    },

    async refresh() {
      if (!this.refreshToken) {
        throw new Error('No refresh token')
      }

      const api = useApi()
      const res = await api<ApiResponse<AuthResponse>>('/auth/refresh', {
        method: 'POST',
        body: { refreshToken: this.refreshToken },
      })

      this.accessToken = res.data?.accessToken ?? null
      this.refreshToken = res.data?.refreshToken ?? null

      localStorage.setItem('accessToken', this.accessToken ?? '')
      localStorage.setItem('refreshToken', this.refreshToken ?? '')
    },

    async logout() {
      try {
        if (this.refreshToken) {
          const api = useApi()
          await api('/auth/logout', {
            method: 'POST',
            body: { refreshToken: this.refreshToken },
          })
        }
      } catch {
        // ignore backend logout failure
      } finally {
        this.accessToken = null
        this.refreshToken = null

        if (import.meta.client) {
          localStorage.removeItem('accessToken')
          localStorage.removeItem('refreshToken')
        }
      }

      await navigateTo('/login')
    },
  },
})
