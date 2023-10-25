import ModalListItem from "@/app/components/ModalListItem/ModalListItem";
import styles from './ModalList.module.css'
import {useTimeStore} from "@/app/store";



const ModalList = () => {
    const timezones = useTimeStore(state => state.timezones)
    return (
        <div className={styles.modal__list}>
            {timezones.map((city: any, index: number) => <ModalListItem key={index} city={city}/>)}
        </div>
    )
}

export default ModalList