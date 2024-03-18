import styles from './styles.module.scss'
import {Dispatch, FC, SetStateAction, useState} from "react"

interface InputTransactionProps {
    title: string,
    placeholder: string,
    type: string,
    inputValue: string,
    setInputValue: Dispatch<SetStateAction<string>>,
}

const InputTransaction: FC<InputTransactionProps> = ({title, placeholder, type, inputValue, setInputValue}) => {
    return (
        <label className={styles.titleAndInput}>
            <h4 className={styles.title}>{title}</h4>
            <input className={styles.titleInput}
                   placeholder={placeholder}
                   type={type}
                   value={inputValue}
                   onChange={(e) =>  setInputValue(e.target.value)}
            />
        </label>
    )
}
export default InputTransaction;