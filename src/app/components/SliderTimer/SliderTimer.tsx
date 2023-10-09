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
    const store = useTimeStore()

  return (
      <div className={styles.slider__timer}>
          { store.timeOffset !== '' ?
              <>
                  <div className={styles.slider__text}>{store.timeOffset}</div>
                  <Image
                      src={Cross} alt={''} width={16} height={16}
                      className={styles.slider__image}
                      onClick={() => {
                          store.changeTime('')
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