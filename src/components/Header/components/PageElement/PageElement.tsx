import classNames from "classnames";
import styles from "../../styles.module.scss";
import {Link, useLocation} from "react-router-dom";
import {Dispatch, FC, useEffect} from "react";

interface pageElementPropsTypes {
    active: number,
    link: string,
    linkText: string,
    isActive: number,
    setIsActive: Dispatch<number>,
}

const PageElement: FC<pageElementPropsTypes> = ({active, link, linkText, isActive, setIsActive}) => {
    const location = useLocation()

    useEffect(() => {
        if (location.pathname === link) setIsActive(active);
    }, [location.pathname]);

    const handleIsActivePage = () => {
        setIsActive(active);
    }

    return (
        <li className={classNames(styles.pageElement, { [styles.active]: isActive === active })}
            onClick={handleIsActivePage}>
            <Link to={link}>{linkText}</Link>
        </li>
    )
}
export default PageElement;