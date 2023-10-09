import styles from './CitiesModal.module.css'
import ModalSearch from "@/app/components/ModalSearch/ModalSearch";
import ModalList from "@/app/components/ModalList/ModalList";
import Close from '../../../../public/icons/Icon=Close.svg'
import Image from "next/image";
import {useEffect, useState} from "react";
import {citiesConst} from "@/constants/constants";
import {City} from "@/app/page";

interface Props {
    setShowSearch: (show: boolean) => void
    setCity: (c: any) => void
    cities: City[]
//     fix type
}

const CitiesModal = ({setShowSearch, setCity, cities}:Props) => {

    const [modalInput, setModalInput] = useState('')

    const [nextCities, setNextCities] = useState(citiesConst)

    function filterModalInput(input: string) {
        input === '' ?
            setNextCities(citiesConst) :
            setNextCities(nextCities.filter(city => city.city.toLowerCase().startsWith(input.toLowerCase())))
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
            <ModalList modalInput={modalInput} cities={nextCities} setCity={setCity} mainPageCities={cities}/>
        </div>
    )
}

export default CitiesModal