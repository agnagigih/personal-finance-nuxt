import type { TransactionResponse } from "~/types/api/TransactionResponse"
import type { TransactionView } from "~/types/view/transactionView"

export function mapTransactionToView(t: TransactionResponse): TransactionView {
    return {
        id: t.id,
        amount: t.amount,
        amountText: `${t.type == 2 ? '-' : '+'} ${t.amount.toLocaleString()}`,
        accountName: t.accountName ?? 'Unknown',
        categoryName: t.categoryName ?? 'Uncategorized',
        type: t.type === 1 ? 'Income' : 'Expense',
        dateText: t.transactionDate ? new Date(t.transactionDate).toLocaleDateString() : '',
        note: t.note ?? '-No note-',
    }
}