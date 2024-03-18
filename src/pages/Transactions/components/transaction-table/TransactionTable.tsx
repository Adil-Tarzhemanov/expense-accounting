import styles from './styles.module.scss'
import {FC, FormEvent, useEffect, useState} from "react"
import classNames from "classnames";
import {ITransaction} from "../../../../types/types";
import {useAppDispatch, useAppSelector} from "../../../../store/hooks";
import {TransactionService} from "../../../../services/transaction.service";
import {FaTrash} from "react-icons/fa";
import {formatToUSD} from "../../../../helpers/currency.hepler";
import {formatDate} from "../../../../helpers/date.helper";
import {get, remove} from "../../../../store/slices/transactionsSlice";
import ReactPaginate from "react-paginate";

interface ITransactionTable {
    limit: number
}

const TransactionTable: FC<ITransactionTable> = ({limit}) => {
    const transactions = useAppSelector(state => state.transactions.transactions)
    // const [data, setData] = useState<ITransaction[]>([])
    const dispatch = useAppDispatch();
    const [currentPage, setCurrentPage] = useState<number>(1)
    const [totalPages, setTotalPages] = useState<number>(0)

    const fetchTransactions = async (page: number) => {
        const response = await TransactionService.getPagination(page, limit);
        if (response) {
            dispatch(get(response));
            setTotalPages(Math.ceil(transactions.length / limit))
        }
    }

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected + 1)
    }

    const handleDeleteTransaction = async (e: FormEvent<HTMLFormElement>, id: number) => {
        try {
            e.preventDefault();
            const data = await TransactionService.deleteTransaction(id);
            dispatch(remove(id));
        } catch {
            throw new Error('Failed to delete transaction')
        }
    }

    useEffect(() => {
        fetchTransactions(currentPage)
    }, [currentPage])

    return (
        <div className={styles.container}>
            <ReactPaginate
                className={styles.reactPaginate}
                activeClassName={styles.activeLink}
                pageLinkClassName={styles.pageLink}
                previousClassName={styles.previousLink}
                nextClassName={styles.nextLink}
                disabledClassName={styles.disabled}
                disabledLinkClassName={styles.disabledLink}
                pageCount={totalPages}
                pageRangeDisplayed={1}
                marginPagesDisplayed={2}
                onPageChange={handlePageChange}
            />
            <div className={styles.transactionList}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            <td className={styles.td}> № </td>
                            <td className={styles.td}>Title</td>
                            <td className={styles.td}>Amount($)</td>
                            <td className={styles.td}>Category</td>
                            <td className={styles.td}>Date</td>
                            <td className={classNames(styles.td, styles.right)}>Action</td>
                        </tr>
                    </thead>
                    <tbody>
                        {transactions.map((transaction, idx) => (
                            <tr key={idx}>
                                <td className={styles.gray}>{idx + 1}</td>
                                <td className={
                                        transaction.type === 'income'
                                            ? styles.green
                                            : styles.red}> {
                                    transaction.title}
                                </td>
                                <td
                                    className={
                                        transaction.type === 'income'
                                            ? styles.green
                                            : styles.red
                                    }
                                >
                                    {transaction.type === 'income'
                                        ? `+ ${formatToUSD.format(transaction.amount)}`
                                        : `- ${formatToUSD.format(transaction.amount)}`}
                                </td>
                                <td className={styles.gray}> {transaction.category?.title || 'Other'} </td>
                                <td className={styles.gray}>  {formatDate(transaction.createdAt)} </td>
                                <td className={styles.white}>
                                    <form className={styles.deleteForm}
                                          onSubmit={(e) => handleDeleteTransaction(e, transaction.id)}>
                                        <input type="hidden" name="id" value={transaction.id} />
                                        <button className={styles.deleteTransaction}>
                                            <FaTrash />
                                        </button>
                                    </form>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default TransactionTable;