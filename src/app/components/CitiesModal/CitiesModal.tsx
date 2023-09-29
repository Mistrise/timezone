import styles from './CitiesModal.module.css'
import ModalSearch from "@/app/components/ModalSearch/ModalSearch";
import ModalList from "@/app/components/ModalList/ModalList";
import Close from '../../../../public/icons/Icon=Close.svg'
import Image from "next/image";
import {useEffect, useState} from "react";
import {City} from "@/app/page";

interface Props {
    setShowSearch: (show: boolean) => void
    cities: City[]
    setCity: (c: any) => void
//     fix type
}

const CitiesModal = ({setShowSearch, cities, setCity}:Props) => {

    const [modalInput, setModalInput] = useState('')

    const [_cities, set_City] = useState(cities)

    function filterModalInput(input: string) {
        input === '' ?
            set_City(cities) :
            set_City(_cities.filter(city => city.city.toLowerCase().startsWith(input.toLowerCase())))
    }

    useEffect(() => {
        filterModalInput(modalInput)
    }, [modalInput])

    return (
        <div className={styles.modal__container}>
            <div className={styles.modal__title}>
                <div className={styles.modal__title__text}>Add City</div>
                <Image src={Close} alt={''} className={styles.modal__title__image} onClick={() => setShowSearch(false)} />
            </div>
            <ModalSearch modalInput={modalInput} setModalInput={setModalInput}/>
            <ModalList modalInput={modalInput} cities={_cities} setCity={setCity} set_City={set_City}/>
        </div>
    )
}

export default CitiesModal