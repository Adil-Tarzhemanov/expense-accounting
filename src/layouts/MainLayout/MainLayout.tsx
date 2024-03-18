import styles from './styles.module.scss'
import Header from "../../components/Header/Header";
import {Outlet} from "react-router-dom";
const MainLayout = () => {
    return (
        <div className={styles.container}>
            <Header />
            <div className={styles.outlet}>
                <Outlet />
            </div>
        </div>
    )
}
export default MainLayout;