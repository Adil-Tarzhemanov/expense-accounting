import styles from './styles.module.scss'
import {FC, useEffect, useState} from "react"
import InputTransaction from "../input-transaction/InputTransaction";
import SelectCategory from "../select-category/SelectCategory";
import { setVisibleModal} from "../../../../store/slices/categoriesSlice";
import {FaPlus} from "react-icons/fa";
import CategoryModal from "../../../../components/CategoryModal/CategoryModal.ts";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {TransactionService} from "../../../../services/transaction.service";
import {toast} from "react-toastify";
import {useGetCategory} from "../../../../hooks/useGetCategory";
import {create} from "../../../../store/slices/transactionsSlice";

const TransactionForm: FC = () => {
    useGetCategory();

    const categories = useAppSelector(state => state.categories.categories)
    const visibleModal = useAppSelector(state => state.categories.visibleModal);
    const dispatch = useAppDispatch();
    const [titleInput, setTitleInput] = useState("");
    const [amountInput, setAmountInput] = useState("");

    const [radioValue, setRadioValue] = useState('income');

    const [selectedValue, setSelectedValue] = useState("");

    const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRadioValue(event.target.value);
    };

    const createTransaction = async (e: any) => {
        try {
            e.preventDefault();
            console.log({
                title: titleInput,
                amount: +amountInput,
                type: radioValue,
                category: +selectedValue,
            })
            const data = await TransactionService.postTransaction({
                title: titleInput,
                amount: +amountInput,
                type: radioValue,
                category: +selectedValue,
            })
            if (data) {
                dispatch(create(data));
                toast.success('Transaction added.')
            }
        } catch (error) {
            throw new Error(`Failed to create transaction`)
        }
    }

    return (
        <>
            <form className={styles.transactionsForm} onSubmit={createTransaction}>
                <InputTransaction title="Title"
                                  placeholder="Title..."
                                  type="text"
                                  inputValue={titleInput}
                                  setInputValue={setTitleInput}
                />
                <InputTransaction title="Amount"
                                  placeholder="Amount..."
                                  type="number"
                                  inputValue={amountInput}
                                  setInputValue={setAmountInput}
                />
                <SelectCategory value={selectedValue} setValue={setSelectedValue} />
                <button
                    type="button"
                    onClick={() => dispatch(setVisibleModal(true))}
                    className={styles.manageCategories}
                >
                    <FaPlus />
                    <span>Manage Categories</span>
                </button>
                <div className={styles.radioInputs}>
                    <label className={styles.incomeLabel}>
                        <input
                            type="radio"
                            name="type"
                            value={'income'}
                            checked={radioValue === 'income'}
                            onChange={handleRadioChange}
                            className={styles.incomeInput}
                        />
                        <span>Income</span>
                    </label>
                    <label className={styles.expenseLabel}>
                        <input
                            type="radio"
                            name="type"
                            value={'expense'}
                            checked={radioValue === 'expense'}
                            onChange={handleRadioChange}
                            className={styles.expenseInput}
                        />
                        <span>Expense</span>
                    </label>
                </div>
                <button className={styles.submit} type="submit">Submit</button>
            </form>
            {visibleModal && <CategoryModal type="post" />}
        </>
    )
}
export default TransactionForm;