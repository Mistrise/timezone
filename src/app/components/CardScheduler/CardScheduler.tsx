import {City} from "@/app/page";
import styles from './CardScheduler.module.css'

interface Props {
    city: City
    timeFormat: boolean
}

const CardScheduler = ({city, timeFormat}: Props) => {
  return (
      <div className={styles.card}>
        <div className={styles.card__title}>{city.city}</div>
          <div className={styles.card__time}>
            <span className={`${styles.card__time__item} ${timeFormat ? styles.card__time__item__24h : styles.card__time__item__am} `}>
                {timeFormat ? city.hours :  city.hours - 12}
                :
                {city.minutes < 10 ? `0${city.minutes}` : city.minutes}
            </span>
              {timeFormat ?
                  null :
                  <span className={styles.card__am}>
                    {city.hours > 13 ? <p>PM</p> : <p>AM</p>}
                </span>}
          </div>
          <div className={styles.card__time__scroll}></div>
      </div>
  )
}

export default CardScheduler