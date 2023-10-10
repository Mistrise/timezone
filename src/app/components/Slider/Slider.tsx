"use client"

import styles from './Slider.module.css'
import React, {useCallback, useRef, useState} from "react";
import SliderTimer from "@/app/components/SliderTimer/SliderTimer";

interface Props {
    setGlobalTime: (time: string) => void
}


const Slider = ({setGlobalTime}:Props) => {
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
            const sign = hoursOffset > 0 ? '+' : '';
            timeElement.current = `${sign}${hoursOffset}h`;
            setGlobalTime(`${sign}${hoursOffset}h`)
        }
    }, [resetTime, setGlobalTime])


    return (
        <div className={styles.container}
             onMouseUp={() => {
                 totalDiffX = currentDiffX;
                 startX = null;
             }}
             onMouseDown={event => startX = event.clientX}
             onMouseMove={event => {
                 if (startX && innerScrollElement.current !== null) {
                     setResetTime(false)
                     const diffX = event.clientX - startX;
                     currentDiffX = totalDiffX - diffX;
                     innerScrollElement.current.style.transform = `translate(${diffX}px)`;
                     calcRoundedTime(currentDiffX)
                 }
             }}
        >
            <SliderTimer resetSlider={setResetTime}/>
            <div className={styles.slider__background} ref={innerScrollElement}></div>
        </div>
    )
}

export default React.memo(Slider)