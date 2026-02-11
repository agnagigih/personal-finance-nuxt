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
  loading,
  error,
  updatePage,
  changePageSize
} = useTransactions()

</script>

<template>
  <div class="space-y-6">
    <div>
      <h1 class="text-2xl font-semibold text-stone-800 tracking-tight">
        Transactions
      </h1>
      <p class="text-stone-500 text-sm mt-1">
        Your income and expenses
      </p>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="bg-white rounded-2xl shadow-lg shadow-stone-200/50 border border-stone-200/80 overflow-hidden"
    >
      <div class="p-6 space-y-4">
        <div
          v-for="i in 5"
          :key="i"
          class="flex items-center gap-4 rounded-xl bg-stone-100/80 animate-pulse"
        >
          <div class="h-12 w-12 rounded-xl bg-stone-200/80 shrink-0" />
          <div class="flex-1 space-y-2">
            <div class="h-4 w-1/3 rounded bg-stone-200/80" />
            <div class="h-3 w-1/4 rounded bg-stone-200/60" />
          </div>
          <div class="h-5 w-16 rounded bg-stone-200/80 shrink-0" />
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
      class="bg-white rounded-2xl shadow-lg shadow-stone-200/50 border border-stone-200/80 p-12 text-center"
    >
      <p class="text-stone-500 text-sm">
        No transactions yet. Add one to get started.
      </p>
    </div>

    <!-- List -->
    <div
      v-else
      class="bg-white rounded-2xl shadow-lg shadow-stone-200/50 border border-stone-200/80 overflow-hidden"
    >
      <ul class="divide-y divide-stone-200/80">
        <li
          v-for="tx in transactions"
          :key="tx.id"
          class="flex flex-wrap items-center gap-3 sm:gap-4 px-4 py-4 sm:px-6 hover:bg-stone-50/80 transition"
        >
          <div
            class="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-lg font-medium"
            :class="tx.type === 'Income'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-red-100 text-red-700'"
          >
            {{ tx.type === 'Income' ? '+' : '−' }}
          </div>
          <div class="min-w-0 flex-1">
            <p class="font-medium text-stone-800 truncate">
              {{ tx.note && tx.note !== '-No note-' ? `${tx.note}` : '' }}
            </p>
            <p class="text-stone-500 text-sm truncate">
              {{ tx.accountName }}{{ tx.dateText ? ` · ${tx.dateText}` : '' }}{{ tx.categoryName ? ` · ${tx.categoryName}` : '' }}
            </p>
          </div>
          <p
            class="text-right font-semibold tabular-nums shrink-0"
            :class="tx.type === 'Income' ? 'text-emerald-600' : 'text-red-600'"
          >
            {{ tx.amountText }}
          </p>
        </li>
      </ul>
      <!-- Pagination + page size -->
      <Pagination
        :page="page"
        :total-pages="totalPages"
        :loading="loading"
        @change="updatePage"
      >
        <template #prepend>
          <div class="flex items-center gap-2">
            <label for="page-size" class="text-sm text-stone-500">
              Show
            </label>
            <select
              id="page-size"
              v-model.number="pageSize"
              @change="() => changePageSize(pageSize)"
              class="rounded-xl border border-stone-300 bg-white px-3 py-2 text-sm font-medium text-stone-700 transition hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50"
            >
              <option :value="10">10</option>
              <option :value="20">20</option>
              <option :value="50">50</option>
            </select>
            <span class="text-sm text-stone-500">per page</span>
          </div>
        </template>
      </Pagination>
    </div>
  </div>
</template>
