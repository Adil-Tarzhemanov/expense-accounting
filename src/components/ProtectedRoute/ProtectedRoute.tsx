import styles from './styles.module.scss'
import {FC, JSX} from "react"
import {useAuth} from "../../hooks/useAuth";

interface ProtectedRouteProps {
    children: JSX.Element
}

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
    const isAuth = useAuth();

    return (
        <>
            {isAuth ? (
                children
            ) : (
                <div className={styles.container}>
                    <h1 className={styles.head}>To view this page you must be logged in.</h1>
                    <img className={styles.protectionImg} src='./assets/protection.png' alt="protection" />
                </div>
            )}
        </>
    )
}
export default ProtectedRoute;