import styles from './Card.module.css'
import {City} from "@/app/page";
import Sunny from '../../../../public/icons/State=Sunny.svg'
import Image from "next/image";

interface Props {
    city: City[]
}

const Card = ({city}: Props) => {
    return <div className={styles.card}>
        <div className={styles.card__title}>{city[0].city}</div>
        <div className={styles.card__time}>
            <span className={styles.card__time__item}>{city[0].hours}:{city[0].minutes}</span>
            <span className={styles.card__am}>{city[0].timeFormat}</span>
        </div>
        <div className={styles.card__timezone}>{city[0].timezone}</div>
        <div className={styles.card__date}>
            <Image src={Sunny} width={18} height={18} alt='' style={{marginRight: '3px'}}></Image>
            {city[0].date}
        </div>
    </div>
}

export default Card