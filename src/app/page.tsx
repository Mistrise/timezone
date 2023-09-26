'use client'

import Button from "@/app/components/Button/Button";
import Heading from "@/app/components/Heading/Heading";
import Slider from "@/app/components/Slider/Slider";
import Tab from "@/app/components/Tabs/Tab";
import {useState} from "react";
import Card from "@/app/components/Card/Card";
import Container from "@/app/components/Container/Container";
import CardScheduler from "@/app/components/CardScheduler/CardScheduler";
import {citiesConst} from "@/constants/constants";
import {MyContext, TimeOffset} from "@/app/context";


export interface City {
    id: number
    city: string
    timezone: string
    hours: number
    minutes: number
    date: string
}

export default function Home() {


    const [globalTime, setGlobalTime] = useState({interval: 'test'})

    const [calendarType, setCalendarType] = useState(true)

    const [timeFormat, setTimeFormat] = useState(true)

    const [cities, setCity] = useState<City[]>(citiesConst)


    return (
          <MyContext.Provider value={globalTime}>
              <Heading/>
              <Container>
                  <Slider/>
                  {calendarType ?
                      cities.filter(city => city.id < 4).map(city => <Card timeFormat={timeFormat} city={city} key={city.id}/>)
                      :
                      cities.filter(city => city.id < 4).map(city => <CardScheduler timeFormat={timeFormat} key={city.id} city={city}/>)
                  }
                  <div style={{display: "flex", flexDirection: "row"}}>
                      <Button/>
                      <Tab elem1={'Normal'} elem2={'Scheduler'} prevState={calendarType} setState={setCalendarType}/>
                      <Tab elem1={'24H'} elem2={'AM/PM'} prevState={timeFormat} setState={setTimeFormat}/>
                  </div>
              </Container>
          </MyContext.Provider>
  )
}
