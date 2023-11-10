import styles from './Card.module.css'
import Sunny from '../../../../public/icons/State=Sunny.svg'
import Night from '../../../../public/icons/State=Clear-night.svg'
import Close from '../../../../public/icons/Icon=cross-circle-outlined.svg'
import Drag from '../../../../public/icons/Icon=drag.svg'
import Image from "next/image";
import {useTimeStore} from "@/app/store";
import {days, month} from "@/constants/constants";
import {useState} from "react";
import {useQuery} from "@tanstack/react-query";
import axios from "axios";

interface Props {
    city?: string
    timeFormat: boolean
    dragItem: any
    dragOverItem: any
    handleSort: () => void
    index: number
}

const Card = ({city, timeFormat, dragItem, dragOverItem, handleSort, index}: Props) => {

    const { isPending, error, data,  } = useQuery({
        queryKey: ['city', city],
        queryFn: () =>
            axios
                .get(`https://worldtimeapi.org/api/${city}`)
                .then((res) => res.data),
    })

    const [isHovering, setIsHovering] = useState(false)

    const setCitiesList = useTimeStore(state => state.removeCitiesList)

    const citiesList = useTimeStore(state => state.citiesList)

    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }

    if (isPending) return 'Loading...'

    if (error) return 'An error has occurred: ' + error.message

    const currentDate = new Date(data.datetime)

    return (<div
        onMouseOver={handleMouseOver}
        onMouseOut={handleMouseOut}
        draggable
        onDragStart={() => dragItem.current = index}
        onDragEnter={() => dragOverItem.current = index}
        onDragEnd={handleSort}
        onDragOver={event => event.preventDefault()}
        className={styles.card}
    >
        <div className={styles.card__title}>{data.timezone.substring(data.timezone.lastIndexOf('/') + 1).replace("_", " ")}</div>
        <div className={styles.card__time}>
            <div className={`${styles.card__time__item} ${timeFormat 
                ? styles.card__time__item__24h 
                : styles.card__time__item__am} `}>
                {timeFormat || currentDate.getHours() < 13
                    ? currentDate.getHours()
                    :  currentDate.getHours() - 13 }
                :
                {currentDate.getMinutes() < 10 ? `0${currentDate.getMinutes()}` : currentDate.getMinutes()}
            </div>
            {timeFormat ?
                null :
                <span className={styles.card__am}>
                    {currentDate.getHours() > 13 ? <p>PM</p> : <p>AM</p>}
                </span>}
        </div>
        <div className={styles.card__timezone}>GMT {data.utc_offset}</div>
        <div className={styles.card__date}>
            {currentDate.getHours() > 7 && currentDate.getHours() < 22 ?
                <Image src={Sunny} width={18} height={18} alt='' style={{marginRight: '3px'}}></Image>
                :
                <Image src={Night} width={18} height={18} alt='' style={{marginRight: '3px'}}></Image>
            }

            {`${days[currentDate.getDay()]} ${currentDate.getDate()} ${month[currentDate.getMonth()]}`}
        </div>
                <div className={isHovering ? `${styles.card__controls__visible} ${styles.card__close}` :
                    `${styles.card__controls__invisible} ${styles.card__close}` }
                     onMouseOver={handleMouseOver}
                     onMouseOut={handleMouseOut}
                     onClick={() => {
                     }}
                >
                    <Image src={Close} width={24} height={24} alt=''></Image>
                </div>
                <div
                    className={isHovering ? `${styles.card__controls__visible} ${styles.card__drag}` :
                        `${styles.card__controls__invisible} ${styles.card__drag}` }
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}>
                    <Image src={Drag} width={24} height={24} alt=''></Image>
                </div>
    </div>)
}

export default Card