<script setup lang="ts">
import { useAuthStore } from '~/stores/auth'

useHead({
  link: [
    {
      rel: 'preconnect',
      href: 'https://fonts.googleapis.com',
    },
    {
      rel: 'preconnect',
      href: 'https://fonts.gstatic.com',
      crossorigin: '',
    },
    {
      rel: 'stylesheet',
      href: 'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap',
    },
  ],
})

const auth = useAuthStore()

const features = [
  {
    title: 'Track every transaction',
    description: 'Log income and expenses in one place. Categorize and search so you always know where your money goes.',
    icon: '💰',
  },
  {
    title: 'Manage multiple accounts',
    description: 'Bank accounts, cash, savings—keep them all in sync. See balances and movements at a glance.',
    icon: '🏦',
  },
  {
    title: 'Stay in control',
    description: 'Simple, focused tools to help you understand your spending and plan ahead without the clutter.',
    icon: '📊',
  },
]
</script>

<template>
  <div class="landing">
    <!-- Hero -->
    <section class="relative overflow-hidden rounded-3xl bg-linear-to-br from-slate-800 via-slate-800 to-slate-900 px-6 py-16 text-white sm:px-10 sm:py-24 md:px-14 md:py-28">
      <div class="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(245,158,11,0.2),transparent)]" />
      <div class="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-amber-500/30 to-transparent" />
      <div class="relative mx-auto max-w-3xl text-center">
        <h1
          class="font-serif text-4xl font-normal tracking-tight text-white sm:text-5xl md:text-6xl"
          style="font-family: 'DM Serif Display', serif;"
        >
          Your money,<br />
          <span class="text-amber-400">clearly in view</span>
        </h1>
        <p class="mt-5 text-lg text-slate-300 sm:text-xl">
          A simple way to track transactions, manage accounts, and understand your finances—without the overwhelm.
        </p>
        <div class="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <NuxtLink
            v-if="!auth.isAuthenticated"
            to="/login"
            class="inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Sign in
          </NuxtLink>
          <NuxtLink
            v-else
            to="/transactions"
            class="inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-base font-semibold text-slate-900 shadow-lg shadow-amber-500/25 transition hover:bg-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 focus:ring-offset-slate-800"
          >
            Go to dashboard
          </NuxtLink>
          <NuxtLink
            v-if="!auth.isAuthenticated"
            to="/login"
            class="inline-flex items-center justify-center rounded-xl border border-slate-500/60 bg-transparent px-6 py-3 text-base font-medium text-slate-200 transition hover:border-slate-400 hover:bg-white/5"
          >
            Get started
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Features -->
    <section class="mt-16 sm:mt-20">
      <h2 class="text-center text-2xl font-semibold tracking-tight text-slate-800 sm:text-3xl">
        Everything you need, nothing you don’t
      </h2>
      <p class="mx-auto mt-2 max-w-xl text-center text-slate-500">
        Built for people who want clarity over complexity.
      </p>
      <ul class="mx-auto mt-12 grid max-w-4xl gap-8 sm:grid-cols-2 lg:grid-cols-3">
        <li
          v-for="(feature, i) in features"
          :key="i"
          class="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm transition hover:border-slate-300/80 hover:shadow-md"
        >
          <span class="text-3xl" aria-hidden="true">{{ feature.icon }}</span>
          <h3 class="mt-4 text-lg font-semibold text-slate-800">
            {{ feature.title }}
          </h3>
          <p class="mt-2 text-slate-600">
            {{ feature.description }}
          </p>
        </li>
      </ul>
    </section>

    <!-- CTA -->
    <section class="mt-20 rounded-3xl border border-amber-200/80 bg-amber-50/80 px-6 py-12 text-center sm:py-16">
      <h2 class="text-xl font-semibold text-slate-800 sm:text-2xl">
        Ready to take control?
      </h2>
      <p class="mx-auto mt-2 max-w-md text-slate-600">
        Sign in to start tracking your transactions and managing your accounts.
      </p>
      <NuxtLink
        v-if="!auth.isAuthenticated"
        to="/login"
        class="mt-6 inline-flex items-center justify-center rounded-xl bg-amber-500 px-6 py-3 text-base font-semibold text-slate-900 transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-amber-50"
      >
        Sign in
      </NuxtLink>
    </section>
  </div>
</template>

<style scoped>
.landing {
  font-family: 'DM Sans', system-ui, sans-serif;
}
</style>
