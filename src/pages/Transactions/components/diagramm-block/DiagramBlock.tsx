import styles from './styles.module.scss'
import {FC} from "react"
import classNames from "classnames";
import ChartData from "../chart-data/ChartData";
import {useAppSelector} from "../../../../store/hooks";
import {ITransaction} from "../../../../types/types";
import {formatToUSD} from "../../../../helpers/currency.hepler";

const DiagramBlock: FC = () => {
    const transactions = useAppSelector(state => state.transactions.transactions);
    const incomeSum = transactions
        ?.filter(transaction => transaction.type !== 'expense')
        .reduce((sum: number, current: ITransaction) => {
            return sum += current.amount
        }, 0)
    const expenseSum = transactions
        ?.filter(transaction => transaction.type !== 'income')
        .reduce((sum: number, current: ITransaction) => {
            return sum += current.amount
        }, 0)

    return (
        <div className={styles.diagramWrapper}>
            <div className={styles.incomeAndExpense}>
                <div className={styles.incomeWrapper}>
                    <h4 className={styles.incomeText}>total income:</h4>
                    <div className={classNames(styles.incomeValue, styles.value)}>
                        {formatToUSD.format(incomeSum)}
                    </div>
                </div>
                <div className={styles.incomeWrapper}>
                    <h4 className={styles.incomeText}>total expense:</h4>
                    <div className={classNames(styles.expenseValue, styles.value)}>
                        {formatToUSD.format(expenseSum)}
                    </div>
                </div>
            </div>
            <div className={styles.diagram}>
                <ChartData incomeSum={incomeSum} expenseSum={expenseSum} />
            </div>
            <div className={styles.designations}>
                <div className={classNames(styles.incomeDesignation, styles.designation)}>
                    <div className={classNames(styles.greenSquare, styles.square)}></div>
                    <p className={styles.greenText}>Incomes</p>
                </div>
                <div className={classNames(styles.expenseDesignation, styles.designation)}>
                    <div className={classNames(styles.orangeSquare, styles.square)}></div>
                    <p className={styles.orangeText}>Expense</p>
                </div>
            </div>
        </div>
    )
}
export default DiagramBlock;