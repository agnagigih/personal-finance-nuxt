<script setup lang="ts">
import { useTransactions } from '~/composables/useTransactions'

definePageMeta({
  middleware: 'auth',
})

const {
  transactions,
  page,
  pageSize,
  totalPages,
  totalItems,
  loading,
  error,
  updatePage,
  changePageSize
} = useTransactions()

function goToCreate() {
  navigateTo('/transactions/create')
}

</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-slate-800 tracking-tight">
          Transactions
        </h1>
        <p class="text-slate-500 text-sm mt-1">
          Your income and expenses
        </p>
      </div>
      <div>
        <button
        v-if="!loading"
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-2.5 shadow-sm hover:shadow transition focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 active:scale-[0.98]"
        @click="goToCreate"
      >
          <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Transaction
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 overflow-hidden"
    >
      <div class="p-6 space-y-4">
        <div
          v-for="i in 5"
          :key="i"
          class="flex items-center gap-4 rounded-xl bg-slate-100/80 animate-pulse"
        >
          <div class="h-12 w-12 rounded-xl bg-slate-200/80 shrink-0" />
          <div class="flex-1 space-y-2">
            <div class="h-4 w-1/3 rounded bg-slate-200/80" />
            <div class="h-3 w-1/4 rounded bg-slate-200/60" />
          </div>
          <div class="h-5 w-16 rounded bg-slate-200/80 shrink-0" />
        </div>
      </div>
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      role="alert"
      class="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3"
    >
      {{ error }}
    </div>

    <!-- Empty -->
    <div
      v-else-if="!transactions.length"
      class="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 p-12 text-center"
    >
      <p class="text-slate-500 text-sm">
        No transactions yet. Add one to get started.
      </p>
    </div>

    <!-- List -->
    <div
      v-else
      class="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 overflow-hidden"
    >
      <ul class="divide-y divide-slate-200/80">
        <li
          v-for="tx in transactions"
          :key="tx.id"
          class="flex flex-wrap items-center gap-3 sm:gap-4 px-4 py-4 sm:px-6 hover:bg-slate-50/80 transition"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-medium"
            :class="tx.type === 'Income'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'"
          >
            {{ tx.type === 'Income' ? '+' : '−' }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-medium text-slate-800 truncate">
              {{ tx.note && tx.note !== '-No note-' ? `${tx.note}` : '' }}
            </p>
            <p class="text-slate-500 text-sm truncate">
              {{ tx.accountName }}{{ tx.dateText ? ` · ${tx.dateText}` : '' }}{{ tx.categoryName ? ` · ${tx.categoryName}` : '' }}
            </p>
          </div>
          <p
            class="text-right font-semibold tabular-nums shrink-0"
            :class="tx.type === 'Income' ? 'text-green-600' : 'text-red-600'"
          >
            {{ tx.amountText }}
          </p>
          <NuxtLink :to="`/transactions/${tx.id}/edit`" 
            class="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50">
            Edit
          </NuxtLink>
        </li>
      </ul>
      <!-- Pagination + page size -->
      <Pagination
        :page="page"
        :total-pages="totalPages"
        :total-items="totalItems"
        :loading="loading"
        item-label="transaction"
        @change="updatePage"
      >
        <template #prepend>
          <div class="flex items-center gap-2">
            <label for="page-size" class="text-sm text-slate-500">
              Show
            </label>
            <select
              id="page-size"
              v-model.number="pageSize"
              @change="() => changePageSize(pageSize)"
              class="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50"
            >
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
            <span class="text-sm text-slate-500">per page</span>
          </div>
        </template>
      </Pagination>
    </div>
  </div>
</template>
