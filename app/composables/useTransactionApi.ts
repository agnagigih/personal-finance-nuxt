import type { ApiResponse } from "~/types/api/ApiResponse"
import type { PagedResult } from "~/types/api/pagedResult"
import type { TransactionResponse } from "~/types/api/TransactionResponse"

interface CreateTransactionRequest {
    accountId:string
    categoryId:string
    amount: number
    type: number
    note?: string
    transactionDate: string
}

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

    const createTransaction = async (payload: CreateTransactionRequest
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

    const getTransactionById = async (id: string) => {
        const response = await api<ApiResponse<TransactionResponse>>(`/transaction/${id}`, {
            method: 'GET'
        })
        return response.data
    }

    const updateTransaction = async (id: string, payload: CreateTransactionRequest) => {
        const response = await api<ApiResponse<{ message:string }>>(`/transaction/${id}`, {
            method: 'PUT',
            body: payload
        })
        return response.data
    }

    return { 
        getTransactions, 
        createTransaction,
        getTransactionById,
        updateTransaction
    }
}