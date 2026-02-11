export interface TransactionResponse {
  id: string
  accountId: string | null
  accountName: string | null
  categoryId: string | null
  categoryName: string | null
  amount: number
  type: number | null
  typeName: string | null
  transactionDate: string | null
  note: string | null
}