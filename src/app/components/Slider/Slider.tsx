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
  const currentDiffXRef = useRef<number>(0); // ✅ перемещён наружу

  const setHoursOffset = useTimeStore(state => state.setHoursOffset)
  const setSecondsOffset = useRapidTimeStore(state => state.setSecondsOffset)

  const [bottomPadding, setBottomPadding] = useState(0);

  const onReset = () => {
    totalDiffXRef.current = 0;
    currentDiffXRef.current = 0;
    if (innerScrollElement.current) {
      innerScrollElement.current.style.transform = `translate(0px)`;
    }
    setHoursOffset(0);
    setSecondsOffset(0);
  }

  const calcRoundedTime = useCallback((pxOffset: number) => {
    const hoursOffset = Math.round(pxOffset / PIXELS_PER_HOUR * 2) / 2;
    setHoursOffset(hoursOffset)
    setSecondsOffset(Math.round(pxOffset / PIXELS_PER_HOUR * 60 * 60))
  }, [setHoursOffset, setSecondsOffset])

  useEffect(() => {
    const isiOS = /iPhone/.test(navigator.userAgent);
    const hasNotch = window.screen.height >= 812;
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches;

    if (isiOS && hasNotch && isStandalone) {
      setBottomPadding(24);
    }
  }, []);

  useEffect(() => {
    let startX: number | null = null;

    if (containerRef.current) {
      const activeElement = containerRef.current;

      const onMouseDown = (e: MouseEvent) => {
        e.preventDefault();
        window.getSelection()?.removeAllRanges();
        startX = e.clientX;
      }

      const onMouseMove = (e: MouseEvent) => {
        if (startX !== null) {
          const diffX = e.clientX - startX;
          currentDiffXRef.current = totalDiffXRef.current - diffX;
          calcRoundedTime(currentDiffXRef.current);
          if (innerScrollElement.current) {
            innerScrollElement.current.style.transform = `translate(${diffX}px)`;
          }
        }
      }

      const onMouseUp = () => {
        totalDiffXRef.current = currentDiffXRef.current;
        startX = null;
      }

      const onTouchDown = (e: TouchEvent) => {
        e.preventDefault();
        window.getSelection()?.removeAllRanges();
        startX = e.touches[0].clientX;
      }

      const onTouchMove = (e: TouchEvent) => {
        if (startX !== null) {
          const diffX = e.touches[0].clientX - startX;
          currentDiffXRef.current = totalDiffXRef.current - diffX;
          calcRoundedTime(currentDiffXRef.current);
          if (innerScrollElement.current) {
            innerScrollElement.current.style.transform = `translate(${diffX}px)`;
          }
        }
      }

      const onTouchUp = () => {
        totalDiffXRef.current = currentDiffXRef.current;
        startX = null;
      }

      activeElement.addEventListener('mousedown', onMouseDown);
      activeElement.addEventListener('touchstart', onTouchDown);
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchUp);

      return () => {
        activeElement.removeEventListener('mousedown', onMouseDown);
        activeElement.removeEventListener('touchstart', onTouchDown);
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('touchmove', onTouchMove);
        document.removeEventListener('touchend', onTouchUp);
      }
    }
  }, [calcRoundedTime]);

  return (
    <div
      className={styles.container}
      ref={containerRef}
      style={{ paddingBottom: `${bottomPadding}px` }}
    >
      <SliderTimer onReset={onReset} />
      <div className={styles.fade__left}></div>
      <div className={styles.fade__right}></div>
      <div className={styles.slider__background} ref={innerScrollElement}></div>
    </div>
  )
}

export default React.memo(Slider)