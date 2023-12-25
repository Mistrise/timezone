'use client'

import Button from "@/app/components/Button/Button";
import Heading from "@/app/components/Heading/Heading";
import Slider from "@/app/components/Slider/Slider";
import Tab from "@/app/components/Tabs/Tab";
import {useEffect, useState} from "react";
import {Card} from "@/app/components/Card/Card";
import Container from "@/app/components/Container/Container";
import CitiesModal from "@/app/components/CitiesModal/CitiesModal";
import {useTimeStore} from "@/app/store";

export interface City {
  id: number
  city: string
  timezone: number
  hours: number
  minutes: number
  date: string
  flag: string
  country: string
  localDate?: Date
}


export default function Home() {
  const selectedTimezoneKeys = useTimeStore(state => state.selectedTimezoneKeys)
  const initTimeZonesMap = useTimeStore(state => state.initTimeZonesMap)
  const updateCurrentDate = useTimeStore(state => state.updateCurrentDate)
  const [showSearch, setShowSearch] = useState(false)
  const [timeFormat, setTimeFormat] = useState(true)


  useEffect(() => {
    fetch('/api/timezones').then((response) => response.json()).then((data) => {
      initTimeZonesMap(data)
    })

    const intervalId = setInterval(() => {
      updateCurrentDate()
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return (
    <>
      <Heading/>
      <Container>
        <Slider/>
        {selectedTimezoneKeys.map((timeZoneKey: string) =>
          <Card
            timeFormat={timeFormat}
            timeZoneKey={timeZoneKey}
            key={timeZoneKey}
          />)
        }
        <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
          <Button showSearch={showSearch} setShowSearch={setShowSearch}/>
          <Tab elem1={'24H'} elem2={'AM/PM'} prevState={timeFormat} setState={setTimeFormat}/>
          {showSearch ? <CitiesModal setShowSearch={setShowSearch}/> : null}
        </div>
      </Container>
    </>
  )
}
