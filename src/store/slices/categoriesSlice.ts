import { createSlice } from '@reduxjs/toolkit'
import type { RootState } from '../store'
import {ICategory} from "../../types/types";

interface CategoriesState {
    categories: ICategory [],
    visibleModal: any,
}

const initialState: CategoriesState = {
    categories: [],
    visibleModal: false,
}

export const CategoriesSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {
        get(state, action) {
            state.categories = [...action.payload];
        },
        remove(state, action) {
            state.categories = [...state.categories.filter(category => category.id !== action.payload)]
        },
        edit(state, action) {
          state.categories = [...state.categories.map(category => category.id === action.payload.id ? action.payload.data : category)]
        },
        create(state, action) {
          state.categories = [...state.categories, action.payload]
        },
        setVisibleModal(state, action) {
            state.visibleModal = action.payload
        },
    },
})

export const {
    get,
    remove,
    edit,
    create ,
    setVisibleModal
} = CategoriesSlice.actions

export const selectCount = (state: RootState) => state.categories

export default CategoriesSlice.reducer