import styles from './ModalListItem.module.css'
import {useTimeStore} from "@/app/store";

interface Props {
  city: any
}

const ModalListItem = ({city}: Props) => {
    const splitCitiesAndCountries = city.split('/')

    const lengthOfCitiesArr = splitCitiesAndCountries.length

    const cityString = splitCitiesAndCountries[lengthOfCitiesArr - 1]

    const addTimezone = useTimeStore(state => state.addTimezone)


  return (
      <div className={styles.modal__list__item} onClick={() => addTimezone(city)}>
          <div className={styles.modal__list__item__grid}>
              {cityString.replace('_', ' ')}
          </div>
      </div>
  )
}

export default ModalListItem