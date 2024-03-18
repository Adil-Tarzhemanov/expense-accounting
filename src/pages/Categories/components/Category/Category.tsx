import styles from './styles.module.scss'
import {Dispatch, FC, FormEvent, SetStateAction} from "react"
import {AiFillCloseCircle, AiFillEdit} from "react-icons/ai";
import {ICategory} from "../../../../types/types";
import {CategoryService} from "../../../../services/category.service";
import {useAppDispatch} from "../../../../store/hooks";
import {remove, setVisibleModal} from "../../../../store/slices/categoriesSlice";

interface ICategoryProps {
    category: ICategory
    setIsEdit: Dispatch<SetStateAction<boolean>>
    setCategoryId: Dispatch<SetStateAction<number>>
}

const Category: FC<ICategoryProps> = ({category, setCategoryId, setIsEdit}) => {
    const categoriesDispatch = useAppDispatch();
    const deleteHandle = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            await CategoryService.deleteCategory(category.id)
            categoriesDispatch(remove(category.id));
        } catch (error) {
            throw new Error('Failed to delete category')
        }
    }

    const onEditCategory = () => {
        setIsEdit(true);
        categoriesDispatch(setVisibleModal(true));
        setCategoryId(category.id)
    }

    return (
        <div className={styles.categoryWrapper}>
            {category.title}
            <div className={styles.categoryBtns}>
                <button className={styles.editBtn} onClick={onEditCategory}>
                    <AiFillEdit />
                </button>
                <form className={styles.deleteForm} onSubmit={deleteHandle}>
                    <input type="hidden" name="id"/>
                    <button className={styles.deleteBtn}>
                        <AiFillCloseCircle />
                    </button>
                </form>
            </div>
        </div>
    )
}
export default Category;