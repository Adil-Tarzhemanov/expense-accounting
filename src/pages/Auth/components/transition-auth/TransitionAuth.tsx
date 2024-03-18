import styles from './styles.module.scss'
import {Dispatch, FC} from "react"

interface TransitionAuthProps  {
    isLogin: boolean,
    setIsLogin: Dispatch<boolean>,
    text: string,
}

const TransitionAuth: FC<TransitionAuthProps> = ({ setIsLogin, isLogin, text }) => {
    return (
        <button
            onClick={() => setIsLogin(!isLogin)}
            className={styles.transitionAuth}
        >
            {text}
        </button>
    )
}
export default TransitionAuth;