import styles from './styles.module.scss'
import {FC} from "react"
import DiagramBlock from "./components/diagramm-block/DiagramBlock";
import TransactionForm from "./components/transaction-form/TransactionForm";
import TransactionTable from "./components/transaction-table/TransactionTable";
import {useAppSelector} from "../../store/hooks";

const Transactions: FC = () => {
    const transactions = useAppSelector(state => state.transactions.transactions)

    return (
        <div className={styles.container}>
            <div className={styles.formAdnDiagram}>
                <div className={styles.transactionsBlock}>
                    <div className={styles.content}>
                        <TransactionForm />
                    </div>
                </div>
                <DiagramBlock />
            </div>
            <TransactionTable limit={5} />
        </div>
    )
}

export default Transactions;