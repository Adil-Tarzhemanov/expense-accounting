import React, {useEffect} from 'react';
import styles from './App.module.scss';
import AppRouter from "./components/AppRouter";
import {useAppDispatch} from "./store/hooks";
import {getTokenFromLocalstorage} from "./helpers/localstorage.helper";
import {AuthService} from "./services/auth.service";
import {login, logout} from "./store/slices/userSlice";

function App() {
    const dispatch = useAppDispatch()

    const checkAuth = async (): Promise<void> => {
        const token = getTokenFromLocalstorage()
        try {
            if (token) {
                const data = await AuthService.getProfile()

                if (data) {
                    dispatch(login(data))
                } else {
                    dispatch(logout())
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        checkAuth().then();
    }, []);

    return (
        <div className={styles.container}>
            <AppRouter />
        </div>
    );
}

export default App;
