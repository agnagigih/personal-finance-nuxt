import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TransactionView } from '~/types/view/transactionView'
import { useTransactionApi } from '~/composables/useTransactionApi'
import { mapTransactionToView } from '~/mappers/transaction.mapper'

export const useTransactions = () => {
  const route = useRoute()
  const router = useRouter()

  const { getTransactions } = useTransactionApi()

  const transactions = ref<TransactionView[]>([])
  const page = ref(Number(route.query.page) || 1)
  const pageSize = ref(Number(route.query.pageSize) || 10)
  const totalPages = ref(1)
  const totalItems = ref(0)

  // Start true so server and client initial render both show loading (avoids hydration mismatch).
  const loading = ref(true)
  const error = ref<string | null>(null)

  const loadTransactions = async () => {
    loading.value = true
    error.value = null

    try {
      const paged = await getTransactions(page.value, pageSize.value)
      transactions.value = paged.items.map(mapTransactionToView)
      totalPages.value = paged.totalPages
      totalItems.value = paged.totalCount
    } catch (err) {
      error.value = 'Failed to load transactions'
      console.error(err)
    } finally {
      loading.value = false
    }
  }

  watch(
    () => route.query,
    async (query) => {
      page.value = Number(query.page) || 1
      pageSize.value = Number(query.pageSize) || 10
      await loadTransactions()
    },
    { immediate: true }
  )

  const updatePage = async (newPage: number) => {
    if (newPage === page.value) return

    await router.replace({
      query: {
        ...route.query,
        page: String(newPage),
        pageSize: String(pageSize.value),
      },
    })
  }

  const changePageSize = async (newSize: number) => {
    await router.replace({
      query: {
        ...route.query,
        page: '1',
        pageSize: String(newSize),
      },
    })
  }

  return {
    transactions,
    page,
    pageSize,
    totalPages,
    totalItems,
    loading,
    error,
    updatePage,
    changePageSize,
  }
}
