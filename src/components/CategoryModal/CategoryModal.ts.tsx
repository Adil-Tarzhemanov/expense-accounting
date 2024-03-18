import styles from './styles.module.scss'
import React, {Dispatch, FC, FormEvent, SetStateAction, useState} from "react"
import classNames from "classnames";
import {CategoryService} from "../../services/category.service";
import {useAppDispatch} from "../../store/hooks";
import {create, edit, setVisibleModal} from "../../store/slices/categoriesSlice";

interface ICategoryModal {
    type: 'post' | 'patch'
    id?: number
    setIsEdit?: Dispatch<SetStateAction<boolean>>
}

const CategoryModal: FC<ICategoryModal> = ({ type, id, setIsEdit }) => {
    const dispatch = useAppDispatch();
    const [titleValue, setTitleValue] = useState('');
    const categoriesDispatch = useAppDispatch();

    const createHandle = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await CategoryService.postCategory({ title: titleValue })
            if (data) {
                categoriesDispatch(create(data))
            }
            dispatch(setVisibleModal(false));
        } catch (error) {
            throw new Error(`Failed to create category`)
        }
    }

    const editHandle = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            const data = await CategoryService.patchCategory({ title: titleValue, id });
            if (data) {
                categoriesDispatch(edit({id, data}));
            }
            dispatch(setVisibleModal(false));
            if (setIsEdit) {
                setIsEdit(false)
            }
        } catch (error) {
            console.error("Failed to update category:", error);
        }
    }

    return (
        <div className={styles.modal}>
            <div className={styles.content}>
                <form className={styles.categoryForm} onSubmit={type === 'post' ? createHandle : editHandle}>
                    <h4 className={styles.head}>Category title</h4>
                    <label htmlFor="title">
                        <input name="title" placeholder="Title..."
                               className={styles.titleInput}
                               value={titleValue}
                               onChange={(e) => setTitleValue(e.target.value)}/>
                        <input type='hidden' />
                    </label>
                    <div className={styles.formBtns}>
                        <button className={classNames(styles.confirmation, { [styles.notActive]: !titleValue })}
                                disabled={!titleValue}
                                type="submit">
                            {type === 'patch' ? 'Save' : 'Create'}
                        </button>
                        <button className={styles.closeModal} onClick={() => dispatch(setVisibleModal(false))}>
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default CategoryModal;