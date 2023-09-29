import ModalListItem from "@/app/components/ModalListItem/ModalListItem";
import styles from './ModalList.module.css'
import {City} from "@/app/page";

interface Props {
    modalInput: string
    cities: City[]
    setCity: (c: any) => void
    set_City: (c: any) => void
}

const ModalList = ({modalInput, cities, setCity, set_City}: Props) => {

    return (
        <div className={styles.modal__list}>
            {cities.map(city => <ModalListItem key={city.id} city={city}/>)}
        </div>
    )
}

export default ModalList