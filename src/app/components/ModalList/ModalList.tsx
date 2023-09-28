import ModalListItem from "@/app/components/ModalListItem/ModalListItem";
import styles from './ModalList.module.css'
import {City} from "@/app/page";

interface Props {
    modalInput: string
    cities: City[]
}

const ModalList = ({modalInput, cities}: Props) => {

    return (
        <div className={styles.modal__list}>
            {cities.map(city => <ModalListItem key={city.id} city={city}/>)}
        </div>
    )
}

export default ModalList