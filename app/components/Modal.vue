<script setup lang="ts">
defineProps<{
  title?: string
}>()

const emit = defineEmits<{
  close: []
}>()

function onOverlayClick(e: MouseEvent) {
  if ((e.target as HTMLElement).hasAttribute('data-modal-overlay')) {
    emit('close')
  }
}

function onEscape(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
}

onMounted(() => {
  document.addEventListener('keydown', onEscape)
})
onUnmounted(() => {
  document.removeEventListener('keydown', onEscape)
})
</script>

<template>
  <Teleport to="body">
    <div
      data-modal-overlay
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      @click="onOverlayClick"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        class="w-full max-w-md rounded-2xl bg-white shadow-lg shadow-slate-200/50 border border-slate-200/80 overflow-hidden focus:outline-none"
      >
        <div class="flex items-center justify-between border-b border-slate-200/80 bg-slate-50/50 px-6 py-4">
          <h2
            id="modal-title"
            class="text-lg font-semibold text-slate-800 tracking-tight"
          >
            <slot name="title">
              {{ title }}
            </slot>
          </h2>
          <button
            type="button"
            class="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-200/80 hover:text-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2"
            aria-label="Close"
            @click="emit('close')"
          >
            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div class="px-6 py-5">
          <slot name="body" />
        </div>

        <div
          v-if="$slots.footer"
          class="flex flex-wrap items-center justify-end gap-3 border-t border-slate-200/80 bg-slate-50/50 px-6 py-4"
        >
          <slot name="footer" />
        </div>
      </div>
    </div>
  </Teleport>
</template>
