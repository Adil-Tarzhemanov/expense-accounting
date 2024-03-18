import styles from "./styles.module.scss";
import {FC} from "react";
import classNames from "classnames";

const AuthBtns: FC = () => {
    return (
        <div className={styles.authWrap}>
            <button className={classNames(styles.logInBtn, styles.authBtn)}>Log in</button>
            <div className={styles.line}>/</div>
            <button className={classNames(styles.signInBtn, styles.authBtn)}>Sign in</button>
        </div>
    )
}

export default AuthBtns;