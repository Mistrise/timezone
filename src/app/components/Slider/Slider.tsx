"use client"

import styles from './Slider.module.css'
import Image from "next/image";
import Dot from '../../../../public/icons/State=Off.svg'
import {useContext, useRef, useState} from "react";
import Cross from "../../../../public/icons/Icon=cross-circle.svg";
import Plus from "../../../../public/icons/Icon=plus.svg";
import { useTimeContext} from "@/app/context";


const Slider = () => {
    let { setGlobalTimeOffset} = useTimeContext()
    let startX: number | null = null
    let innerScrollElement = useRef<HTMLDivElement | null>(null);
    let timeElement = useRef<HTMLDivElement | string>('');
    let totalDiffX = 0;
    let currentDiffX = 0;
    let timerRef = useRef<HTMLDivElement | null >(null)
    const PIXELS_PER_HOUR = 50;


    function calcRoundedTime(pxOffset: number) {
        const hoursOffset = Math.round(pxOffset / PIXELS_PER_HOUR * 2) / 2;
        if (hoursOffset === 0) {
            timeElement.current = '';
        } else {
            const sign = hoursOffset > 0 ? '+' : '';
            timeElement.current = `${sign}${hoursOffset}h`;
        }
    }

    return (
        <div className={styles.container}
             onMouseDown={event => startX = event.clientX}
             onMouseUp={event => {
                 totalDiffX = currentDiffX;
                 startX = null;
             }}
             onMouseMove={event => {
                 if (startX && innerScrollElement.current !== null && timerRef.current !== null) {
                     const diffX = event.clientX - startX;
                     currentDiffX = totalDiffX - diffX;
                     innerScrollElement.current.style.transform = `translate(${diffX}px)`;
                     calcRoundedTime(currentDiffX)
                     localStorage.setItem('globalTimeOffset', JSON.stringify(timeElement.current))
                     // @ts-ignore
                     timerRef.current.innerHTML = localStorage.getItem('globalTimeOffset')?.slice(1,-1)
                 }
             }}
        >

                <div className={styles.slider__timer}>

                    <div className={styles.slider__text} ref={timerRef}></div>
                    <Image
                        src={Cross} alt={''} width={16} height={16}
                        className={styles.slider__image}
                        onClick={() => {
                            if (timerRef.current !== null) {
                                localStorage.setItem('globalTimeOffset', JSON.stringify(''))
                                timeElement.current = ''
                                totalDiffX = 0

                                // @ts-ignore
                                // timerRef.current.innerHTML = localStorage.getItem('globalTimeOffset')?.slice(1,-1)
                            }
                        }}>
                    </Image>

                </div>


            <div className={styles.slider__background} ref={innerScrollElement}></div>
        </div>
    )
}

export default Slider