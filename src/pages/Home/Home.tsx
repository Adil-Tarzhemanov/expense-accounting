import styles from './styles.module.scss';
import {useAppSelector} from "../../store/hooks";

const Home = () => {
    const userData = useAppSelector(state => state.user);
    const userDataProcessNull = () => {
        if (userData.user !== null) {
            const userName = userData.user.email;
            return userName;
        }
    }

    return (
        <div className={styles.container}>
            {userData.isAuth ? <h1 style={{color: 'white'}}>FSFSFSDSDD</h1> : <h1 style={{color: 'white'}}>DAVINCHI</h1>}
            {<h1>{userDataProcessNull()}</h1>}
        </div>
    );
}
export default Home;



