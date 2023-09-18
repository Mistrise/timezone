import styles from './Slider.module.css'
import Image from "next/image";
import Dot from '../../../../public/icons/State=Off.svg'
import SliderTimer from "@/app/components/SliderTimer/SliderTimer";
import {useRef, useState} from "react";

const Slider = () => {
    let startX: number | null = null
    let innerScrollElement = useRef(null);
    let [timeElement, setTimeElement] = useState('');
    let totalDiffX = 0;
    let currentDiffX = 0;

    const PIXELS_PER_HOUR = 50;

    console.log(timeElement)
    function calcRoundedTime(pxOffset: number) {
        const hoursOffset = Math.round(pxOffset / PIXELS_PER_HOUR * 2) / 2;
        if (hoursOffset === 0) {
            setTimeElement('');
        } else {
            const sign = hoursOffset > 0 ? '+' : '';
            setTimeElement(`${sign}${hoursOffset}h`);
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
                 }
             }}
        >
            {timeElement !== '' ? <SliderTimer time={timeElement} setTimeElement={setTimeElement}/> : <Image src={Dot} alt={''}></Image>}
            <div className={styles.slider__background} ref={innerScrollElement}></div>
        </div>
    )
}

export default Slider