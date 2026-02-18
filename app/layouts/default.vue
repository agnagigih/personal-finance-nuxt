<script setup lang="ts">
import { useAuthStore } from '~/stores/authStore'
import ToastContainer from '~/components/ui/ToastContainer.vue';

const auth = useAuthStore()

const navItems = [
  { to: '/account', label: 'Account' },  
  { to: '/category', label: 'Category' },
  { to: '/transactions', label: 'Transactions' },
]
</script>

<template>
  <div class="min-h-screen flex flex-col bg-slate-100">
    <header class="sticky top-0 z-10 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-backdrop-filter:bg-white/80">
      <div class="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <NuxtLink
          to="/"
          class="text-lg font-semibold text-slate-800 tracking-tight transition hover:text-amber-600"
        >
          Personal Finance
        </NuxtLink>

        <div class="flex items-center gap-3">
          <ClientOnly>
            <template v-if="auth.isAuthenticated">
              <!-- Nav items when logged in -->
              <NuxtLink
                v-for="item in navItems"
                :key="item.to"
                :to="item.to"
                class="text-sm font-medium text-slate-600 transition hover:text-slate-900"
              >
                {{ item.label }}
              </NuxtLink>
              
              <!-- Sign out button -->
              <button
                type="button"
                class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                @click="auth.logout()"
              >
                Sign out
              </button>
            </template>

            <template v-else>
              <!-- Sign in button when not logged in -->
              <NuxtLink
                to="/login"
                class="rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              >
                Sign in
              </NuxtLink>
            </template>
          </ClientOnly>
        </div>
      </div>
    </header>

    <main class="flex-1 px-4 py-6 sm:px-6">
      <div class="mx-auto max-w-5xl">
        <NuxtPage />
      </div>
    </main>
    
    <ToastContainer />
  </div>
</template>