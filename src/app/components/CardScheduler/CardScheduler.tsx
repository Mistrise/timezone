import styles from './CardScheduler.module.css'
import Image from "next/image";
import BackgroundImage24h from '../../../../public/assets/24h=On.svg'
import BackgroundImageAmPm from '../../../../public/assets/24h=Off.svg'
import {useTimeStore} from "@/app/store";

interface Props {
    city: any
    timeFormat: boolean
    dragItem: any
    dragOverItem: any
    handleSort: () => void
    index: number
}

const CardScheduler = ({city, timeFormat, dragItem, dragOverItem, handleSort, index}: Props) => {

    const currentDate = useTimeStore(state => state.currentDate)

  return (
      <div
          className={styles.card}
          draggable
          onDragStart={event => dragItem.current = index}
          onDragEnter={event => dragOverItem.current = index}
          onDragEnd={handleSort}
          onDragOver={event => event.preventDefault()}
      >
        <div className={styles.card__title}>{city.city}</div>
          <div className={styles.card__time}>
            <span className={`${styles.card__time__item} ${timeFormat ? styles.card__time__item__24h : styles.card__time__item__am} `}>
                {timeFormat || currentDate.getHours() < 13
                    ? currentDate.getHours()
                    :  currentDate.getHours() - 13 }
                :
                {currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes()}
            </span>
              {timeFormat ?
                  null :
                  <span className={styles.card__am}>
                    {currentDate.getHours()  > 13 ? <p>PM</p> : <p>AM</p>}
                </span>}
          </div>
          <div className={styles.card__time__scroll}>
              {timeFormat ? <Image src={BackgroundImage24h} alt={''}></Image>
                  :
                  <Image src={BackgroundImageAmPm} alt={''}></Image>
              }
          </div>
      </div>
  )
}

export default CardScheduler