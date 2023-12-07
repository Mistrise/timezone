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
import {addMinutes, format} from 'date-fns'
import {gradients} from '@/constants/constants'


interface Props {
    city?: string
    timeFormat: boolean
    dragItem: any
    dragOverItem: any
    handleSort: () => void
    index: number
}

const Card = ({city, timeFormat, dragItem, dragOverItem, handleSort, index}: Props) => {

    const { isPending, error, data } = useQuery({
        queryKey: ['city', city],
        queryFn: () =>
            axios
                .get(`https://worldtimeapi.org/api/${city}`)
                .then((res) => res.data),
    })

    const [isHovering, setIsHovering] = useState(false)

    const timeOffset = useTimeStore(state => state.timeOffset)

    const removeTimezone = useTimeStore(state => state.removeTimezone)

    if (isPending) return <div className={styles.card__skeleton}></div>

    if (error) return 'An error has occurred: ' + error.message

    const handleMouseOver = () => {
        setIsHovering(true)
    }

    const getActualTime = (time: string) => {
        // format from api 	"utc_offset": "+03:00",
        const hours = Number(time.slice(0,3))
        const minutes = Number(time.slice(4,6))
        const offsetFromSlider = parseFloat(timeOffset)
        return  (offsetFromSlider * 60) ? (hours * 60) + minutes + (offsetFromSlider * 60) : (hours * 60) + minutes
    }

    const handleMouseOut = () => {
        setIsHovering(false)
    }

    const dateFromApi = addMinutes(new Date(data.utc_datetime.slice(0, -6)), getActualTime(data.utc_offset))
    // data.utc_datetime.slice(0, -6)) cutting unnecessary part with timezone

    const gradientFiltered = gradients.filter(e => e.hour === dateFromApi.getHours())


    return (<div
        onMouseOver={handleMouseOver}
        key={data + timeOffset}
        onMouseOut={handleMouseOut}
        draggable
        onDragStart={() => dragItem.current = index}
        onDragEnter={() => dragOverItem.current = index}
        onDragEnd={handleSort}
        onDragOver={event => event.preventDefault()}
        className={styles.card}
        style={{
            background: `linear-gradient(90deg, ${gradientFiltered[0].gradientStart}, ${gradientFiltered[0].gradientEnd})`,
    }}
    >
        <div className={styles.card__title}>{data.timezone.substring(data.timezone.lastIndexOf('/') + 1).replace("_", " ")}</div>
        <div className={styles.card__time}>
            <div className={`${styles.card__time__item} ${timeFormat 
                ? styles.card__time__item__24h 
                : styles.card__time__item__am} `}>
                {timeFormat || dateFromApi.getHours() < 13
                    ?  dateFromApi.getHours() < 10
                        ? `0${dateFromApi.getHours() }`
                        : dateFromApi.getHours()
                    :   format(dateFromApi,'h' ) }
                :
                {dateFromApi.getMinutes() < 10 ? `0${dateFromApi.getMinutes() }` : dateFromApi.getMinutes() }
            </div>
            {timeFormat ?
                null :
                <span className={styles.card__am}>
                    {dateFromApi.getHours() > 13  ? <p>PM</p> : <p>AM</p>}
                </span>}
        </div>
        <div className={styles.card__timezone}>GMT {data.utc_offset}</div>
        <div className={styles.card__date}>
            {dateFromApi.getHours() > 7 && dateFromApi.getHours() < 22 ?
                <Image src={Sunny} width={18} height={18} alt='' style={{marginRight: '3px'}}></Image>
                :
                <Image src={Night} width={18} height={18} alt='' style={{marginRight: '3px'}}></Image>
            }

            {`${days[dateFromApi.getDay()]} ${dateFromApi.getDate()} ${month[dateFromApi.getMonth()]}`}
        </div>
                <div className={isHovering ? `${styles.card__controls__visible} ${styles.card__close}` :
                    `${styles.card__controls__invisible} ${styles.card__close}` }
                     onMouseOver={handleMouseOver}
                     onMouseOut={handleMouseOut}
                     onClick={() => removeTimezone(data.timezone)}
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