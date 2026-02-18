import { defineStore } from "pinia";

export type ToastType = 'success' | 'error' | 'info'

export interface Toast {
    id: number
    message: string
    type: ToastType
}

export const useToastStore = defineStore('toast', {
    state: () => ({
        toasts: [] as Toast[]
    }),

    actions: {
        addToast(message: string, type: ToastType = 'info') {
            const id = Date.now()
            this.toasts.push({ id, message, type})

            // auto remove after 5 second
            setTimeout(() => {
                this.removeToast(id)
            }, 3000)
        },

        removeToast(id:number) {
            this.toasts = this.toasts.filter(t => t.id !== id)
        }
    }
})