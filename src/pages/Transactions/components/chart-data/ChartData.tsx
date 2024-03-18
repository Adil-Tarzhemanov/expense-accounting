import {ArcElement, Chart as ChartJS} from "chart.js";
import styles from "../../styles.module.scss";
import {Doughnut} from "react-chartjs-2";
import {useAppSelector} from "../../../../store/hooks";
import {ITransaction} from "../../../../types/types";
import {FC} from "react";

interface ChartDataProps {
    incomeSum: number,
    expenseSum: number,
}

const ChartData: FC<ChartDataProps> = ({incomeSum, expenseSum}) => {
    ChartJS.register(ArcElement);

    const data = {
        labels: ['Red', 'Green',],
        datasets: [
            {
                label: '# of Votes',
                data: [incomeSum, expenseSum],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.9)',
                    'rgba(255, 99, 132, 0.9)',
                    // НЕ ЗАБУДЬ МОЖНО ЕЩЁ ОДИН ПОНЧИК ПОЛОЖИТЬ ПОВЕРХ ЭТОГО И ПОКАЗАТЬ ИМ РАСХОДЫ и ДОХОДЫ ЗЕЛНЫМ И КРАСНЫМ ЦВЕТОМ В ПРОЦЕНТНОМ СООТНОЩЕНИИ
                ],
                borderColor: [
                     '#1bc29e',
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };
    return (
            <div className={styles.expenseCircle}>
                <Doughnut data={data} />
            </div>
    )
}
export default ChartData;