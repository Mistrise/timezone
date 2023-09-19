import styles from './Slider.module.css'
import Image from "next/image";
import Dot from '../../../../public/icons/State=Off.svg'
import {useRef, useState} from "react";
import Cross from "../../../../public/icons/Icon=cross-circle.svg";

const Slider = () => {
    let startX: number | null = null
    let innerScrollElement = useRef(null);
    let timeElement = useRef('');
    let totalDiffX = 0;
    let currentDiffX = 0;
    let timerRef = useRef(null)

    const PIXELS_PER_HOUR = 50;

    console.log(timeElement)
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
                 if (startX) {
                     const diffX = event.clientX - startX;
                     currentDiffX = totalDiffX - diffX;
                     innerScrollElement.current.style.transform = `translate(${diffX}px)`;
                     calcRoundedTime(currentDiffX)
                     localStorage.setItem('globalTimeOffset', JSON.stringify(timeElement.current))
                     timerRef.current.innerHTML = localStorage.getItem('globalTimeOffset').slice(1,-1)
                 }
             }}
        >
                <div className={styles.slider__timer}>
                    <div className={styles.slider__text} ref={timerRef}>
                    </div>
                    <Image
                        src={Cross} alt={''} width={16} height={16}
                        onClick={() => {
                            localStorage.setItem('globalTimeOffset', JSON.stringify(''))
                            timeElement.current = ''
                            totalDiffX = 0
                            timerRef.current.innerHTML = localStorage.getItem('globalTimeOffset').slice(1,-1)
                        }}>
                    </Image>
                </div>
            <div className={styles.slider__background} ref={innerScrollElement}></div>
        </div>
    )
}

export default Slider