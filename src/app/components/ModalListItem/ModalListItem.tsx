import styles from './ModalListItem.module.css'
import {useTimeStore} from "@/app/store";

interface Props {
  city: any
}

const ModalListItem = ({city}: Props) => {
    const splitCitiesAndCountries = city.split('/')

    const lengthOfCitiesArr = splitCitiesAndCountries.length

    const cityString = splitCitiesAndCountries[lengthOfCitiesArr - 1]

    const zoneString = splitCitiesAndCountries[lengthOfCitiesArr - 2]

    const addTimezone = useTimeStore(state => state.addTimezone)


  return (
      <div className={styles.modal__list__item} onClick={() => addTimezone(city)}>
          <div>🏳</div>
          <div className={styles.modal__list__item_city}>
              {cityString.replace('_', ' ')}
          </div>
          <div className={styles.modal__list__item__country}>
              {zoneString ? zoneString.replace('_', ' ') : 'other'}
          </div>
          <div className={styles.modal__list__item__timezone}>
              todo
          </div>
      </div>
  )
}

export default ModalListItem