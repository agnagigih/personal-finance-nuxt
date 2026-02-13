import type { ApiResponse } from "~/types/api/ApiResponse"
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

    const createTransaction = async (payload: {
        accountId:string
        categoryId:string
        amount: number
        type: number
        note?: string
        transactionDate: string
    }
    ) => {
        const response = await api<ApiResponse<TransactionResponse>>('/transaction', {
            method: 'POST',
            body: payload
        })

        if(!response.success) {
            throw new Error(response.error?.message || 'Failed to create transaction')
        }

        return response.data
    }

    return { 
        getTransactions, 
        createTransaction
    }
}