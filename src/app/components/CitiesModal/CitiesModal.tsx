import styles from './CitiesModal.module.css'
import ModalSearch from "@/app/components/ModalSearch/ModalSearch";
import ModalList from "@/app/components/ModalList/ModalList";
import Close from '../../../../public/icons/Icon=Close.svg'
import Image from "next/image";
import {useEffect, useState} from "react";

interface Props {
  setShowSearch: (show: boolean) => void,
}

const CitiesModal = ({setShowSearch}: Props) => {
  const [modalInput, setModalInput] = useState('')

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowSearch(false)
      }
    }
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, []);

  return (
    <div className={styles.modal__background} onClick={() => {
      setShowSearch(false)
    }}>
      <div className={styles.modal__container} onClick={(event) => {
        event.stopPropagation()
      }
      }>
        <div className={styles.modal__title}>
          <div className={styles.modal__title__text}>Add City</div>
          <Image src={Close} alt={''} className={styles.modal__title__image} onClick={() => {
            setShowSearch(false)
          }}/>
        </div>
        <ModalSearch setModalInput={setModalInput}/>
        <ModalList setShowSearch={setShowSearch} modalInput={modalInput}/>
      </div>
    </div>
  )
}

export default CitiesModal