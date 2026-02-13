<script setup lang="ts">
interface TransactionFormModel {
    accountId: string
    categoryId: string
    amount: number
    type: number
    transactionDate: string
    note: string
}

const props = defineProps<{
    accounts: { id: string; name: string }[]
    categories: { id: string; name: string }[]
    initialValue?: TransactionFormModel
    loading?: boolean
    maxDate: string
}>()

const emits = defineEmits<{
    (e: 'submit', value: TransactionFormModel) : void
}>()

const form = ref<TransactionFormModel>({
    accountId: '',
    categoryId: '',
    amount: 0,
    type: 1,
    transactionDate: new Date().toISOString().slice(0, 10),
    note: '',
})

const formErrors = ref({
    accountId: '',
    categoryId: '',
    amount: '',
    transactionDate: '',
    note: ''
})

// const maxDate = ref('')

watch(
    () => props.initialValue,
    (val) => {
        if (val) {
            form.value = { ... val }
        }
    },
    { immediate: true }
)

function validate() {
    formErrors.value = {
        accountId: '',
        categoryId: '',
        amount: '',
        transactionDate: '',
        note: ''
    }

    let isValid = true
    
    if (!form.value.accountId) {
        formErrors.value.accountId = 'Account is required'
        isValid = false
    }

    if (!form.value.categoryId) {
        formErrors.value.categoryId = 'Category is required'
        isValid = false
    }

    if (!form.value.amount || form.value.amount <= 0) {
        formErrors.value.amount = 'Amount must be greater than 0'
        isValid = false
    }

    if (!form.value.transactionDate) {
        formErrors.value.transactionDate = 'Date is required'
    }
    else if (new Date(form.value.transactionDate) > new Date(props.maxDate)) {
        formErrors.value.transactionDate = 'Date cannot be in the future'
    }

    if (!form.value.note) {
        formErrors.value.note = 'Description is required'
    }

    return isValid
}

const isFormValid = computed(() => {
    return (
        form.value.accountId &&
        form.value.categoryId &&
        form.value.amount > 0 &&
        form.value.transactionDate &&
        form.value.note
    )
})

function submit() {
    if (!validate()) return
    emits('submit', form.value)
}
</script>

<template>
    <div class="space-y-5">
      <!-- Account -->
      <div>
        <label for="tx-account" class="block text-sm font-medium text-slate-700 mb-1.5">Account</label>
        <select
          id="tx-account"
          v-model="form.accountId"
          class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition disabled:opacity-50"
          :disabled="loading"
        >
          <option disabled value="">Select account</option>
          <option v-for="a in accounts" :key="a.id" :value="a.id">
            {{ a.name }}
          </option>
        </select>
        <p v-if="formErrors.accountId" class="text-sm text-red-600 mt-1">
          {{ formErrors.accountId }}
        </p>
      </div>

      <!-- Category -->
      <div>
        <label for="tx-category" class="block text-sm font-medium text-slate-700 mb-1.5">Category</label>
        <select
          id="tx-category"
          v-model="form.categoryId"
          class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition disabled:opacity-50"
          :disabled="loading"
        >
          <option disabled value="">Select category</option>
          <option v-for="c in categories" :key="c.id" :value="c.id">
            {{ c.name }}
          </option>
        </select>
        <p v-if="formErrors.categoryId" class="text-sm text-red-600 mt-1">
          {{ formErrors.categoryId }}
        </p>
      </div>

      <!-- Type -->
      <div>
        <label for="tx-type" class="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
        <select
          id="tx-type"
          v-model.number="form.type"
          class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition disabled:opacity-50"
          :disabled="loading"
        >
          <option :value="1">Income</option>
          <option :value="2">Expense</option>
        </select>
      </div>

      <!-- Amount -->
      <div>
        <label for="tx-amount" class="block text-sm font-medium text-slate-700 mb-1.5">Amount</label>
        <input
          id="tx-amount"
          v-model.number="form.amount"
          type="number"
          min="0"
          step="any"
          placeholder="0"
          class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition disabled:opacity-50"
          :disabled="loading"
        />
        <p v-if="formErrors.amount" class="text-sm text-red-600 mt-1">
          {{ formErrors.amount }}
        </p>
      </div>

      <!-- Date -->
      <div>
        <label for="tx-date" class="block text-sm font-medium text-slate-700 mb-1.5">Date</label>
        <input
          id="tx-date"
          v-model="form.transactionDate"
          type="date"
          :max="maxDate"
          class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition disabled:opacity-50"
          :disabled="loading"
        />
        <p v-if="formErrors.transactionDate" class="text-sm text-red-600 mt-1">
          {{ formErrors.transactionDate }}
        </p>
      </div>

      <!-- Note -->
      <div>
        <label for="tx-note" class="block text-sm font-medium text-slate-700 mb-1.5">Description</label>
        <textarea
          id="tx-note"
          v-model="form.note"
          rows="3"
          placeholder="e.g. Groceries, Salary"
          class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition disabled:opacity-50 resize-none"
          :disabled="loading"
        />
        <p v-if="formErrors.note" class="text-sm text-red-600 mt-1">
          {{ formErrors.note }}
        </p>
      </div>

      <div class="flex flex-wrap items-center justify-end gap-3 pt-2 border-t border-slate-200/80">
        <button
          type="button"
          class="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50"
          :disabled="loading"
          @click="$router.back()"
        >
          Cancel
        </button>
        <button
          type="button"
          class="rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-4 transition focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none active:scale-[0.98]"
          :disabled="loading || !isFormValid"
          @click="submit"
        >
          {{ loading ? 'Saving...' : 'Save Transaction' }}
        </button>
      </div>
    </div>
  </template>