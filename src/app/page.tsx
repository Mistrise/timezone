'use client'

import Button from "@/app/components/Button/Button";
import Heading from "@/app/components/Heading/Heading";
import Slider from "@/app/components/Slider/Slider";
import Tab from "@/app/components/Tabs/Tab";
import {useRef, useState} from "react";
import Card from "@/app/components/Card/Card";
import Container from "@/app/components/Container/Container";
import CardScheduler from "@/app/components/CardScheduler/CardScheduler";
import {citiesConst} from "@/constants/constants";
import {TimeContext} from "@/app/context";
import CitiesModal from "@/app/components/CitiesModal/CitiesModal";


export interface City {
    id: number
    city: string
    timezone: string
    hours: number
    minutes: number
    date: string
    flag: string
    country: string
}

export default function Home() {

    const dragItem = useRef<any>(null)

    const dragOverItem = useRef<any>(null)

    const [cities, setCity] = useState<City[]>(citiesConst)

    const [showSearch, setShowSearch] = useState(false)

    const [globalTimeOffset, setGlobalTimeOffset] = useState<string>('0')

    const [calendarType, setCalendarType] = useState(true)

    const [timeFormat, setTimeFormat] = useState(true)

    const handleSort = () => {
        let _cities = [...cities]

        const draggedItemContent = _cities.splice(dragItem.current, 1)[0]

        _cities.splice(dragOverItem.current, 0, draggedItemContent)

        dragItem.current = null
        dragOverItem.current = null

        setCity(_cities)
    }



    return (
          <TimeContext.Provider value={{globalTimeOffset, setGlobalTimeOffset}}>
              <Heading/>
              <Container>
                  <Slider/>
                  {calendarType ?
                      cities.map((city, index) =>
                          <Card
                              index={index}
                              dragItem={dragItem}
                              dragOverItem={dragOverItem}
                              handleSort={handleSort}
                              timeFormat={timeFormat}
                              city={city}
                              key={city.id}
                          />)
                      :
                      cities.map((city, index) =>
                          <CardScheduler
                              timeFormat={timeFormat}
                              key={city.id}
                              city={city}
                              index={index}
                              dragItem={dragItem}
                              dragOverItem={dragOverItem}
                              handleSort={handleSort}
                          />)
                  }
                  <div style={{display: "flex", flexDirection: "row"}}>
                      <Button showSearch={showSearch} setShowSearch={setShowSearch}/>
                      <Tab elem1={'Normal'} elem2={'Scheduler'} prevState={calendarType} setState={setCalendarType}/>
                      <Tab elem1={'24H'} elem2={'AM/PM'} prevState={timeFormat} setState={setTimeFormat}/>
                      {showSearch ? <CitiesModal setShowSearch={setShowSearch} cities={cities} setCity={setCity}/> : null}
                  </div>
              </Container>
          </TimeContext.Provider>
  )
}
