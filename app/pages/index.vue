<!-- pages/index.vue -->
<script setup lang="ts">
import { useAuthStore } from '~/stores/authStore'

const auth = useAuthStore()

// Dashboard data (only loaded if authenticated)
const { data, loading, error, getMonthlyReport } = useReport()

// Current year & month
const now = new Date()
const selectedYear = ref(now.getFullYear().toString())
const selectedMonth = ref((now.getMonth() + 1).toString())

// Only fetch report if authenticated
onMounted(() => {
  if (auth.isAuthenticated) {
    getMonthlyReport(selectedYear.value, selectedMonth.value)
  }
})

watch(
  [selectedYear, selectedMonth],
  ([year, month]) => {
    if (auth.isAuthenticated) {
      getMonthlyReport(year, month)
    }
  }
)

const formatCurrency = (value: number) =>
  new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(value)

// Generate year options (current year ± 5 years)
const yearOptions = computed(() => {
  const currentYear = now.getFullYear()
  const years = []
  for (let i = currentYear - 5; i <= currentYear + 5; i++) {
    years.push(i.toString())
  }
  return years
})

// Month options
const monthOptions = [
  { value: '1', label: 'January' },
  { value: '2', label: 'February' },
  { value: '3', label: 'March' },
  { value: '4', label: 'April' },
  { value: '5', label: 'May' },
  { value: '6', label: 'June' },
  { value: '7', label: 'July' },
  { value: '8', label: 'August' },
  { value: '9', label: 'September' },
  { value: '10', label: 'October' },
  { value: '11', label: 'November' },
  { value: '12', label: 'December' },
]

