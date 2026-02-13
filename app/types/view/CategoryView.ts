export enum CategoryType {
    Income = 1,
    Expense = 2
}

export interface CategoryView {
    id: string
    name: string
    type: CategoryType
    typeLabel: string
}