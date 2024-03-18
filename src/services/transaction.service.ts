import {axiosAuth} from "../api/api";
import {ITransaction} from "../types/types";

export const TransactionService = {
    async getTransactions(): Promise<ITransaction[]> {
        const { data } = await axiosAuth().get<ITransaction []>('transactions');
        return data || []
    },
    async getPagination(page: number, limit: number): Promise<ITransaction[]> {
        const { data } = await axiosAuth().get<ITransaction []>( `/transactions/pagination?page=${page}&limit=${limit}`);
        return data || []
    },
    async getIncomeTransactions(): Promise<ITransaction[]> {
        const { data } = await axiosAuth().get<ITransaction []>('transactions/income/find');
        return data || []
    },
    async getExpenseTransactions(): Promise<ITransaction[]> {
        const { data } = await axiosAuth().get<ITransaction []>('transactions/expense/find');
        return data || []
    },
    async postTransaction(transactionData: any): Promise<ITransaction | undefined> {
        const { data } = await axiosAuth().post<ITransaction>('transactions', transactionData);
        return data;
    },
    async deleteTransaction(transactionId: number): Promise<ITransaction | undefined> {
        const { data } = await axiosAuth().delete<ITransaction>(`transactions/transaction/${transactionId}`);
        return data;
    },
}