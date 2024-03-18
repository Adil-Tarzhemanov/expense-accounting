import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import { ITransaction } from "../../types/types";

interface TransactionsState {
    transactions: ITransaction [],
}

const initialState: TransactionsState = {
    transactions: [],
}

export const TransactionsSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        get(state, action) {
            state.transactions = [...action.payload];
        },
        create(state, action) {
            state.transactions = [...state.transactions, action.payload];
        },
        remove(state, action) {
            state.transactions = [...state.transactions.filter(transaction => transaction.id !== action.payload)]
        },
    },
})

export const {
    create,
    remove,
    get
} = TransactionsSlice.actions

export const selectCount = (state: RootState) => state.categories

export default TransactionsSlice.reducer