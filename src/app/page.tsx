'use client'

import Button from "@/app/components/Button/Button";
import Heading from "@/app/components/Heading/Heading";
import Slider from "@/app/components/Slider/Slider";
import Tab from "@/app/components/Tabs/Tab";
import {useState} from "react";
import Card from "@/app/components/Card/Card";
import Container from "@/app/components/Container/Container";

export interface City {
    id: number
    city: string
    timezone: string
    hours: string
    minutes: string
    date: string
    timeFormat: string
}

export default function Home() {

    const globalDate = new Date()

    const days = [
        'Sun',
        'Mon',
        'Tue',
        'Wed',
        'Thu',
        'Fri',
        'Sat',
    ]

    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ]

    const [calendarType, setCalendarType] = useState(true)

    const [timeFormat, setTimeFormat] = useState(true)

    const [city, setCity] = useState<City[]>([
        {
            id: 1,
            city: 'Moscow',
            timezone: `GMT ${
               globalDate.getTimezoneOffset() < 0 ? 
                   "+ " + (Math.abs(globalDate.getTimezoneOffset() / 60)) :
                   "- " + (Math.abs(globalDate.getTimezoneOffset() / 60))
            }`,
            hours: globalDate.getHours().toString(10),
            minutes: globalDate.getMinutes().toString(10),
            timeFormat: 'AM',
            date: `${days[globalDate.getDay()]} ${globalDate.getDate()} ${month[globalDate.getMonth()]}`
        }
    ])



  return (
      <>
          <Heading/>
          <Container>
              <Slider/>
              <Card city={city}/>
              <Card city={city}/>
              <Card city={city}/>
              <Card city={city}/>
              <div style={{display: "flex", flexDirection: "row"}}>
                  <Button/>
                  <Tab elem1={'Normal'} elem2={'Scheduler'} prevState={calendarType} setState={setCalendarType}/>
                  <Tab elem1={'24H'} elem2={'AM/PM'} prevState={timeFormat} setState={setTimeFormat}/>
              </div>

          </Container>
      </>
  )
}
