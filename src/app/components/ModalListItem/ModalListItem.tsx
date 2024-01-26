import styles from './ModalListItem.module.css'
import {TimeZone, useTimeStore} from "@/app/store";

interface Props {
  timeZone: TimeZone
}

const ModalListItem = ({timeZone}: Props) => {
    const splitCitiesAndCountries = timeZone.zoneName.split('/')

    const lengthOfCitiesArr = splitCitiesAndCountries.length

    const cityString = splitCitiesAndCountries[lengthOfCitiesArr - 1]

    const zoneString = splitCitiesAndCountries[lengthOfCitiesArr - 2]

    const addTimezone = useTimeStore(state => state.addTimezone)

    const calculateOffset = () => {
        const calculatedOffset = timeZone.gmtOffset / 3600
        if (calculatedOffset > 0) return `GMT +${calculatedOffset > 10 ? calculatedOffset : '0' + calculatedOffset}`
        else if (calculatedOffset < 0) return `GMT ${calculatedOffset > 10 ? calculatedOffset : '-0' + Math.abs(calculatedOffset)}`
        else return 'GMT +00'
    }

  return (
      <div className={styles.modal__list__item} onClick={() => addTimezone(timeZone.zoneName)}>
          <div>🏳</div>
          <div className={styles.modal__list__item_city}>
              {cityString.replace('_', ' ')}
          </div>
          <div className={styles.modal__list__item__country}>
              {zoneString ? zoneString.replace('_', ' ') : 'other'}
          </div>
          <div className={styles.modal__list__item__timezone}>
              {calculateOffset()}
          </div>
      </div>
  )
}

export default ModalListItem