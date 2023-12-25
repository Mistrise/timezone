"use client"

import styles from './Slider.module.css'
import React, {useCallback, useEffect, useRef} from "react";
import SliderTimer from "@/app/components/SliderTimer/SliderTimer";
import {useRapidTimeStore, useTimeStore} from "@/app/store";


const PIXELS_PER_HOUR = 50;

const Slider = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerScrollElement = useRef<HTMLDivElement | null>(null);
  const totalDiffXRef = useRef<number>(0);

  const setHoursOffset = useTimeStore(state => state.setHoursOffset)
  const setSecondsOffset = useRapidTimeStore(state => state.setSecondsOffset)

  const onReset = () => {
    totalDiffXRef.current = 0;
  }


  const calcRoundedTime = useCallback((pxOffset: number) => {
    const hoursOffset = Math.round(pxOffset / PIXELS_PER_HOUR * 2) / 2;
    setHoursOffset(hoursOffset)
    setSecondsOffset(Math.round(pxOffset / PIXELS_PER_HOUR * 60 * 60))
  }, [setHoursOffset])

  useEffect(() => {
    let startX: number | null = null
    let currentDiffX = 0;

    if (containerRef.current) {
      const activeElement = containerRef.current
      const onMouseUp = () => {
        totalDiffXRef.current = currentDiffX;
        startX = null;
      }
      const onMouseMove = (e: MouseEvent) => {
        if (startX) {
          const diffX = e.clientX - startX;
          currentDiffX =  totalDiffXRef.current - diffX;
          calcRoundedTime(currentDiffX)
          if (innerScrollElement.current) {
            innerScrollElement.current.style.transform = `translate(${diffX}px)`;
          }
        }
      }
      const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        window.getSelection()?.removeAllRanges();
        startX = e.clientX
      }
      activeElement.addEventListener('mousedown', onMouseDown)
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
      return () => {
        activeElement.removeEventListener('mousedown', onMouseDown)
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseup', onMouseUp)
      }
    }
  }, [setHoursOffset, containerRef.current]);

  return (
    <div className={styles.container}
         ref={containerRef}
    >
      <SliderTimer onReset={onReset}/>
      <div className={styles.slider__background} ref={innerScrollElement}></div>
    </div>
  )
}

export default React.memo(Slider)