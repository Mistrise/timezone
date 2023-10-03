import styles from "./SliderTimer.module.css";
import Image from "next/image";
import Cross from "../../../../public/icons/Icon=cross-circle.svg";
import React from "react";
import {useTimeStore} from "@/app/store";

interface Props {
    resetSlider: (status: boolean) => void
}


const SliderTimer = ({resetSlider}:Props) => {
    const store = useTimeStore()

  return (
      <div className={styles.slider__timer}>
          <div className={styles.slider__text}>{store.timeOffset}</div>
          <Image
              src={Cross} alt={''} width={16} height={16}
              className={styles.slider__image}
              onClick={() => {
                  store.changeTime('')
                  resetSlider(true)
              }}>
          </Image>
      </div>
  )
}

export default SliderTimer