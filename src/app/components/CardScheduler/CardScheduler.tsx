import {City} from "@/app/page";
import styles from './CardScheduler.module.css'

interface Props {
    city: City
}

const CardScheduler = ({city}: Props) => {
  return (
      <div className={styles.card}>
        <div className={styles.card__title}>{city.city}</div>
          <div className={styles.card__time}>
              <span className={styles.card__time__item}>
              {city.timeFormat === 'PM' ? city.hours - 12 : city.hours}
              :
              {city.minutes < 10 ? `0${city.minutes}` : city.minutes}
              </span>
              <span className={styles.card__am}>
                  {city.timeFormat}
              </span>
          </div>
      </div>
  )
}

export default CardScheduler