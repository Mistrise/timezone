import {City} from "@/app/page";
import styles from './ModalListItem.module.css'

interface Props {
  city: City
    setCity: (city: any) => void
    cities: City[]
}

const ModalListItem = ({city, setCity, cities}: Props) => {
  return (
      <div className={styles.modal__list__item} onClick={() => {
          !cities.find((initialCity) => initialCity.id === city.id) && setCity([...cities, city])
      }}>
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