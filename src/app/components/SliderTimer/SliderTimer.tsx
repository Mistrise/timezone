import styles from "./SliderTimer.module.css";
import Image from "next/image";
import Cross from "../../../../public/icons/Icon=cross-circle.svg";
import React from "react";
import {useRapidTimeStore, useTimeStore} from "@/app/store";

type Props = {
  onReset: () => void
}
const SliderTimer = ({onReset} : Props) => {
  const hoursOffset = useTimeStore(state => state.hoursOffset)
  const setHoursOffset = useTimeStore(state => state.setHoursOffset)
  const setSecondsOffset = useRapidTimeStore(state => state.setSecondsOffset)


  return (
    <div className={`${styles.slider__timer} ${!hoursOffset && styles.slider__timer_disabledState}`}>
          <div className={styles.slider__text}>
              {hoursOffset > 0 ?
                  `+${hoursOffset.toString().endsWith('5') ? `${hoursOffset.toFixed(0)}:30` : `${hoursOffset}:00` }h` :
                  `${hoursOffset.toString().endsWith('5') ? `${hoursOffset.toFixed(0)}:30` : `${hoursOffset}:00` }h`}
          </div>
          <Image
            src={Cross} alt={''} width={16} height={16}
            className={styles.slider__image}
            onClick={() => {
              setHoursOffset(0)
              setSecondsOffset(0)
              onReset()
            }}
            onTouchStart={ () => {
                setHoursOffset(0)
                setSecondsOffset(0)
                onReset()
            }
            }
          >
          </Image>
    </div>
  )
}

export default SliderTimer