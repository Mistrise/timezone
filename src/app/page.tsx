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
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd"

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

// @ts-nocheck
export default function Home() {
  const selectedTimezoneKeys = useTimeStore(state => state.selectedTimezoneKeys)
  const setTimezone = useTimeStore(state => state.setTimezone)
  const initTimeZonesMap = useTimeStore(state => state.initTimeZonesMap)
  const updateCurrentDate = useTimeStore(state => state.updateCurrentDate)
  const shuffleTimezone = useTimeStore(state => state.shuffleTimezone)
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
  
 useEffect(() => {
    if (!showSearch) {
      // Remove the overflow style
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
      return;
    }

    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
        
  }, [showSearch]);

    useEffect(() => {
       const addedCities = localStorage.getItem('cities')
        const timeToggle = localStorage.getItem('timeToggle')
        if (addedCities) {
            setTimezone(JSON.parse(addedCities))
        } else {
            localStorage.setItem('cities', JSON.stringify(selectedTimezoneKeys))
        }
        if (timeToggle) {
            // @ts-ignore
            setTimeFormat(localStorage.getItem('timeToggle'))
        } else {
            localStorage.setItem('timeToggle', JSON.stringify(true))
        }
    }, []);

  const handleDrag = (result: {source: {droppableId: string, index: number}, destination: {droppableId: string, index: number}, type: string}) => {
      const {source, destination, type} = result


      console.log(result)
      if (!destination) return

      if (
          source.droppableId === destination.droppableId &&
          source.index === destination.index) return;
      if (type === 'group') {
          const reorderedState = [...selectedTimezoneKeys]

          const sourceIndex = source.index
          const destinationIndex = destination.index

          const [removedState] = reorderedState.splice(sourceIndex, 1)
          reorderedState.splice(destinationIndex, 0, removedState)
          shuffleTimezone(reorderedState)
      };
  }




    return (
    <>
        {/* @ts-ignore */}
        <DragDropContext onDragEnd={handleDrag}>
          <Heading/>
            <Container>
                <Slider/>
                <Droppable droppableId={'1'} type='group'>
                    {(provided) => (
                        <div {...provided.droppableProps} ref={provided.innerRef}>
                            {selectedTimezoneKeys.map((timeZoneKey: string, index: number) =>
                                <Draggable draggableId={timeZoneKey} key={timeZoneKey} index={index}>
                                    {provided => (
                                        <div {...provided.draggableProps}
                                             {...provided.dragHandleProps}
                                             ref={provided.innerRef}>
                                            <Card
                                                timeFormat={timeFormat}
                                                timeZoneKey={timeZoneKey}
                                                key={timeZoneKey}
                                            />

                                        </div>
                                    )}
                                </Draggable>)
                            }
                            {provided.placeholder}
                        </div>)}
                </Droppable>
                <div
                    style={{display: "flex", flexDirection: "row", justifyContent: "space-between", paddingTop: "8px"}}>
                    <Button showSearch={showSearch} setShowSearch={setShowSearch}/>
                    <Tab elem1={'24H'} elem2={'AM/PM'} prevState={timeFormat} setState={setTimeFormat}/>
                    {showSearch ? <CitiesModal setShowSearch={setShowSearch}/> : null}
                </div>
            </Container>
        </DragDropContext>
    </>
  )
}
