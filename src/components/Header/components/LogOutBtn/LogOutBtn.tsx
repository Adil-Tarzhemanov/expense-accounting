import {FC} from "react";
import styles from "../../styles.module.scss";
import {FaSignOutAlt} from "react-icons/fa";
import {useAuth} from "../../../../hooks/useAuth";

interface LogOutBtnProps {
    logout: () => void;
}

const LogOutBtn: FC<LogOutBtnProps> = ({ logout }) => {
    return (
        <button className={styles.logOutBtn} onClick={() => logout()}>
            <span className={styles.logOutSpan}>Log Out</span>
            {<FaSignOutAlt />}
        </button>
    )
}

export default LogOutBtn;