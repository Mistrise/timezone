import styles from './Card.module.css'
import {City} from "@/app/page";

interface Props {
    city: City[]
}

const Card = ({city}: Props) => {
    return <div className={styles.card}>
        <div className={styles.card__title}>{city[0].city}</div>
        <div className={styles.card__time}>{city[0].time}</div>
        <div className={styles.card__timezone}>{city[0].timezone}</div>
        <div className={styles.card__date}>{city[0].date}</div>
    </div>
}

export default Card