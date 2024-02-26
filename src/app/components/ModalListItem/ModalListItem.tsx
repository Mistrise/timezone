import styles from './ModalListItem.module.css'
import {City, useTimeStore} from "@/app/store";
import {getTzOffsetByName} from "@/helpers/getTzOffsetByName";
import {useMemo} from "react";
import countryCodeToFlagEmoji from "@/helpers/translateCodeToEmoji";


interface Props {
  city: City,
  setShowSearch: (show: boolean) => void
}

const ModalListItem = ({city, setShowSearch}: Props) => {
  const addCity = useTimeStore(state => state.addCity)

  const offset = useMemo(() => {
    const calculatedOffset = getTzOffsetByName(city.timezone) / 60
    return `GMT ${calculatedOffset >= 0 ? '+' : ''}${calculatedOffset}`
  }, [])

  return (
    <div className={styles.modal__list__item} onClick={() => {
        setShowSearch(false)
        addCity(city)
    }}>
        <div>{countryCodeToFlagEmoji(city.country_code)}</div>
        <div className={styles.modal__list__item_city}>
        {city.name}
      </div>
      <div className={styles.modal__list__item__country}>
        {city.timezone || 'other'}
      </div>
      <div className={styles.modal__list__item__timezone}>
        {offset}
      </div>
    </div>
  )
}

export default ModalListItem