import ModalListItem from "@/app/components/ModalListItem/ModalListItem";
import styles from './ModalList.module.css'
import {City} from "@/app/page";
import {useTimeStore} from "@/app/store";

interface Props {
    modalInput: string
    cities: City[]
    setCity: (c: any) => void
    mainPageCities: City[]
}

const ModalList = ({cities, setCity, mainPageCities}: Props) => {
    const timezones = useTimeStore(state => state.timezones)
    return (
        <div className={styles.modal__list}>
            {timezones.map((city: any, index: number) => <ModalListItem key={index} city={city} cities={mainPageCities} setCity={setCity}/>)}
        </div>
    )
}

export default ModalList