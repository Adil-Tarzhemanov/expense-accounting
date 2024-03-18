import {useAppDispatch} from '../store/hooks'
import {useEffect} from "react";
import {CategoryService} from "../services/category.service";
import {get} from "../store/slices/categoriesSlice";

export const useGetCategory = ():void  => {
    const categoriesDispatch = useAppDispatch();

    useEffect(() => {
        const getCategories = async () => {
            try {
                const data = await CategoryService.getCategories();
                categoriesDispatch(get(data));
            } catch (error) {
                console.log(`Failed to fetch categories:${error}`);
            }
        }

        getCategories().then()
    }, []);
}