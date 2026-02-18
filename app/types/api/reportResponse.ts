export interface IncomeExpenseByCategory {
    category: string
    amount: number
}

export interface ReportResponse {
    income: number
    expense: number
    nett: number
    incomeByCategory?: IncomeExpenseByCategory[]
    expenseByCategory?: IncomeExpenseByCategory[]
}