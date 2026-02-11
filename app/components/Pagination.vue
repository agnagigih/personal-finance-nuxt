<script setup lang="ts">
const props = defineProps<{
    page: number
    totalPages: number
    loading?: boolean
}>()

const emit = defineEmits<{
    (e: 'change', page: number): void
}>()

const previousPage = () => {
  if (props.page <= 1) return
  emit('change', props.page - 1)
}

const nextPage = () => {
  if (props.page >= props.totalPages) return
  emit('change', props.page + 1)
}
</script>

<template>
    <div
        class="flex flex-wrap items-center justify-between gap-4 border-t border-stone-200/80 bg-stone-50/50 px-4 py-4 sm:px-6"
      >
        <div class="flex flex-wrap items-center gap-4">
          <slot name="prepend" />
          <p class="text-sm text-stone-500">
            Page {{ page }} of {{ totalPages || 1 }}
          </p>
        </div>
        <div class="flex items-center gap-2">
          <button
            type="button"
            class="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:pointer-events-none disabled:opacity-50"
            :disabled="page <= 1"
            @click="previousPage()"
          >
            Previous
          </button>
          <button
            type="button"
            class="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-50 hover:border-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 disabled:pointer-events-none disabled:opacity-50"
            :disabled="page >= totalPages"
            @click="nextPage()"
          >
            Next
          </button>
        </div>
    </div>
</template>