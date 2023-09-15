import styles from './Card.module.css'
import {City} from "@/app/page";
import Sunny from '../../../../public/icons/State=Sunny.svg'
import Image from "next/image";

interface Props {
    city: City
}

const Card = ({city}: Props) => {
    return <div className={styles.card}>
        <div className={styles.card__title}>{city.city}</div>
        <div className={styles.card__time}>
            <span className={`${styles.card__time__item} ${city.timeFormat === '' ? styles.card__time__item__24h : styles.card__time__item__am} `}>
                {city.timeFormat === 'PM' ? city.hours - 13 : city.hours}
                :
                {city.minutes < 10 ? `0${city.minutes}` : city.minutes}
            </span>
            <span className={styles.card__am}>{city.timeFormat}</span>
        </div>
        <div className={styles.card__timezone}>{city.timezone}</div>
        <div className={styles.card__date}>
            <Image src={Sunny} width={18} height={18} alt='' style={{marginRight: '3px'}}></Image>
            {city.date}
        </div>
    </div>
}

export default Card