<script setup lang="ts">
import { ref } from 'vue'
import { useAuthStore } from '~/stores/auth'

const auth = useAuthStore()

definePageMeta({
  layout: false,
  middleware: "guest",
})

const email = ref('')
const password = ref('')
const generalError = ref('')
const loading = ref(false)

const submit = async () => {
  generalError.value = ''

  const cleanEmail = email.value.trim().toLowerCase()
  const cleanPassword = password.value.trim()

  if (!cleanEmail || !cleanPassword) {
    generalError.value = 'Email and password are required'
    return
  }

  loading.value = true
  try {
    await auth.login(cleanEmail, cleanPassword)
    await navigateTo('/transactions')
  } catch (err: any) {
    const apiError = err?.data?.Error
    if (apiError) {
      generalError.value = apiError.Message || 'Login failed'
    } else {
      generalError.value = err?.message || 'Login failed'
    }
  } finally {
    loading.value = false
  }
}

</script>

<template>
  <div class="min-h-screen flex items-center justify-center bg-slate-100 px-4">
    <div class="w-full max-w-sm">
      <div class="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 p-8">
        <h1 class="text-2xl font-semibold text-slate-800 text-center tracking-tight">
          Sign in
        </h1>
        <p class="text-slate-500 text-sm text-center mt-1.5">
          Use your account to continue
        </p>

        <form class="mt-8 space-y-5" @submit.prevent="submit">
          <div
            v-if="generalError"
            role="alert"
            class="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3"
          >
            {{ generalError }}
          </div>

          <div>
            <label for="login-email" class="block text-sm font-medium text-slate-700 mb-1.5">
              Email
            </label>
            <input
              id="login-email"
              v-model="email"
              type="email"
              autocomplete="email"
              placeholder="you@example.com"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
              :disabled="loading"
            />
          </div>

          <div>
            <label for="login-password" class="block text-sm font-medium text-slate-700 mb-1.5">
              Password
            </label>
            <input
              id="login-password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              placeholder="••••••••"
              class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
              :disabled="loading"
            />
          </div>

          <button
            type="submit"
            class="w-full rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-4 transition focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none"
            :disabled="loading"
          >
            <span v-if="loading">Signing in…</span>
            <span v-else>Sign in</span>
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
