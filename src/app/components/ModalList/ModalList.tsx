import ModalListItem from "@/app/components/ModalListItem/ModalListItem";
import styles from './ModalList.module.css'
import {City} from "@/app/page";

interface Props {
    modalInput: string
    cities: City[]
    setCity: (c: any) => void
    mainPageCities: City[]
}

const ModalList = ({cities, setCity, mainPageCities}: Props) => {

    return (
        <div className={styles.modal__list}>
            {cities.map(city => <ModalListItem key={city.id} city={city} cities={mainPageCities} setCity={setCity}/>)}
        </div>
    )
}

export default ModalList