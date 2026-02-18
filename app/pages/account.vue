<script setup lang="ts">
import { useAccountApi } from '~/composables/useAccountApi';
import type { AccountView } from '~/types/view/accountView';
import { mapAccountToView } from '~/mappers/account.mapper';

definePageMeta({
    middleware: 'auth'
})

const toast = useToast()

const { getAccounts, createAccount } = useAccountApi()

const showModal = ref(false)
const accounts = ref<AccountView[]>([])
const loading = ref(true)
const error = ref<string | null>(null)

const loadAccounts = async () => {
    loading.value = true
    error.value = null

    try {
        accounts.value = await getAccounts()
    } catch (err) {
        error.value = 'Failed to load accounts'
    } finally {
        loading.value = false
    }
}

onMounted(loadAccounts)

// form state
const name = ref('')
const type = ref(1)
const initialBalance = ref(0)

const openModal = () => {
    showModal.value = true
    name.value = ''
    type.value = 1
    initialBalance.value = 0
    error.value = null
}

const closeModal = () => {
    showModal.value = false
    error.value = null
}

const submitForm = async () => {
    if (!name.value) {
        error.value = 'Name is required'
        return
    }

    loading.value = true
    error.value = null

    try {
        const account = await createAccount({
            name: name.value,
            type: type.value,
            initialBalance: initialBalance.value,
        })
        if (account != null){
            accounts.value.push(mapAccountToView(account))
        }
        toast.success("Account created successfully")
        closeModal()
    } catch (err) {
        error.value = (err as Error).message
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
          Accounts
        </h1>
        <p class="text-slate-500 text-sm mt-1">
          Your accounts
        </p>
      </div>
      <div>
        <button
        v-if="!loading"
        type="button"
        class="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-2.5 shadow-sm hover:shadow transition focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 active:scale-[0.98]"
        @click="openModal"
      >
          <svg class="h-5 w-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
          </svg>
          Add Account
        </button>
      </div>
    </div>

    <!-- Loading -->
    <div
      v-if="loading"
      class="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 p-6"
    >
      Loading...
    </div>

    <!-- Error -->
    <div
      v-else-if="error"
      class="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3"
    >
      {{ error }}
    </div>
    <!-- Empty -->
    <div
      v-else-if="!accounts.length"
      class="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 p-12 text-center"
    >
      <div class="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100 text-slate-400 mb-6">
        <svg class="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
        </svg>
      </div>
      <p class="text-slate-600 font-medium">
        No accounts yet
      </p>
      <p class="text-slate-500 text-sm mt-1">
        Create your first account to start tracking.
      </p>
    </div>
    <!-- List -->
    <div
      v-else
      class="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-200/80 overflow-hidden"
    >
      <ul class="divide-y divide-slate-200/80">
        <li
          v-for="acc in accounts"
          :key="acc.id"
          class="flex items-center justify-between px-4 py-4 sm:px-6 hover:bg-slate-50/80 transition"
        >
          <div>
            <p class="font-medium text-slate-800">
              {{ acc.name }}
            </p>
            <p class="text-sm text-slate-500">
              Type: {{ acc.typeLabel }}
            </p>
          </div>

          <p class="font-semibold text-slate-800 tabular-nums">
            Rp {{ acc.balance.toLocaleString() }}
          </p>
        </li>
      </ul>
    </div>
  </div>
  <Modal v-if="showModal" @close="closeModal">
    <template #title>
      Create New Account
    </template>

    <template #body>
      <div class="space-y-5">
        <div
          v-if="error"
          role="alert"
          class="rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm px-4 py-3"
        >
          {{ error }}
        </div>

        <div>
          <label for="account-name" class="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
          <input
            id="account-name"
            v-model="name"
            type="text"
            placeholder="e.g. Main Wallet"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
            :disabled="loading"
          />
        </div>

        <div>
          <label for="account-type" class="block text-sm font-medium text-slate-700 mb-1.5">Type</label>
          <select
            id="account-type"
            v-model="type"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
            :disabled="loading"
          >
            <option :value="1">Wallet</option>
            <option :value="2">Bank</option>
            <option :value="3">E-Wallet</option>
          </select>
        </div>

        <div>
          <label for="account-balance" class="block text-sm font-medium text-slate-700 mb-1.5">Initial Balance</label>
          <input
            id="account-balance"
            v-model.number="initialBalance"
            type="number"
            min="0"
            step="any"
            placeholder="0"
            class="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition"
            :disabled="loading"
          />
        </div>
      </div>
    </template>

    <template #footer>
      <button
        type="button"
        class="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 hover:border-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:opacity-50"
        :disabled="loading"
        @click="closeModal"
      >
        Cancel
      </button>
      <button
        type="button"
        class="rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-medium py-2.5 px-4 transition focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-60 disabled:pointer-events-none"
        :disabled="loading"
        @click="submitForm"
      >
        {{ loading ? 'Creating...' : 'Create' }}
      </button>
    </template>
  </Modal>
</template>