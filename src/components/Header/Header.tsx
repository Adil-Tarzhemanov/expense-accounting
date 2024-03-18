import styles from './styles.module.scss'
import { GiShinyPurse } from "react-icons/gi";
import {Link, useNavigate} from "react-router-dom";
import PageElement from "./components/PageElement/PageElement";
import {useState} from "react";
import pagesList from "../../constants/pagesList";
import LogOutBtn from "./components/LogOutBtn/LogOutBtn";
import AuthBtns from "./components/AuthBtns/AuthBtns";
import {useAuth} from "../../hooks/useAuth";
import {useAppDispatch} from "../../store/hooks";
import {logout} from "../../store/slices/userSlice";
import {removeTokenFromLocalStorage} from "../../helpers/localstorage.helper";
import {toast} from "react-toastify";

const Header = () => {
    const isAuth = useAuth()
    const [isActive, setIsActive] = useState(0);
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const logoutHandler = () => {
        dispatch(logout())
        removeTokenFromLocalStorage('token')
        toast.success('You logged out.')
        navigate('/')
    }

    return (
        <header className={styles.header}>
            <Link to={'/'}>
                <div className={styles.logoWrap}>
                    <GiShinyPurse size={40} color={'white'} />
                </div>
            </Link>
            {isAuth && (
                <nav className={styles.nav}>
                    <ul className={styles.pagesList}>
                        {pagesList.map((page, index) =>
                            <PageElement {...page}
                                         key={index}
                                         isActive={isActive}
                                         setIsActive={setIsActive} />
                        )}
                    </ul>
                </nav>
            )}
            {isAuth
                ? <LogOutBtn logout={logoutHandler} />
                : (<Link to={'/auth'} style={{textDecoration: 'none'}}>
                      <AuthBtns />
                  </Link>)
            }
        </header>
    )
}
export default Header;