// Landing page data
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
  <!-- ========================================== -->
  <!-- LANDING PAGE (Not Authenticated)          -->
  <!-- ========================================== -->
  <div v-if="!auth.isAuthenticated" class="space-y-12">
    <section class="relative overflow-hidden rounded-2xl bg-white border border-slate-200/80 shadow-lg shadow-slate-200/50 px-6 py-16 sm:px-10 sm:py-20">
      <div class="absolute inset-0 bg-gradient-to-br from-amber-50/50 via-white to-slate-50/30" />
      
      <!-- Content -->
      <div class="relative mx-auto max-w-3xl text-center">
        <div class="inline-flex items-center gap-2 rounded-full bg-amber-100 px-4 py-2 text-sm font-medium text-amber-800 mb-6">
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
          Simple. Powerful. Yours.
        </div>
        
        <h1 class="text-4xl font-bold text-slate-800 tracking-tight sm:text-5xl md:text-6xl">
          Take control of your
          <span class="text-amber-600">personal finances</span>
        </h1>
        
        <p class="mt-6 text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
          Track every transaction, manage multiple accounts, and understand your spending patterns—all in one clean, intuitive dashboard.
        </p>
        
        <div class="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 active:scale-[0.98]"
          >
            Get Started Free
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
          
          <NuxtLink
            to="/login"
            class="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-6 py-3 text-base font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          >
            Sign In
          </NuxtLink>
        </div>

        <!-- Social proof / trust indicator -->
        <p class="mt-8 text-sm text-slate-500">
          No credit card required • Free forever
        </p>
      </div>
    </section>

    <!-- Features Grid -->
    <section>
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
          Everything you need
        </h2>
        <p class="mt-3 text-lg text-slate-600 max-w-2xl mx-auto">
          Powerful features designed to keep your finances organized and your mind at ease.
        </p>
      </div>

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <!-- Feature 1 -->
        <div class="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition hover:shadow-xl hover:border-amber-200">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 text-green-700 mb-4">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-800 mb-2">
            Track Every Transaction
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            Log income and expenses instantly. Categorize transactions and see exactly where your money goes each month.
          </p>
        </div>

        <!-- Feature 2 -->
        <div class="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition hover:shadow-xl hover:border-amber-200">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-blue-700 mb-4">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-800 mb-2">
            Manage Multiple Accounts
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            Bank accounts, cash, credit cards—keep them all in sync. View balances and movements at a glance.
          </p>
        </div>

        <!-- Feature 3 -->
        <div class="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition hover:shadow-xl hover:border-amber-200">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-700 mb-4">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-800 mb-2">
            Visual Reports
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            Monthly breakdowns by category. Understand spending patterns and make better financial decisions.
          </p>
        </div>

        <!-- Feature 4 -->
        <div class="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition hover:shadow-xl hover:border-amber-200">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-purple-700 mb-4">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-800 mb-2">
            Custom Categories
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            Create categories that match your lifestyle. Organize transactions your way, not ours.
          </p>
        </div>

        <!-- Feature 5 -->
        <div class="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition hover:shadow-xl hover:border-amber-200">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-700 mb-4">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-800 mb-2">
            Secure & Private
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            Your financial data is yours alone. No ads, no tracking, no selling your information.
          </p>
        </div>

        <!-- Feature 6 -->
        <div class="group rounded-2xl border border-slate-200/80 bg-white p-6 shadow-lg shadow-slate-200/50 transition hover:shadow-xl hover:border-amber-200">
          <div class="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-700 mb-4">
            <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-slate-800 mb-2">
            Lightning Fast
          </h3>
          <p class="text-slate-600 text-sm leading-relaxed">
            Built for speed. Add transactions in seconds, view reports instantly. No waiting around.
          </p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="relative overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-amber-50 via-amber-50/50 to-orange-50/30 px-6 py-12 sm:py-16 text-center">
      <div class="relative">
        <h2 class="text-3xl font-bold text-slate-800 sm:text-4xl">
          Ready to get started?
        </h2>
        <p class="mx-auto mt-4 max-w-xl text-lg text-slate-600">
          Join thousands of people taking control of their finances. No credit card required.
        </p>
        
        <div class="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <NuxtLink
            to="/register"
            class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-amber-500/25 transition hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 active:scale-[0.98]"
          >
            Create Free Account
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </NuxtLink>
          
          <NuxtLink
            to="/login"
            class="text-base font-medium text-slate-700 hover:text-amber-600 transition"
          >
            Already have an account? <span class="underline">Sign in</span>
          </NuxtLink>
        </div>

        <!-- Trust badges -->
        <div class="mt-10 flex items-center justify-center gap-8 text-sm text-slate-500">
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Free forever
          </div>
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            No credit card
          </div>
          <div class="flex items-center gap-2">
            <svg class="h-5 w-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Cancel anytime
          </div>
        </div>
      </div>
    </section>
  </div>

  <!-- ========================================== -->
  <!-- DASHBOARD (Authenticated)                  -->
  <!-- ========================================== -->
  <div v-else class="space-y-6">
    <!-- Header with Month/Year Selector -->
    <div class="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-slate-800 tracking-tight">
          Dashboard
        </h1>
        <p class="text-sm text-slate-500 mt-1">
          Monthly financial overview
        </p>
      </div>

      <!-- Period Selector -->
      <div class="flex items-center gap-3">
        <!-- Month Dropdown -->
        <select
          v-model="selectedMonth"
          class="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50"
          :disabled="loading"
        >
          <option
            v-for="month in monthOptions"
            :key="month.value"
            :value="month.value"
          >
            {{ month.label }}
          </option>
        </select>

        <!-- Year Dropdown -->
        <select
          v-model="selectedYear"
          class="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50"
          :disabled="loading"
        >
          <option
            v-for="year in yearOptions"
            :key="year"
            :value="year"
          >
            {{ year }}
          </option>
        </select>
      </div>
    </div>

    <!-- Loading -->
    <div 
      v-if="loading" 
      class="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 overflow-hidden"
    >
      <div class="p-6 space-y-4">
        <div class="grid gap-6 sm:grid-cols-3">
          <div 
            v-for="i in 3" 
            :key="i"
            class="h-24 rounded-xl bg-slate-100/80 animate-pulse"
          />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      role="alert"
      class="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3"
    >
      {{ error || 'Failed to load report' }}
    </div>

    <!-- Dashboard Content -->
    <div v-else-if="data" class="space-y-6">
      <!-- Summary Cards -->
      <div class="grid gap-6 sm:grid-cols-3">
        <!-- Income Card -->
        <div class="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 border border-slate-200/80 transition hover:shadow-xl">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-slate-500">Income</p>
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
              <svg class="h-5 w-5 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
              </svg>
            </div>
          </div>
          <p class="mt-3 text-2xl font-semibold text-green-600 tabular-nums">
            {{ formatCurrency(data.income || 0) }}
          </p>
        </div>

        <!-- Expense Card -->
        <div class="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 border border-slate-200/80 transition hover:shadow-xl">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-slate-500">Expense</p>
            <div class="flex h-10 w-10 items-center justify-center rounded-xl bg-red-100">
              <svg class="h-5 w-5 text-red-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
              </svg>
            </div>
          </div>
          <p class="mt-3 text-2xl font-semibold text-red-600 tabular-nums">
            {{ formatCurrency(data.expense || 0) }}
          </p>
        </div>

        <!-- Net Balance Card -->
        <div class="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 border border-slate-200/80 transition hover:shadow-xl">
          <div class="flex items-center justify-between">
            <p class="text-sm font-medium text-slate-500">Net Balance</p>
            <div 
              class="flex h-10 w-10 items-center justify-center rounded-xl"
              :class="data.nett >= 0 ? 'bg-green-100' : 'bg-red-100'"
            >
              <svg class="h-5 w-5" :class="data.nett >= 0 ? 'text-green-700' : 'text-red-700'" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
          </div>
          <p
            class="mt-3 text-2xl font-semibold tabular-nums"
            :class="data.nett >= 0 ? 'text-green-600' : 'text-red-600'"
          >
            {{ formatCurrency(data.nett || 0) }}
          </p>
        </div>
      </div>

      <!-- Category Breakdown -->
      <div class="grid gap-6 md:grid-cols-2">
        <!-- Income By Category -->
        <div class="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 border border-slate-200/80">
          <h2 class="text-lg font-semibold text-slate-800 tracking-tight mb-4">
            Income by Category
          </h2>
          <div
            v-if="data.incomeByCategory?.length"
            class="space-y-3"
          >
            <div
              v-for="item in data.incomeByCategory"
              :key="item.category"
              class="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
            >
              <span class="text-sm text-slate-600">
                {{ item.category }}
              </span>
              <span class="text-sm font-semibold text-green-600 tabular-nums">
                {{ formatCurrency(item.amount) }}
              </span>
            </div>
          </div>
          <div
            v-else
            class="flex flex-col items-center justify-center py-8 text-center"
          >
            <p class="text-sm text-slate-400">
              No income data for this period.
            </p>
          </div>
        </div>

        <!-- Expense By Category -->
        <div class="rounded-2xl bg-white p-6 shadow-lg shadow-slate-200/50 border border-slate-200/80">
          <h2 class="text-lg font-semibold text-slate-800 tracking-tight mb-4">
            Expense by Category
          </h2>
          <div
            v-if="data.expenseByCategory?.length"
            class="space-y-3"
          >
            <div
              v-for="item in data.expenseByCategory"
              :key="item.category"
              class="flex items-center justify-between py-2 border-b border-slate-100 last:border-0"
            >
              <span class="text-sm text-slate-600">
                {{ item.category }}
              </span>
              <span class="text-sm font-semibold text-red-600 tabular-nums">
                {{ formatCurrency(item.amount) }}
              </span>
            </div>
          </div>
          <div
            v-else
            class="flex flex-col items-center justify-center py-8 text-center"
          >
            <p class="text-sm text-slate-400">
              No expense data for this period.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.landing {
  font-family: 'DM Sans', system-ui, sans-serif;
}
</style>