import styles from './styles.module.scss'
import React, {FC, useState} from "react"
import {AuthService} from "../../services/auth.service";
import {toast} from "react-toastify";
import TransitionAuth from "./components/transition-auth/TransitionAuth";
import {setTokenToLacalStorage} from "../../helpers/localstorage.helper";
import {login} from "../../store/slices/userSlice";
import {useNavigate} from "react-router-dom";
import {useAppDispatch} from "../../store/hooks";
import {IoEyeSharp} from "react-icons/io5";
import {FaEyeSlash} from "react-icons/fa";

const Auth: FC = () => {
    const [isLogin, setIsLogin] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [eyeIsOpen, setEyeIsOpen] = useState<boolean>(false)

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const registerHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.registration({email, password});

            if (data) {
                toast.success(`Account has been created.${email} ${password}`)
                setIsLogin(!isLogin)
            }
        } catch (err: any) {
            const error = err.response?.data.message
            console.log('Error:', error);
            toast.error(error.toString())
        }
    }

    const loginHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault()
            const data = await AuthService.login( { email, password });

            if (data) {
                setTokenToLacalStorage('token', data.token);
                dispatch(login(data));
                toast.success(`You logged id.${email} ${password}`);
                navigate('/');
            }
        } catch (err: any) {
            const error = err.response?.data.message;
            toast.error(error.toString());
        }
    }

    const onPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    }

    return (
        <div className={styles.container}>
            <h1 className={styles.head}>
                {isLogin ? 'Login' : 'Registration'}
            </h1>
            <form className={styles.form} onSubmit={isLogin ? loginHandler : registerHandler}>
                <div className={styles.inputWrapper}>
                    <input className={styles.authInput}
                           placeholder='Email'
                           value={email}
                           onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className={styles.inputWrapper}>
                    <input className={styles.authInput}
                           placeholder='Password'
                           type={eyeIsOpen ? 'text' : 'password'}
                           value={password}
                           onChange={(e) => onPasswordChange(e)}/>
                    <div className={styles.eyeWrapper} onClick={() => setEyeIsOpen(!eyeIsOpen)}>
                        {eyeIsOpen ? <IoEyeSharp className={styles.eye} /> : <FaEyeSlash className={styles.eye} />}
                    </div>
                </div>
                <button className={styles.submit}>Submit</button>
            </form>
            <div className={styles.transitionWrap}>
                <TransitionAuth setIsLogin={setIsLogin}
                                isLogin={isLogin}
                                text={isLogin ? 'You don\'t have an account?' : 'Already have an account?'}/>
            </div>
        </div>
    )
}

export default Auth;