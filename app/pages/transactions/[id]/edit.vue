<script setup lang="ts">
import type { TransactionResponse } from '~/types/api/TransactionResponse';
import type { TransactionFormModel } from '~/types/form/TransactionFormModel';
import type { AccountView } from '~/types/view/accountView';
import type { CategoryView } from '~/types/view/CategoryView';

const route = useRoute()
const router = useRouter()

const { getTransactionById, updateTransaction } = useTransactionApi()
const { getAccounts } = useAccountApi()
const { getCategories } = useCategoryApi()

const id = route.params.id as string
const loading = ref(false);
const error = ref<string | null>(null)

const [{ data: rawTransaction }, { data: accounts }, { data: categories }] = await Promise.all([
    useAsyncData(`transaction-${id}`, () => getTransactionById(id)),
    useAsyncData('accounts', () => getAccounts()),
    useAsyncData('categories', () => getCategories()),
])

const transaction = computed<TransactionFormModel | null>(() => {
    const data = rawTransaction.value
    if (!data) return null
    return {
        accountId: data.accountId ?? '',
        categoryId: data.categoryId ?? '',
        amount: data.amount ?? 0,
        type: data.type ?? 1,
        transactionDate: data.transactionDate?.slice(0, 10) ?? '',
        note: data.note ?? ''
    }
})

const maxDate = computed(() => new Date().toISOString().slice(0, 10))

const handleUpdate = async(form : TransactionFormModel) => {
    loading.value = true
    error.value = null
    try {
        await updateTransaction(id, form)
        router.push('/transactions')
    } catch (err: any) {
        error.value = err.message || 'Failed to update transaction'
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
            Edit Transaction
            </h1>
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
      <TransactionForm
        v-if="transaction"
        :accounts="accounts ?? []"
        :categories="categories ?? []"
        :initial-value="transaction"
        :loading="loading"
        :max-date="maxDate"
        @submit="handleUpdate"
      />
    </div>
  </template>