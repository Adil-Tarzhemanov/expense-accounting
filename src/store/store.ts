import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/userSlice';
import categoriesReducer from './slices/categoriesSlice';
import transactionsReducer from "./slices/transactionsSlice";

export const store = configureStore({
    reducer: {
        user: userReducer,
        categories: categoriesReducer,
        transactions: transactionsReducer,
    },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch