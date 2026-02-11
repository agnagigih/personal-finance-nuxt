import type { PagedResult } from "~/types/api/pagedResult"
import type { TransactionResponse } from "~/types/api/TransactionResponse"

export const useTransactionApi = () => {
    const api = useApi()

    const getTransactions = async (page = 1, pageSize = 10): Promise<PagedResult<TransactionResponse>> => {
        // return await api<ApiResponse<TransactionResponse[]>>('/transaction')
        const res: any = await api('/transaction', {
            method: 'GET',
            query:{ page, pageSize},
        })

        return res.data
    }

    return { getTransactions }
}