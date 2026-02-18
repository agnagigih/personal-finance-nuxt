<script setup lang="ts">
import type { TransactionResponse } from '~/types/api/TransactionResponse';
import type { TransactionFormModel } from '~/types/form/TransactionFormModel';
import type { AccountView } from '~/types/view/accountView';
import type { CategoryView } from '~/types/view/CategoryView';

const route = useRoute()
const router = useRouter()
const toast = useToast()

const { getTransactionById, updateTransaction, deleteTransaction } = useTransactionApi()
const { getAccounts } = useAccountApi()
const { getCategories } = useCategoryApi()

const id = route.params.id as string
const loading = ref(false);
const error = ref<string | null>(null)
const showDeleteConfirm = ref(false)
const deleting = ref(false)

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

const maxDate = ref('')

onMounted(() => {
  maxDate.value = new Date().toISOString().slice(0, 10)
})


const handleUpdate = async(form : TransactionFormModel) => {
    loading.value = true
    error.value = null
    try {
        await updateTransaction(id, form)
        toast.success('Transaction updated successfully')
        router.push('/transactions')
    } catch (err: any) {
        error.value = err.message || 'Failed to update transaction'
    } finally {
        loading.value = false
    }
}

const handleDelete = async () => {
    deleting.value = true
    try {
        await deleteTransaction(id)
        toast.success('Transaction deleted')
        router.push('/transactions')
    } catch (err: any) {
        error.value = err.message || 'Failed to delete transaction'
    } finally {
        deleting.value = false
        showDeleteConfirm.value = false
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
        @submit="handleUpdate">
        <template #actions-start>
            <button
                type="button"
                @click="showDeleteConfirm = true"
                :disabled="loading || deleting"
                class="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-white px-4 py-2.5 text-sm font-medium text-red-700 transition hover:bg-red-50 hover:border-red-400 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                {{ deleting ? 'Deleting...' : 'Delete' }}
            </button>
        </template>
      </TransactionForm>
      <div v-if="showDeleteConfirm" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div class="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 space-y-4">
            <div class="flex items-start gap-4">
                <div class="shrink-0 w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                    <svg class="h-5 w-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>
                <div class="flex-1">
                    <h3 class="text-lg font-semibold text-slate-900">Delete Transaction</h3>
                    <p class="text-sm text-slate-600 mt-1">
                        Are you sure you want to delete this transaction? This action cannot be undone.
                    </p>
                </div>
            </div>
            <div class="flex gap-3 justify-end">
                <button
                    type="button"
                    @click="showDeleteConfirm = false"
                    :disabled="deleting"
                    class="px-4 py-2 text-sm font-medium text-slate-700 hover:text-slate-900 disabled:opacity-50"
                >
                    Cancel
                </button>
                <button
                    type="button"
                    @click="handleDelete"
                    :disabled="deleting"
                    class="px-4 py-2 rounded-xl bg-red-600 text-white text-sm font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {{ deleting ? 'Deleting...' : 'Delete' }}
                </button>
            </div>
        </div>
      </div>
    </div>
  </template>