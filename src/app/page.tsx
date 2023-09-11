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
    time: string
    date: string
    timeFormat: string
}

export default function Home() {
    const [city, setCity] = useState<City[]>([
        {
            id: 1,
            city: 'Moscow',
            timezone: 'GMT +03.00',
            time: '12',
            timeFormat: 'AM',
            date: 'Sat 9 aug'
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
                  <Tab elem1={'Normal'} elem2={'Scheduler'}/>
                  <Tab elem1={'24H'} elem2={'AM/PM'}/>
              </div>

          </Container>
      </>
  )
}
