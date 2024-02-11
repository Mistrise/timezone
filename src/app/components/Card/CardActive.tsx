import {useEffect, useMemo, useRef} from "react";
import {City, TimeZone, useRapidTimeStore, useTimeStore} from "@/app/store";
import clsx from "clsx";
import styles from "@/app/components/Card/Card.module.css";
import Image from "next/image";
import Gradient from "../../../../public/assets/Gradient.svg";
import {addSeconds, format} from "date-fns";
import Sunny from "../../../../public/icons/State=Sunny.svg";
import Night from "../../../../public/icons/State=Clear-night.svg";
import {days, month} from "@/constants/constants";
import Close from "../../../../public/icons/Icon=cross-circle-outlined.svg";
import Drag from "../../../../public/icons/Icon=drag.svg";
import {getTzOffsetByName} from "@/helpers/getTzOffsetByName";


interface Props {
  city: City
  timeFormat: boolean
}

const PERCENT_MOVE_PER_SECOND = 100 / 24 / 60 / 60

function getCityName(zoneName: string) {
  const parts = zoneName.split('/')
  return parts[parts.length - 1].replace('_', ' ');
}
function getBgPositionPercent(gmtOffset: number, secondsOffset: number) {
  const date = addSeconds(new Date(), gmtOffset + secondsOffset)
  const totalSeconds = date.getSeconds() + date.getMinutes() * 60 + date.getHours() * 60 * 60;
  return Math.round(PERCENT_MOVE_PER_SECOND * totalSeconds * 1000) / 1000
}

export const CardActive = ({timeFormat, city}: Props) => {
  const gmtOffsetSeconds = useMemo(() => {
    return getTzOffsetByName(city.timezone) * 60
  }, [])
  const gradientRef = useRef<HTMLDivElement>(null)
  const bgPositionPercentRef = useRef<number>(getBgPositionPercent(gmtOffsetSeconds, 0))
  const currentDate = useTimeStore(state => state.currentDate)
  const hoursOffset = useTimeStore(state => state.hoursOffset)
  const removeCity = useTimeStore(state => state.removeCity)

  const timeZoneDate = useMemo(() => {
    const secondsToAdd = (new Date()).getTimezoneOffset() * 60 + gmtOffsetSeconds;
    return addSeconds(currentDate, secondsToAdd + hoursOffset * 60 * 60);
  }, [currentDate, gmtOffsetSeconds, hoursOffset])


  useEffect(() => {
    const updateBgPosition = (secondsOffset: number) => {
      if (gradientRef.current) {
        const percent = getBgPositionPercent(gmtOffsetSeconds, secondsOffset);
        bgPositionPercentRef.current = percent;
        gradientRef.current.style.backgroundPositionX = `${percent}%`;
      }
    }
    updateBgPosition(0);
    return useRapidTimeStore.subscribe((state) => {
      updateBgPosition(state.secondsOffset)
    })
  }, [gradientRef.current, gmtOffsetSeconds])

  const gmtOffset = gmtOffsetSeconds / 60 / 60;

  return (<div
    className={styles.card}
    ref={gradientRef}
    style={
      {
        backgroundImage: `url(${Gradient.src})`,
        backgroundPositionX: `${bgPositionPercentRef.current}%`
      }
    }
  >
    <div className={styles.card_grid}>
      <div className={styles.card__title}>{city.name}</div>
      <div className={styles.card__time}>
        <div className={`${styles.card__time__item}`}>
          {timeFormat || timeZoneDate.getHours() < 13
            ? timeZoneDate.getHours() < 10
              ? `0${timeZoneDate.getHours()}`
              : timeZoneDate.getHours()
            : format(timeZoneDate, 'h')}
          :
          {timeZoneDate.getMinutes() < 10 ? `0${timeZoneDate.getMinutes()}` : timeZoneDate.getMinutes()}
        </div>
        <span className={clsx(styles.card__am, {
          [styles.card__am_active]: !timeFormat
        })}>
                    {timeZoneDate.getHours() > 13 ? <p>PM</p> : <p>AM</p>}
            </span>
      </div>
      <div className={styles.card__timezone}>GMT {gmtOffset >= 0 ? `+${gmtOffset}` : gmtOffset}</div>
      <div
        className={clsx(styles.card__date, {
          [styles.card__date__am]: !timeFormat
        })}
      >
        {timeZoneDate.getHours() > 7 && timeZoneDate.getHours() < 22 ?
          <Image src={Sunny} width={18} height={18} alt='' style={{marginRight: '3px'}}></Image>
          :
          <Image src={Night} width={18} height={18} alt='' style={{marginRight: '3px'}}></Image>
        }

        {`${days[timeZoneDate.getDay()]} ${timeZoneDate.getDate()} ${month[timeZoneDate.getMonth()]}`}
      </div>
    </div>
    <div className={styles.card_controls}>
      <div className={styles.card_control} onClick={() => removeCity(city)}>
        <Image src={Close} width={24} height={24} alt=''></Image>
      </div>
      <div className={styles.card_control}>
        <Image src={Drag} width={24} height={24} alt=''></Image>
      </div>
    </div>
  </div>)
}