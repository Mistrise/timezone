"use client"

import styles from './Slider.module.css'
import React, { useCallback, useEffect, useRef, useState } from "react";
import SliderTimer from "@/app/components/SliderTimer/SliderTimer";
import { useRapidTimeStore, useTimeStore } from "@/app/store";

const PIXELS_PER_HOUR = 50;

const Slider = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const innerScrollElement = useRef<HTMLDivElement | null>(null);
  const totalDiffXRef = useRef<number>(0);

  const setHoursOffset = useTimeStore(state => state.setHoursOffset)
  const setSecondsOffset = useRapidTimeStore(state => state.setSecondsOffset)

  const [bottomPadding, setBottomPadding] = useState(0);

  const onReset = () => {
    totalDiffXRef.current = 0;
  }

  const calcRoundedTime = useCallback((pxOffset: number) => {
    const hoursOffset = Math.round(pxOffset / PIXELS_PER_HOUR * 2) / 2;
    setHoursOffset(hoursOffset)
    setSecondsOffset(Math.round(pxOffset / PIXELS_PER_HOUR * 60 * 60))
  }, [setHoursOffset])

  useEffect(() => {
    const isiOS = /iPhone/.test(navigator.userAgent);
    const hasNotch = window.screen.height >= 812;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
    
    if (isiOS && hasNotch && isStandalone) {
      setBottomPadding(24);
    }
  }, []);

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
          currentDiffX = totalDiffXRef.current - diffX;
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

      const onTouchDown = (e: TouchEvent) => {
        e.preventDefault();
        window.getSelection()?.removeAllRanges();
        startX = e.touches[0].clientX
      }

      const onTouchUp = () => {
        totalDiffXRef.current = currentDiffX;
        startX = null;
      }

      const onTouchMove = (e: TouchEvent) => {
        if (startX) {
          const diffX = e.touches[0].clientX - startX;
          currentDiffX = totalDiffXRef.current - diffX;
          calcRoundedTime(currentDiffX)
          if (innerScrollElement.current) {
            innerScrollElement.current.style.transform = `translate(${diffX}px)`;
          }
        }
      }

      activeElement.addEventListener('mousedown', onMouseDown)
      activeElement.addEventListener('touchstart', onTouchDown)
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('touchmove', onTouchMove)
      document.addEventListener('mouseup', onMouseUp)
      document.addEventListener('touchend', onTouchUp)
      return () => {
        activeElement.removeEventListener('mousedown', onMouseDown)
        activeElement.removeEventListener('touchstart', onTouchDown)
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('touchmove', onTouchMove)
        document.removeEventListener('mouseup', onMouseUp)
        document.removeEventListener('touchend', onTouchUp)
      }
    }
  }, [setHoursOffset, containerRef.current]);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      style={{ paddingBottom: `${bottomPadding}px` }}   >
      <SliderTimer onReset={onReset}/>
      <div className={styles.fade__left}></div>
      <div className={styles.fade__right}></div>
      <div className={styles.slider__background} ref={innerScrollElement}></div>
    </div>
  )
}

export default React.memo(Slider)