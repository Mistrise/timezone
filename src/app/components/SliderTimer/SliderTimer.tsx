import styles from "./SliderTimer.module.css";
import Image from "next/image";
import Cross from "../../../../public/icons/Icon=cross-circle.svg";
import React from "react";
import {useTimeStore} from "@/app/store";
import Dot from "../../../../public/icons/State=Off.svg"

interface Props {
    resetSlider: (status: boolean) => void
}


const SliderTimer = ({resetSlider}:Props) => {
    const timeOffset = useTimeStore(state => state.timeOffset)
    const changeTime = useTimeStore(state => state.changeTime)
    const currentDate = useTimeStore(state => state.currentDate)

  return (
      <div className={styles.slider__timer}>
          { timeOffset !== '' ?
              <>
                  <div className={styles.slider__text}>{timeOffset}</div>
                  <Image
                      src={Cross} alt={''} width={16} height={16}
                      className={styles.slider__image}
                      onClick={() => {
                          changeTime('')
                          currentDate(new Date())
                          resetSlider(true)
                      }}>
                  </Image>
              </>
              :
                <Image src={Dot} alt={''} width={83} height={24}></Image>
          }
      </div>
  )
}

export default SliderTimer