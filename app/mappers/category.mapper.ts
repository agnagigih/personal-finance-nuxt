import type { CategoryApiResponse } from "~/types/api/categoryResponse";
import { CategoryType, type CategoryView } from "~/types/view/CategoryView";


export function mapCategoryToView(t: CategoryApiResponse): CategoryView {
    return {
        id: t.id,
        name: t.name,
        type: t.type,
        typeLabel: getCategoryLabel(t.type)
    }
}

function getCategoryLabel(type: number) : string {
    switch (type) {
        case CategoryType.Income: return 'Income'
        case CategoryType.Expense: return 'Expense'
        default: return 'Unknown'
    }
}