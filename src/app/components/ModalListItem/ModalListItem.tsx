import {City} from "@/app/page";
import styles from './ModalListItem.module.css'
import {useTimeStore} from "@/app/store";

interface Props {
  city: any
    setCity: (city: any) => void
    cities: City[]
}

const ModalListItem = ({city, setCity, cities}: Props) => {
  return (
      <div className={styles.modal__list__item}>
          <div className={styles.modal__list__item__grid}>
              {city}
          </div>
      </div>
  )
}

export default ModalListItem