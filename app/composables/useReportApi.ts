import type { ApiResponse } from "~/types/api/ApiResponse"
import type { ReportResponse } from "~/types/api/reportResponse"

export const useReport = () => {
    const api = useApi()
    const data = ref<ReportResponse | null>(null)
    const loading = ref(false)
    const error = ref<string | null>(null)

    const getMonthlyReport = async (year:string, month: string) => {
        loading.value = true
        error.value = null
        try {
            const response = await api<ApiResponse<ReportResponse>>('/report/monthly', {
                method: 'GET',
                query: { year, month}
            })
    
            data.value = response.data
        } catch (err: any) {
            error.value = err.message || 'Failed to load report'
        } finally {
            loading.value = false
        }
    }
    return {
        data,
        loading,
        error,
        getMonthlyReport
    }
}

