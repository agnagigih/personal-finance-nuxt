import type { AccountApiResponse } from "~/types/api/accountResponse";
import type { AccountView } from "~/types/view/accountView";
import { AccountType } from "~/types/view/accountView";

export function mapAccountToView(t: AccountApiResponse): AccountView {
    return {
        id: t.id,
        name: t.name,
        balance: t.balance,
        type: t.type,
        typeLabel: getAccountTypeLabel(t.type)
    }
}

function getAccountTypeLabel(type:number): string {
    switch (type) {
        case AccountType.Cash: return 'Cash'
        case AccountType.Bank: return 'Bank'
        case AccountType.EWallet: return 'E-Wallet'
        default: return 'Unknown'
    }
}