'use client'

import Button from "@/app/components/Button/Button";
import Heading from "@/app/components/Heading/Heading";
import Slider from "@/app/components/Slider/Slider";
import Tabs from "@/app/components/Tabs/Tabs";
import {useState} from "react";
import Card from "@/app/components/Card/Card";
import Container from "@/app/components/Container/Container";

export interface City {
    id: number
    city: string
    timezone: string
    time: string
    date: string
}

export default function Home() {
    const [city, setCity] = useState<City[]>([
        {
            id: 1,
            city: 'Moscow',
            timezone: 'GMT +03.00',
            time: '12 AM',
            date: 'sat 9 aug'
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
              <Button>+</Button>
              <Tabs></Tabs>
              <Tabs></Tabs>
          </Container>
      </>
  )
}
