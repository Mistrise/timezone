import styles from './Card.module.css'
import {City} from "@/app/page";
import Sunny from '../../../../public/icons/State=Sunny.svg'
import Image from "next/image";

interface Props {
    city: City
    timeFormat: boolean
}

const Card = ({city, timeFormat}: Props) => {
    return <div className={styles.card}>
        <div className={styles.card__title}>{city.city}</div>
        <div className={styles.card__time}>
            <span className={`${styles.card__time__item} ${timeFormat ? styles.card__time__item__24h : styles.card__time__item__am} `}>
                {timeFormat || city.hours < 13 ? city.hours :  city.hours - 12}
                :
                {city.minutes < 10 ? `0${city.minutes}` : city.minutes}
            </span>
            {timeFormat ?
                null :
                <span className={styles.card__am}>
                    {city.hours > 13 ? <p>PM</p> : <p>AM</p>}
                </span>}
        </div>
        <div className={styles.card__timezone}>{city.timezone}</div>
        <div className={styles.card__date}>
            <Image src={Sunny} width={18} height={18} alt='' style={{marginRight: '3px'}}></Image>
            {city.date}
        </div>
    </div>
}

export default Card