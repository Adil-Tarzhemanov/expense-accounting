import {axiosAuth} from "../api/api";
import {ICategory, ICategoryData} from "../types/types";

export const CategoryService = {
    async getCategories(): Promise<ICategory[]> {
        const { data } = await axiosAuth().get<ICategory []>('categories');
        return data || []
    },
    async postCategory(categoryData: ICategoryData): Promise<ICategory | undefined> {
        const { data } = await axiosAuth().post<ICategory>('categories', categoryData);
        return data;
    },
    async patchCategory(categoryData: ICategoryData): Promise<ICategory | undefined> {
        const { data } = await axiosAuth().patch<ICategory>(`categories/category/${categoryData.id}`, categoryData);
        return data;
    },
    async deleteCategory(categoryId: number): Promise<ICategory | undefined> {
        const { data } = await axiosAuth().delete<ICategory>(`categories/category/${categoryId}`);
        return data;
    },
}