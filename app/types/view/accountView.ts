export enum AccountType {
    Cash = 1,
    Bank = 2,
    EWallet = 3
}

export interface AccountView {
    id: string
    name: string
    balance: number
    type: AccountType
    typeLabel: string
}

