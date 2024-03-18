import styles from './styles.module.scss'
import {FC, useState} from "react"
import {FaPlus} from "react-icons/fa";
import {ICategory} from "../../types/types";
import Category from "./components/Category/Category";
import CategoryModal from "../../components/CategoryModal/CategoryModal.ts";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {useGetCategory} from "../../hooks/useGetCategory";
import {setVisibleModal} from "../../store/slices/categoriesSlice";

const Categories: FC = () => {
    const categories = useAppSelector(state => state.categories.categories);
    const visibleModal = useAppSelector(state => state.categories.visibleModal);
    const dispatch = useAppDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [categoryId, setCategoryId] = useState(0);

   useGetCategory();

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.head}>Your category list</h1>
                <div className={styles.categories}>
                    {categories.map((category: ICategory) =>
                        <Category category={category}
                                  setIsEdit={setIsEdit}
                                  setCategoryId={setCategoryId}
                                  key={category.id} />
                    )}
                </div>
                <button className={styles.createCategory}
                        onClick={() => dispatch(setVisibleModal(true))}>
                    <FaPlus />
                    <span>Create a new category</span>
                </button>
            </div>
            {visibleModal && <CategoryModal type='post' />}
            {isEdit && visibleModal && <CategoryModal type='patch'
                                                      id={categoryId}
                                                      setIsEdit={setIsEdit} />
            }
        </div>
    )
}

export default Categories;