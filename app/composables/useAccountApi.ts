import type { AccountApiResponse } from "~/types/api/accountResponse"
import type { ApiResponse } from "~/types/api/ApiResponse"
import { mapAccountToView } from "~/mappers/account.mapper"
import type { AccountView } from "~/types/view/accountView"

export function useAccountApi(){
    const api = useApi()

    const getAccounts = async () : Promise<AccountView[]> => {
        const response = await api<ApiResponse<AccountApiResponse[]>>('/account', {
            method: 'GET'
        })

        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to fetch accounts')
        }

        return (response.data ?? []).map(mapAccountToView)
    }

    const createAccount = async (payload: {
        name: string
        type: number
        initialBalance: number
    }) => {
        const response = await api<ApiResponse<AccountApiResponse>>('/account', {
            method: 'POST',
            body: payload,
        })

        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to create')
        }

        return response.data
    }

    return {
        getAccounts,
        createAccount
    }
}