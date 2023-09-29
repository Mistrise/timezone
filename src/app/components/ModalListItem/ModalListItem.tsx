import {City} from "@/app/page";
import styles from './ModalListItem.module.css'

interface Props {
  city: City
}

const ModalListItem = ({city}: Props) => {
  return (
      <div className={styles.modal__list__item}>
          <div className={styles.modal__list__item__grid}>
              {city.flag}
          </div>
          <div className={styles.modal__list__item__grid}>
              {city.city}
          </div>
          <div className={styles.modal__list__item__timezone}>
              {city.timezone}
          </div>
          <div className={styles.modal__list__item__country}>
              {city.country}
          </div>
      </div>
  )
}

export default ModalListItem