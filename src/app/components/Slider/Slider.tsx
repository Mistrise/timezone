"use client"

import styles from './Slider.module.css'
import React, {useCallback, useEffect, useRef, useState} from "react";
import SliderTimer from "@/app/components/SliderTimer/SliderTimer";
import {useTimeStore} from "@/app/store";




const Slider = () => {
    const changeTime = useTimeStore(state => state.changeTime)
    let startX: number | null = null
    let innerScrollElement = useRef<HTMLDivElement | null>(null);
    let timeElement = useRef<HTMLDivElement | string>('');
    let totalDiffX = 0;
    let currentDiffX = 0;
    const PIXELS_PER_HOUR = 50;
    const [resetTime, setResetTime] = useState(false)


    const calcRoundedTime = useCallback((pxOffset: number) =>  {
        const hoursOffset = Math.round(pxOffset / PIXELS_PER_HOUR * 2) / 2;
        if (hoursOffset === 0 || resetTime) {
            timeElement.current = '';
        } else {
            const prevElement = timeElement.current
            const sign = hoursOffset > 0 ? '+' : '';
            timeElement.current = `${sign}${hoursOffset}h`;
            if (prevElement !== timeElement.current) {
                changeTime(`${sign}${hoursOffset}h`)
            }
        }
    }, [resetTime, changeTime])

    useEffect(() => {
        document.addEventListener('mouseup', (e) => {
            totalDiffX = currentDiffX;
            startX = null;
        })

        document.addEventListener('mousemove', (e) => {
            console.log('move')
            if (startX) {
                const diffX = e.clientX - startX;
                currentDiffX = totalDiffX - diffX;
                innerScrollElement.current.style.transform = `translate(${diffX}px)`;
                calcRoundedTime(currentDiffX)
            }
        })
    }, []);

    return (
        <div className={styles.container}
             onMouseDown={event => {
                 console.log('down')
                 startX = event.clientX
             }}
        >
            <SliderTimer resetSlider={setResetTime}/>
            <div className={styles.slider__background} ref={innerScrollElement}></div>
        </div>
    )
}

export default React.memo(Slider)