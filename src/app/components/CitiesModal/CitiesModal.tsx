import styles from './CitiesModal.module.css'
import ModalSearch from "@/app/components/ModalSearch/ModalSearch";
import ModalList from "@/app/components/ModalList/ModalList";
import Close from '../../../../public/icons/Icon=Close.svg'
import Image from "next/image";
import {useState} from "react";

interface Props {
    setShowSearch: (show: boolean) => void
}

const CitiesModal = ({ setShowSearch }:Props) => {

    const [modalInput, setModalInput] = useState('')



    return (
        <div className={styles.modal__background} onClick={() => {
            setShowSearch(false)
        }}>
            <div className={styles.modal__container} onClick={(event) => {
                event.stopPropagation()}
            }>
                <div className={styles.modal__title}>
                    <div className={styles.modal__title__text}>Add City</div>
                    <Image src={Close} alt={''} className={styles.modal__title__image} onClick={() => setShowSearch(false)} />
                </div>
                <ModalSearch setModalInput={setModalInput}/>
                <ModalList modalInput={modalInput}/>
            </div>
        </div>
    )
}

export default CitiesModal