<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTransactionApi } from '~/composables/useTransactionApi'
import { useAccountApi } from '~/composables/useAccountApi'
import { useCategoryApi } from '~/composables/useCategoryApi'
import type { AccountView } from '~/types/view/accountView'
import type { CategoryView } from '~/types/view/CategoryView'

definePageMeta({
    middleware: 'auth',
})

const { createTransaction } = useTransactionApi()
const { getAccounts } = useAccountApi()
const { getCategories } = useCategoryApi()

const toast = useToast()

const accounts = ref<AccountView[]>([])
const categories = ref<CategoryView[]>([])

const loading = ref(false)
const error = ref<string | null>(null)

const maxDate = ref('')

onMounted(async () => {
    if (import.meta.client) {
        maxDate.value = new Date().toISOString().slice(0, 10)
    }
    try {
        accounts.value = await getAccounts()
        categories.value = await getCategories()
    } catch (err) {
        error.value = 'Failed to load accounts or categories'
    } finally {
        loading.value = false
    }
})

async function handleCreate(formValue: any) {
    loading.value = true
    error.value = null
    
    try {
        await createTransaction({
            ...formValue,
            transactionDate: new Date(formValue.transactionDate).toISOString(),
        })
        toast.success('Transaction created successfully')
        await navigateTo('/transactions')
    } catch (err: any) {
        error.value = err.message || 'Failed to create transaction'
    } finally {
        loading.value = false
    }
}
</script>

<template>
  <div class="space-y-6">
    <div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 class="text-2xl font-semibold text-slate-800 tracking-tight">
          Create Transaction
        </h1>
        <p class="text-slate-500 text-sm mt-1">
          Add new income or expense
        </p>
      </div>
      <NuxtLink
        to="/transactions"
        class="inline-flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
      >
        <svg class="h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Transactions
      </NuxtLink>
    </div>

    <div class="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 overflow-hidden">
      <div class="p-6 sm:p-8 space-y-5">
        <div
          v-if="error"
          role="alert"
          class="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3"
        >
          {{ error }}
        </div>

        <TransactionForm
          :accounts="accounts"
          :categories="categories"
          :loading="loading"
          :max-date="maxDate"
          @submit="handleCreate"
        />
      </div>
    </div>
  </div>
</template>
