'use client'
import Button from "@/app/components/Button/Button";
import Heading from "@/app/components/Heading/Heading";
import Slider from "@/app/components/Slider/Slider";
import Tab from "@/app/components/Tabs/Tab";
import {useEffect, useState} from "react";
import Container from "@/app/components/Container/Container";
import CitiesModal from "@/app/components/CitiesModal/CitiesModal";
import {useTimeStore} from "@/app/store";
import {DragDropContext, Droppable, Draggable, OnDragEndResponder} from "react-beautiful-dnd"
import {CardActive} from "@/app/components/Card/CardActive";
import {CardSkeleton} from "@/app/components/Card/CardSkeleton";
import {getByIds} from "@/fetchers/cities";
import {DEFAULT_CITY_GEONAME_IDS} from "@/constants/constants";

// @ts-nocheck
export default function Home() {
  const selectedCities = useTimeStore(state => state.selectedCities)
  const isInitialized = useTimeStore(state => state.isInitialized)
  const initTimeStore = useTimeStore(state => state.init)
  const updateCurrentDate = useTimeStore(state => state.updateCurrentDate)
  const shuffleTimezone = useTimeStore(state => state.shuffleTimezone)
  const [showSearch, setShowSearch] = useState(false)
  const toggleTimeFormat = useTimeStore(state => state.toggleTimeFormat)
  const setToggleTimeFormat = useTimeStore(state => state.setToggleTimeFormat)
  const [innerWidth, setInnerWidth] = useState(0);

  useEffect(() => {
    setInnerWidth(window.innerWidth);
    return () => {
    };
  }, []);

  useEffect(() => {
    const savedCities = localStorage.getItem('cities')
    const timeFormatStore = localStorage.getItem('timeFormat')

    if (savedCities) {
      // TODO validate that data from storage matches required format
      initTimeStore(JSON.parse(savedCities))
    } else {
      getByIds(DEFAULT_CITY_GEONAME_IDS).then(({results}) => {
        initTimeStore(results)
      })
    }

    if (timeFormatStore) {
      // @ts-ignore
      setToggleTimeFormat(JSON.parse(localStorage.getItem('timeFormat')))
    }

    return useTimeStore.subscribe((state) => {
      if (state.selectedCities.length > 0) {
        localStorage.setItem('cities', JSON.stringify(state.selectedCities))
      } else {
        localStorage.removeItem('cities')
      }
      localStorage.setItem('timeFormat', JSON.stringify(state.toggleTimeFormat))
    })
  }, [initTimeStore, setToggleTimeFormat]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateCurrentDate()
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
          .register('./sw.js')
          .then((registration) => console.log('scope is: ', registration.scope));
    }
  }, []);

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

  const handleDrag: OnDragEndResponder = (result) => {
    const {source, destination, type} = result

    if (!destination) return

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index) return;
    if (type === 'group') {
      const reorderedState = [...selectedCities]

      const sourceIndex = source.index
      const destinationIndex = destination.index

      const [removedState] = reorderedState.splice(sourceIndex, 1)
      reorderedState.splice(destinationIndex, 0, removedState)
      shuffleTimezone(reorderedState)
    }
  }


  return (
      <>
        <DragDropContext onDragEnd={handleDrag}>
          <Heading/>
          <Container>
            {showSearch && innerWidth < 740 ? null : <Slider/>}
            {isInitialized ? (
              <Droppable droppableId={'1'} type='group'>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {selectedCities.map((city, index: number) =>
                      <Draggable draggableId={city.geoname_id} key={city.geoname_id} index={index}>
                        {provided => (
                          <div {...provided.draggableProps}
                               {...provided.dragHandleProps}
                               ref={provided.innerRef}>
                            <CardActive
                              timeFormat={toggleTimeFormat}
                              city={city}
                            />
                            <div style={{height: '8px'}}></div>
                          </div>
                        )}
                      </Draggable>)
                    }
                    {provided.placeholder}
                  </div>)}
              </Droppable>
            ) : (
              <>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
                <CardSkeleton/>
              </>
            )}
            <div
              style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
              <Button showSearch={showSearch} setShowSearch={setShowSearch}/>
              <Tab elem1={'24H'} elem2={'AM/PM'}/>
              {showSearch ? <CitiesModal setShowSearch={setShowSearch}/> : null}
            </div>
          </Container>
        </DragDropContext>
      </>
  )
}
