import { mapCategoryToView } from "~/mappers/category.mapper"
import type { ApiResponse } from "~/types/api/ApiResponse"
import type { CategoryApiResponse } from "~/types/api/categoryResponse"
import type { CategoryView } from "~/types/view/CategoryView"

export function useCategoryApi() {
    const api = useApi()

    const getCategories = async() : Promise<CategoryView[]> => {
        const response = await api<ApiResponse<CategoryApiResponse[]>>('/category', {
            method: 'GET'
        })

        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to fetch categories')
        }

        return (response.data ?? []).map(mapCategoryToView)
    }

    const createCategory = async (payload : {
        name: string
        type: number
    }) => {
        const response = await api<ApiResponse<CategoryApiResponse>>('/category', {
            method: 'POST',
            body: payload
        })

        if (!response.success) {
            throw new Error(response.error?.message || 'Failed to create')
        }

        return response.data
    }

    return {
        getCategories,
        createCategory
    }
}