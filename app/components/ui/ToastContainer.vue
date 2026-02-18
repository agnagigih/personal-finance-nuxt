<script setup lang="ts">
import { useToastStore } from '~/stores/toastStore'
const toastStore = useToastStore()
</script>

<template>
  <div class="fixed top-6 right-6 z-50 space-y-3 max-w-sm">
    <TransitionGroup name="toast" tag="div">
      <div
        v-for="toast in toastStore.toasts"
        :key="toast.id"
        class="rounded-xl shadow-lg shadow-slate-200/50 border px-4 py-3 flex items-start gap-3 bg-white"
        :class="{
          'border-green-200/80': toast.type === 'success',
          'border-red-200/80': toast.type === 'error',
          'border-slate-200/80': toast.type === 'info',
        }"
      >
        <!-- Icon -->
        <div class="shrink-0 mt-0.5">
          <!-- Success checkmark -->
          <div 
            v-if="toast.type === 'success'"
            class="flex h-5 w-5 items-center justify-center rounded-full bg-green-100 text-green-700"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <!-- Error X -->
          <div 
            v-else-if="toast.type === 'error'"
            class="flex h-5 w-5 items-center justify-center rounded-full bg-red-100 text-red-700"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <!-- Info icon -->
          <div 
            v-else
            class="flex h-5 w-5 items-center justify-center rounded-full bg-slate-100 text-slate-700"
          >
            <svg class="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>

        <!-- Message -->
        <p 
          class="text-sm font-medium flex-1 pt-0.5"
          :class="{
            'text-green-800': toast.type === 'success',
            'text-red-800': toast.type === 'error',
            'text-slate-800': toast.type === 'info',
          }"
        >
          {{ toast.message }}
        </p>

        <!-- Close button -->
        <button
          @click="toastStore.removeToast(toast.id)"
          class="flex-shrink-0 rounded-lg p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition"
          aria-label="Dismiss"
        >
          <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </TransitionGroup>
  </div>
</template>

<style scoped>
.toast-enter-active {
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
}

.toast-leave-active {
  transition: all 0.2s ease-out;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%) scale(0.9);
}

.toast-leave-to {
  opacity: 0;
  transform: translateY(-8px) scale(0.95);
}

.toast-move {
  transition: transform 0.3s ease;
}
</style>