<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()
</script>

<template>
  <div class="min-h-screen flex flex-col bg-stone-100">
    <header class="sticky top-0 z-10 border-b border-stone-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <NuxtLink
          to="/transactions"
          class="text-lg font-semibold text-stone-800 tracking-tight transition hover:text-amber-600"
        >
          Personal Finance
        </NuxtLink>

        <div class="flex items-center gap-3">
          <NuxtLink
            v-if="auth.isAuthenticated"
            to="/transactions"
            class="text-sm font-medium text-stone-600 transition hover:text-stone-900"
          >
            Transactions
          </NuxtLink>
          <button
            v-if="auth.isAuthenticated"
            type="button"
            class="rounded-lg border border-stone-300 bg-white px-3 py-1.5 text-sm font-medium text-stone-700 transition hover:bg-stone-50 hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            @click="auth.logout()"
          >
            Sign out
          </button>
        </div>
      </div>
    </header>

    <main class="flex-1 px-4 py-6 sm:px-6">
      <div class="mx-auto max-w-5xl">
        <NuxtPage />
      </div>
    </main>
  </div>
</template>