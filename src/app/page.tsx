'use client'

import Button from "@/app/components/Button/Button";
import Heading from "@/app/components/Heading/Heading";
import Slider from "@/app/components/Slider/Slider";
import Tab from "@/app/components/Tabs/Tab";
import {useState} from "react";
import Card from "@/app/components/Card/Card";
import Container from "@/app/components/Container/Container";
import {days, month} from "@/constants/constants";
import CardScheduler from "@/app/components/CardScheduler/CardScheduler";

export interface City {
    id: number
    city: string
    timezone: string
    hours: number
    minutes: number
    date: string
}

export default function Home() {

    const globalDate = new Date()

    const [calendarType, setCalendarType] = useState(true)

    const [timeFormat, setTimeFormat] = useState(true)

    const [cities, setCity] = useState<City[]>([
        {
            id: 1,
            city: 'Moscow',
            timezone: `GMT ${
               globalDate.getTimezoneOffset() < 0 ? 
                   "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                   "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
            }`,
            hours: globalDate.getHours(),
            minutes: globalDate.getMinutes(),
            date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`
        },
        {
            id: 2,
            city: 'London',
            timezone: `GMT ${
               globalDate.getTimezoneOffset() < 0 ? 
                   "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                   "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
            }`,
            hours: globalDate.getHours(),
            minutes: globalDate.getMinutes(),
            date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`
        },
        {
            id: 3,
            city: 'New York',
            timezone: `GMT ${
               globalDate.getTimezoneOffset() < 0 ? 
                   "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                   "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
            }`,
            hours: globalDate.getHours(),
            minutes: globalDate.getMinutes(),
            date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`
        },
        {
            id: 4,
            city: 'Paris',
            timezone: `GMT ${
               globalDate.getTimezoneOffset() < 0 ? 
                   "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                   "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
            }`,
            hours: globalDate.getHours(),
            minutes: globalDate.getMinutes(),
            date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`
        },
    ])


  return (
      <>
          <Heading/>
          <Container>
              <Slider/>
              {calendarType ?
                  cities.map(city => <Card timeFormat={timeFormat} city={city} key={city.id}/>)
                  :
                  cities.map(city => <CardScheduler timeFormat={timeFormat} key={city.id} city={city}/>)
              }
              <div style={{display: "flex", flexDirection: "row"}}>
                  <Button/>
                  <Tab elem1={'Normal'} elem2={'Scheduler'} prevState={calendarType} setState={setCalendarType}/>
                  <Tab elem1={'24H'} elem2={'AM/PM'} prevState={timeFormat} setState={setTimeFormat}/>
              </div>
          </Container>
      </>
  )
}
