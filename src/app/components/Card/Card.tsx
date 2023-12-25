import styles from './Card.module.css'
import Sunny from '../../../../public/icons/State=Sunny.svg'
import Night from '../../../../public/icons/State=Clear-night.svg'
import Close from '../../../../public/icons/Icon=cross-circle-outlined.svg'
import Drag from '../../../../public/icons/Icon=drag.svg'
import Gradient from '../../../../public/assets/Gradient.svg'
import Image from "next/image";
import {useTimeStore} from "@/app/store";
import {days, month} from "@/constants/constants";
import {useEffect, useRef, useState} from "react";
import {format} from 'date-fns'



interface Props {
    city?: string
    timeFormat: boolean
    dragItem: any
    dragOverItem: any
    handleSort: () => void
    index: number
}

const Card = ({city, timeFormat, dragItem, dragOverItem, handleSort, index}: Props) => {


    const gradientRef = useRef(null)

    const [isHovering, setIsHovering] = useState(false)

    const timeOffset = useTimeStore(state => state.timeOffset)

    const removeTimezone = useTimeStore(state => state.removeTimezone)
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

    const data = new Date()

    const dateFromApi = new Date()
    // data.utc_datetime.slice(0, -6)) cutting unnecessary part with timezone

    const setGradient = () => {
        gradientRef.current.style.backgroundPositionX = `${4.16666666667 * Math.random()}%`
    }

    useEffect(() => {
        setGradient()
    }, []);
    // @ts-ignore
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
        ref={gradientRef}
        style={{position: "relative", overflow: "hidden"}}
    >
        <Image src={Gradient} alt={''}
               style={{
                position: "absolute",
                zIndex: '-2', opacity: '.99',
                backgroundPositionX: `${4.16666666667 * dateFromApi.getHours()}%`
               }
        }>

        </Image>
        <div className={styles.card__title}>{data.getTimezoneOffset()}</div>
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
        <div
            className={`${timeFormat ? styles.card__date__24h : styles.card__date}`}
        >
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