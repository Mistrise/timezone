import styles from './CitiesModal.module.css'
import ModalSearch from "@/app/components/ModalSearch/ModalSearch";
import ModalList from "@/app/components/ModalList/ModalList";
import Close from '../../../../public/icons/Icon=Close.svg'
import Image from "next/image";
import {useEffect, useState} from "react";
import {useTimeStore} from "@/app/store";

interface Props {
    setShowSearch: (show: boolean) => void
}

const CitiesModal = ({ setShowSearch }:Props) => {

    const citiesConst = useTimeStore(state => state.timezones)
    const setTimezones = useTimeStore(state => state.setTimezones)

    const [modalInput, setModalInput] = useState('')

    function filterModalInput(input: string) {
        if (input !== '') {
            setTimezones(citiesConst)
        }
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
            <ModalList />
        </div>
    )
}

export default CitiesModal