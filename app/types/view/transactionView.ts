export interface TransactionView {
    id: string
    amount: number
    amountText: string
    categoryName: string
    accountName: string
    type: 'Income' | 'Expense'
    dateText: string
    note: string
  }