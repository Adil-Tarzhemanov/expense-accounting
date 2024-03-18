import styles from './styles.module.scss'
import {Dispatch, FC, SetStateAction} from "react"
import {useAppSelector} from "../../../../store/hooks";

interface SelectTransactionProps {
    value: string,
    setValue: Dispatch<SetStateAction<string>>,
}

const SelectCategory: FC<SelectTransactionProps> = ({value, setValue}) => {
    const categories = useAppSelector(state => state.categories.categories);

    const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setValue(event.target.value);
        console.log(event)
        console.log(event.target.value)
    };


    return (
        <>
            {/*<h4></h4>*/}
            {categories.length ? (
                <label className={styles.label}>
                    <h4 className={styles.title}>Category</h4>
                    <select className={styles.select} value={value} onChange={handleSelectChange}>
                        <option></option>
                        {categories.map((ctg, idx) => (
                            <option key={idx} value={ctg.id} className={styles.option}>
                                {ctg.title}
                            </option>
                        ))}
                    </select>
                </label>
            ) : (
                <h4 className={styles.validationError}>
                    To continue create a category first
                </h4>
            )}
        </>
    )
}
export default SelectCategory;