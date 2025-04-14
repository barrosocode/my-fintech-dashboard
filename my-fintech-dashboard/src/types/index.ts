export interface User {
    id?: string | number;
    name: string;
    email: string;
}

export type TransactionTypes = "entrada" | "saida";

export interface Transaction {
    type: TransactionTypes;
    value: number;
    date: string;
    description: string;
}

export interface LoginData {
    email: string;
    password: string;
}

export interface RegisterData {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}

export interface Balance {
    amount: number;
}

export interface readTransactionFilter {
    start_date: string;
    end_date: string;
}
